import React, { useState, useContext } from 'react';

import { Grow, Grid, Card, CardContent, TextField, InputAdornment, IconButton, Button } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom';

import { UserContext } from '../App';
import useStyles from '../componentsStyling/Login'

toast.configure()

function Register(props) {
    const [showPassword, setShowPassword] = useState(false)
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const classes = useStyles()

    return (
        <div>
            <Grow in>
                <Grid container alignItems="center" className={classes.container}>
                    <Grid item>
                        <Card className={classes.card}>
                            <CardContent>
                                <h1 className={classes.title}>Login</h1>
                                    <Formik
                                        initialValues = {{
                                            email: '',
                                            password: '', 
                                        }}

                                        validationSchema = {
                                            Yup.object({
                                                email: Yup.string()
                                                .email('Invalid email format')
                                                .required('Required'),
                                                password: Yup.string()
                                                .min(8, 'Password is too short - should be 8 characters minimum')
                                                .matches(
                                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                                    'Invalid'
                                                )
                                                .required('Required')
                                            })
                                        }
                                            
                                        onSubmit = { (values) => {
                                            fetch("/login", {
                                                method: "post",
                                                headers: {
                                                "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                email: values.email,
                                                password: values.password
                                                })
                                            })
                                            .then(res => res.json())
                                            .then(data => {
                                                if(data.error) {
                                                toast.dark(data.error, {autoClose: 5000})
                                                }
                                                else{
                                                localStorage.setItem("jwt", data.token)
                                                localStorage.setItem("user", JSON.stringify(data.user))
                                                dispatch({ type: "USER", payload: data.user})
                                                toast.dark('Successfully signedin', {autoClose: 5000})
                                                history.push('/')
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

                                                <Button className={classes.button} type="submit" fullWidth>login</Button>
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