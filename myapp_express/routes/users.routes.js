const express = require('express');
const app = express();
// Express route
const userExpressRoute = express.Router();
// User schema
let UserSchema = require('../model/users.model');
const { signupValidation, loginValidation } = require('../validation/valid.js');

// Get users
userExpressRoute.route('/').get((req, res) => {
    UserSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Create user
userExpressRoute.route('/create-signup').post((req, res, next) => {
    UserSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


// Get single user
userExpressRoute.route('/get-user/:id').get((req, res) => {
    UserSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update user
userExpressRoute.route('/update-user/:id').put((req, res, next) => {
    UserSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Student successfully updated!')
        }
    })
})
// Delete student
userExpressRoute.route('/remove-user/:id').delete((req, res, next) => {
    UserSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = userExpressRoute;