import './App.css';
import HomePage from './containers/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isUserLoggedIn, updateCart } from './actions'
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage';
import OrdersPage from './containers/OrdersPage';
import OrderDetailsPage from './containers/OrderDetailsPage';


function App() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }

  }, [auth.authenticate, dispatch])

  useEffect(() => {
    console.log('App.js - updateCart')
    dispatch(updateCart())
  }, [auth.authenticate])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/cart" component={CartPage}></Route>
          <Route path="/checkout" component={CheckoutPage}></Route>
          <Route path="/account/orders" component={OrdersPage}></Route>
          <Route path="/order_details/:orderId" component={OrderDetailsPage}></Route>
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage}></Route>
          <Route path="/:slug" component={ProductListPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
