const Validator = require("validator");
const isEmpty   = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
   data.emp_name = !isEmpty(data.emp_name) ? data.emp_name : "";
   data.email = !isEmpty(data.email) ? data.email : "";
  // data.password = !isEmpty(data.password) ? data.password : "";
  // data.password2 = !isEmpty(data.password2) ? data.password2 : "";


  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "A valid email is required";
  }else if(Validator.isEmpty(data.emp_name)){
    errors.emp_name = "Employee name is required";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "A Password must contain between 6 to 30 characters, at least 1number, 1 uppercase and 1 lowercase letter";
  }

  
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "A Password must contain between 6 to 30 characters, at least 1number, 1 uppercase and 1 lowercase letter";
  }

  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
