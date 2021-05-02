const Validator = require("validator");
const isEmpty = require("./isEmpty");




module.exports = function validateCommentInput(data) {
  let errors = {};

  if (isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};