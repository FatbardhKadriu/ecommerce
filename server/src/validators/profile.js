const { check } = require('express-validator')

exports.validateUpdateRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('Firstname is required'),
    check('lastName')
        .notEmpty()
        .withMessage('Lastname is required'),
    check('email')
        .notEmpty()
        .withMessage('Invalid email'),
    check('hash_password')
        .if(check('hash_password').exists())
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
]