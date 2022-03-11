import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import './App.css';
import PasswordStrengthChecker from './components/PasswordStrengthChecker';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PasswordStrengthChecker}/>
      </Switch>
    </Router>
  );
}

export default App;
