const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const { JWT_SECRET_KEY } = require('../../config/keys');
const User = require('../models/User');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key : "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"
    }
}));

router.post('/register', (req, res, next) => {
    const { name, email, password} = req.body

    User.findOne({email: email})
    .then(savedUser => {
        if(savedUser) {
            return res.status(422).json({
                error: "User already exist with that email"
            });
        }
        
        bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const newUser= new User({
                name: name,
                email: email,
                password: hashedPassword,
            });
    
            newUser.save()
            .then(user => {
                transporter.sendMail({
                    to: user.email,
                    from: "akas17ec006@rmkcet.ac.in",
                    subject: "Account created successfully",
                    html: `
                        <h1>Welcome to the app</h1>
                        `
                })
                res.status(201).json({
                    message: "Account created successfully"
                });
            })
            .catch(error => {
                console.log(error);
            });

        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch(error => {
        console.log(error);
    });
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({email: email})
    .then(savedUser => {
        if(!savedUser) {
            return res.status(422).json({
                error: "Invalid email or password"
            });
        }

        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch) {
                const token = jwt.sign( 
                        {
                            userId: savedUser._id
                        }, 
                        JWT_SECRET_KEY
                    );
                const { name, email } = savedUser;
                res.status(200).json({
                    token: token,
                    user: { name, email }
                });
            }
            else {
                return res.status(422).json({
                    error: "Invalid email or password"
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch(error => {
        console.log(error);
    });
});


module.exports = router;
