var passwordValidator = require("password-validator");

// Creation du schema

var passwordSchema = new passwordValidator();

// Propriétés du schema

passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 32
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters.has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces(); // Should not have spaces

module.exports = passwordSchema;
