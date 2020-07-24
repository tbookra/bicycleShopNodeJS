const Joi = require("@hapi/joi");

const schemaAuth = Joi.object({
  us: Joi.string().email().min(6).required().messages({
    'string.email': 'email is in incorrect form!',
'string.email.min': 'not enough letters!'
  }),
  ps: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),
  name: Joi.required(),
});

const validateInputAsync = (data) => {
  return schemaAuth.validateAsync(data, { abortEarly: false });
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

