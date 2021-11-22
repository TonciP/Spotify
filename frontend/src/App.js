import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterConfig from './config/RouterConfig'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container } from 'react-bootstrap';
function App() {
  return (
      <Router>
          <RouterConfig />
      </Router>
  );
}

export default App;
