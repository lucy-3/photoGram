import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';

class Landing extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  
  onChange(e){
    this.setState({[e.target.name]:e.target.value });
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/api/users/login', user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))
  }

  render() {
    const {errors} = this.state;

    return (
      <>
        <div className="landing"></div>

        <div className="landingBox container">
          <h1 className="display-3 mb-4 title">PhotoGram</h1>
          <p className="lead description">Share your story through photos!</p>
    
          <br />
          <form noValidate onSubmit={this.onSubmit.bind(this)} className="landingLogin">
            <div className="form-group">
              <input type="email" className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email
              })}  placeholder="Email Address" name="email" value = {this.state.email}
              onChange={this.onChange.bind(this)} />
              {errors.email && (
                <div className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password
              })}  placeholder="Password" name="password" value = {this.state.password}
              onChange={this.onChange.bind(this)} />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password}
                </div>
              )}
            
            <input type="submit" className="btn btn-primary btn-block mt-4" value="Login"/>
            </div>
          </form>

          <hr />
          <div className="signupDivider">
            <p>Don't have an account? 
              <Link to="/register"> Sign Up</Link>
            </p>
          </div>
        </div>
      </>
    )
  }
}

export default Landing;