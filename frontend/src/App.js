import logo from './logo.svg';
import Home from './pages/Home.js'
import SinglePlayerSelector from './pages/SingleplayerSelector';
import MultiPlayerSelector from './pages/MultiplayerSelector';
import Rules from './pages/Rules'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/singleplayerselector" component={SinglePlayerSelector} exact />
        <Route path="/multiplayerselector" component={MultiPlayerSelector} exact />
        <Route path="/rules" component={Rules} exact />
      </Switch>
    </Router>
  );
}

export default App;
