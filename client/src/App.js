import './App.css';
import HomePage from './containers/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/:slug" component={ProductListPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
