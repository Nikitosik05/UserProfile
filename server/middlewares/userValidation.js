
const { body, query } = require('express-validator')

const signupValidation = [
    body('name')
        .exists().withMessage('This field is required')
        .isLength({ min: 2 }).withMessage('Name should be more than 2 characters'),

    body("surname")
        .exists().withMessage('This field is required')
        .isLength({ min: 2 }).withMessage('Surname should be more than 2 characters'),

    body("password")
        .exists().withMessage('Thsis field is required')
        .isLength({ min: 6 }).withMessage('Password should be more than 6 characters'),

    body("email")
        .exists().withMessage('This field is required')
        .isEmail().withMessage("This field is email")
]

const loginValidation = [
    body("email")
        .exists().withMessage('This field is required')
        .isEmail().withMessage("This field is email"),

    body("password")
        .exists().withMessage('This field is required')
        .isLength({ min: 6 }).withMessage('Password should be more than 6 characters'),
]

const checkAuthValidation = [
    query("token")
        .exists().withMessage('This field is required')
]

module.exports = { signupValidation, loginValidation, checkAuthValidation }