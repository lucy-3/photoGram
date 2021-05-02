import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      imgUrl: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      caption: this.state.caption,
      imgUrl: this.state.imgUrl,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ 
      caption: '',
      imgUrl: ''
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="postHeader card-header text-white">Add a picture...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Upload an image URL"
                name="image"
                value={this.state.imgUrl}
                onChange={this.onChange}
                error={errors.imgUrl}
              />

              <TextAreaFieldGroup
                placeholder="Write a caption"
                name="caption"
                value={this.state.caption}
                onChange={this.onChange}
                error={errors.caption}
              />

              <div className="mb-3">
                <input
                  type="submit"
                  value="Submit"
                  className="btn"
                />
                {/* </button> */}
              </div>
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