const Joi = require("@hapi/joi");

const schemaAuth = Joi.object({
  us: Joi.string().email().min(6).required().messages({
    'string.email': 'email is in incorrect form!',
    'string.min': 'require an email with more letters!',
    'string.empty': 'An email is required',
  }),
  ps: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required().messages({ 
    'string.empty': 'A password is required',
    'string.pattern.base': 'Bad password!!. A password must contain at least 8 charecters, no more than 30 charerters, at least one digit and one capital letter.',
  }),
  name: Joi.string().required().messages({
    'string.min': "Your name is required!"
  }),
  
});

const validateInputAsync = ({us,ps,name}) => {
return schemaAuth.validateAsync({us,ps,name}, { abortEarly: false });
};

module.exports.validateInputAsync = validateInputAsync;

// const validateInput = async (data) => {
//   //   let res = Joi.validate(data, schemaAuth);
//   try {
//     let res = await schemaAuth.validateAsync(data);
//     console.log(res);
//   } catch (e) {
//     console.log(e);
//   }
// };

// validateInput({ username: "1@a.com", password: "ertrty456" });

