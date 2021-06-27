import React, { useContext, useState } from 'react';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { UserContext } from '../App'
import useStyles from '../componentsStyling/Navbar'

function Navbar(props) {
    const {state, dispatch} =  useContext(UserContext) 
    const history = useHistory()
    const classes = useStyles()  
    
    const renderList = () => {
      if(state) {
        return [
          <Button 
            key={5}
            className={classes.button} 
            variant="contained" 
            color="secondary"  
            onClick={ () => {
              localStorage.clear()
              dispatch({type: "CLEAR"})
              history.push('/login')
            }}
          >
            <Typography>
              Logout
            </Typography>
          </Button>
        ]
      }
      else {
        return [
          <Button key={6} className={classes.button} color="inherit" component={Link} to="/login"><Typography>Signin</Typography></Button>,
          <Button key={7} className={classes.button} color="inherit" component={Link} to="/register"><Typography>Signup</Typography></Button>
        ]
      }
    } 

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to={state ? '/' : '/login'} style={{ textDecoration: "none", color: "black" }}>
                            Simple App
                        </Link>
                    </Typography>
                    {renderList()}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
