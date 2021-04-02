const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  //Check if user uploaded photo - may need to keep commented until we know how to upload photos
  if (isEmpty(data.imgUrl)) {
    errors.text = "Must upload a photo";
  }

  if (!Validator.isLength(data.caption, { max: 300 })) {
    errors.text = "Post must be less 10 and 300 characters";
  }

  if (isEmpty(data.caption)) {
    errors.text = "Caption field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};