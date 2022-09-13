import Validator from 'validator';
import isEmpty from './isEmpty.js';

function validateLoginInput(data) {
  let errors = {};

  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;


  // Email validations
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

 if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // Password validation
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateLoginInput 