import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
//import * as fs from 'fs'
//import S3FileUpload from 'react-s3';
//const keyS3 = require('./KeyS3');

const fs = require('fs');

class PostForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgData : '', 
      caption: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = e => {
      const { user } = this.props.auth;
      /* console.log('++++++++++++++++++')
      console.log(reader.result) */
      const newPost = {
        imgUrl: {
          data: new Buffer.from(reader.result, 'base64'),
          contentType: 'image/png'
        },
        caption: this.state.caption,
        name: user.name,
        avatar: user.avatar
      };

      this.props.addPost(newPost);
      this.setState({ 
        imgData : '' ,
        caption : ''
      });
    };
    reader.readAsDataURL(this.state.imgData)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onImageChange = event => {
   
    if (event.target.files && event.target.files[0]) {
      var img = event.target.files[0];
      this.setState({
        imgData: img
      });
    }
  };
  
  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">New Posts</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
               
              {/* <TextAreaFieldGroup
                  placeholder="Add a picture url"
                  name="imgUrl"
                  value={this.state.imgUrl}
                  onChange={this.onChange}
                  error={errors.imgUrl}
                /> */}
                <img src={this.state.imgUrl} />
                  <h1>Select Image</h1>
                  <input type="file" name="myImage" onChange={this.onImageChange.bind(this)} />
                <TextAreaFieldGroup
                  placeholder="Add a caption"
                  name="caption"
                  value={this.state.caption}
                  onChange={this.onChange.bind(this)}
                  error={errors.caption}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}




PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
