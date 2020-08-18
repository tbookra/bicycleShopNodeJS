const Joi = require("@hapi/joi");

const schemaAuth = Joi.object({
  email: Joi.string().email().min(6).required().messages({
    "string.email": "email is in incorrect form!",
    "string.min": "require an email with more letters!",
    "string.empty": "An email is required",
  }),
  password: Joi.string().min(5).required().messages({
    "string.empty": "A password is required",
    "string.pattern.base":
      "Bad password!!. A password must contain at least 8 charecters, no more than 30 charerters, at least one digit and one capital letter.",
  }),
  full_name: Joi.string().required().messages({
    "string.min": "Your name is required!",
  }),
});

const validateInputAsync = ({ email, password, full_name }) => {
  return schemaAuth.validateAsync(
    { email, password, full_name },
    { abortEarly: false }
  );
};

module.exports.validateInputAsync = validateInputAsync;
