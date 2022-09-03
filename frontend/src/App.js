import logo from './logo.svg';
import Home from './pages/Home.js'
import SinglePlayer from './pages/Singleplayer.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/singleplayer" component={SinglePlayer} exact />
      </Switch>
    </Router>
  );
}

export default App;
