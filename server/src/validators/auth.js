const { check, body, validationResult } = require('express-validator')

exports.validateSignupRequest = [
    body('firstName')
        .notEmpty()
        .withMessage('Firstname is required'),
    body('lastName')
        .notEmpty()
        .withMessage('Lastname is required'),
    body('email')
        .notEmpty()
        .withMessage('Invalid email'),
    body('password')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
    body('gender')
        .notEmpty()
        .withMessage('Gender is required'),
    body('birthdate')
        .notEmpty()
        .withMessage('Birthdate is required')
]

exports.validateSigninRequest = [
    check('email')
        .notEmpty()
        .withMessage('Invalid email'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next()
}