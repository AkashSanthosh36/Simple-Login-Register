import React, { useContext, useEffect, createContext, useReducer } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import Register from './components/Register'
import Login from './components/Login'
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import { reducer, initialState } from './reducers/userReducers';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)

  useEffect( () => {
    const user = JSON.parse(localStorage.getItem("user"))
    
    if(user) {
      dispatch({type: "USER", payload: user})
      history.push('/')
    }
    else {
      history.push('/login')
    }
  }, [])

  return (
    <Switch>
      <Route exact path="/">
        <Welcome />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/login">
        <Login />
      </Route>
    </Switch>

  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>  
    </div>
  );
}

export default App;
