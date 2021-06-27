import React, { useState } from 'react';

import { Grow, Grid, Card, CardContent, TextField, InputAdornment, IconButton, Button } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom';

import useStyles from '../componentsStyling/Register'

toast.configure()

function Register(props) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const history = useHistory()
    const classes = useStyles()

    return (
        <div>
            <Grow in>
                <Grid container alignItems="center" className={classes.container}>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardContent>
                                <h1 className={classes.title}>Registration</h1>
                                    <Formik
                                        initialValues = {{
                                            name: '',
                                            email: '',
                                            password: '', 
                                            confirmPassword: ''
                                        }}

                                        validationSchema = {
                                            Yup.object({
                                                name: Yup.string()
                                                .required('Required'),
                                                email: Yup.string()
                                                .email('Invalid email format')
                                                .required('Required'),
                                                password: Yup.string()
                                                .min(8, 'Password is too short - should be 8 characters minimum')
                                                .matches(
                                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                                    'Invalid'
                                                )
                                                .required('Required'),
                                                confirmPassword: Yup.string()
                                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                                .required('Required')
                                            })
                                        }
                                            
                                        onSubmit = { (values) => {
                                            fetch("/register", {
                                                method: "post",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    name: values.name,
                                                    email: values.email,
                                                    password: values.password, 
                                                })
                                                })
                                                .then(res => res.json())
                                                .then(data => {
                                                if(data.error) {
                                                    toast.dark(data.error, {autoClose: 5000})
                                                }
                                                else{
                                                    toast.dark(data.message, {autoClose: 5000})
                                                    history.push('/login')
                                                }
                                                })
                                                .catch(error => {
                                                console.log(error)
                                                })
                                            }
                                        }
                                    >
                                        {formik => (
                                            <Form>
                                                <Field 
                                                    name="name"
                                                    className={classes.textfield}
                                                    as={ TextField }
                                                    id="outlined-basic" 
                                                    label="Name"
                                                    type="text" 
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth 
                                                    error={(formik.errors.name && formik.touched.name) ? true : false}
                                                    helperText={<ErrorMessage name="name" />}
                                                />
                                                
                                                <Field 
                                                    name="email"
                                                    className={classes.textfield}
                                                    as={ TextField }
                                                    id="outlined-basic" 
                                                    label="E-mail address"
                                                    type="text" 
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth 
                                                    error={(formik.errors.email && formik.touched.email) ? true : false}
                                                    helperText={<ErrorMessage name="email" />}
                                                />

                                                <Field 
                                                    name="password"
                                                    className={classes.textfield}
                                                    as={ TextField }
                                                    id="outlined-adornment-password" 
                                                    label="Password" 
                                                    type={showPassword ? 'text' : 'password'}
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth 
                                                    autoComplete="off"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowPassword(prev => !prev)}
                                                                onMouseDown={(event) => event.preventDefault()}
                                                                edge="end"
                                                                >
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                            </InputAdornment>),
                                                    }}
                                                    error={(formik.errors.password && formik.touched.password) ? true : false}
                                                    helperText={<ErrorMessage name="password" />}
                                                />

                                                <Field 
                                                    name="confirmPassword"
                                                    className={classes.textfield}
                                                    as={ TextField }
                                                    id="outlined-adornment-password" 
                                                    label="Confirm Password" 
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth 
                                                    autoComplete="off"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowConfirmPassword(prev => !prev)}
                                                                onMouseDown={(event) => event.preventDefault()}
                                                                edge="end"
                                                                >
                                                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                            </InputAdornment>),
                                                    }}
                                                    error={(formik.errors.confirmPassword && formik.touched.confirmPassword) ? true : false}
                                                    helperText={<ErrorMessage name="confirmPassword" />}
                                                />

                                                <Button className={classes.button} type="submit" fullWidth>Register</Button>
                                            </Form>
                                        )}
                                    </Formik>
                            </CardContent>
                        </Card> 
                    </Grid>
                </Grid>
            </Grow>
        </div>
    );
}

export default Register;