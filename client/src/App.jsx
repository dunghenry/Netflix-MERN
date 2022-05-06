import "./app.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
function App() {
  const user = "a"
  return (
    <Router>
      <Route exact path="/">
          {user ? <Home /> : <Redirect to="register" />}
        </Route>
      <Switch>
        <Route exact path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        {
          user && (
            <>
              <Route path="/series">
                <Home type="series" />
              </Route>
              <Route path="/movies">
                <Home type="movies" />
              </Route>
              <Route path="/watch">
                <Watch />
              </Route>
            </>
          )
        }
      </Switch>
    </Router>
  );
}

export default App;
