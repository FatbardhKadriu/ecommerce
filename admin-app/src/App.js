import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import PrivateRoute from './components/HOC/PrivateRoute';

import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions'

import Home   from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';
import Profile from './containers/Profile';
import Admins from './containers/Admins';
import Users from './containers/Users';

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {        
      if (!auth.authenticate) {
          dispatch(isUserLoggedIn())
      }
      if (auth.authenticate) {
        dispatch(getInitialData())
      }
  }, [auth.authenticate, dispatch])
  
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/page" exact component={NewPage} />
        <PrivateRoute path="/products" component={Products } />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/admins" component={Admins} />
        <PrivateRoute path="/users" component={Users} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
