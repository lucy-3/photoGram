import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';
import store from './store';
import PrivateRoute from "./components/common/PrivateRoute";
import { Provider } from 'react-redux';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
            <PrivateRoute exact path="/not-found" component={NotFound} />
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

