const { check } = require('express-validator');
 
exports.signupValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('phone', 'Phone Number must be 10 or 12 characters').isLength({ min: 10 }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]
 
exports.loginValidation = [
     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
 
]