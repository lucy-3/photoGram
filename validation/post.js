const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  //Check if user uploaded photo - may need to keep commented until we know how to upload photos


  if (!Validator.isLength(data.caption, { max: 300 })) {
    errors.caption = "Post must be less than 300 characters";
  }

  if (isEmpty(data.caption)) {
    errors.caption = "Caption field is required";
  }

  if (isEmpty(data.imgUrl)) {
    errors.imgUrl= "Image URL is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};