import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginComponentsMain from './Login/components/LoginComponentsMain';
import HomeComponent from './Home/components/HomeComponent';


function App() {

  
  return (
        <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
              <Switch> 
                <Route exact path="/" component={LoginComponentsMain}></Route>
                <Route path="/login" component={LoginComponentsMain}></Route>
                <Route path="/home" component={HomeComponent}></Route>       
              </Switch>
        </Router>
  );
  
}

export default App;
