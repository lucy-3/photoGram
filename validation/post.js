const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  //Check if user uploaded photo - may need to keep commented until we know how to upload photos
  if (isEmpty(data.photo)) {
    errors.text = "Must upload a photo";
  }

  if (!Validator.isLength(data.text, { max: 300 })) {
    errors.text = "Post must be less 10 and 300 characters";
  }

  if (isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};