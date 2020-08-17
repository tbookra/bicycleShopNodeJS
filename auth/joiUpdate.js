const Joi = require("@hapi/joi");

const schemaAuth = Joi.object({
  
  password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,30})$/)).required().messages({ 
    'string.empty': 'A password is required',
    'string.pattern.base': 'Bad password!!. A password must contain at least 8 charecters, no more than 30 charerters, at least one digit and one capital letter.',
  }),
  full_name: Joi.string().required().messages({
    'string.empty': "Your name is required!"
  }),
  
});


const validateInputAsync = (password,full_name) => {
return schemaAuth.validateAsync({password,full_name}, { abortEarly: false });
};


module.exports.validateInputAsync = validateInputAsync;


