const express        = require('express')
const HomeController = require('../Controller/web')

const validateRegisterInput = require("../Validation/register");

const router         = express.Router();

//ejs template file for html static file
router.get('/', HomeController.index);
router.get('/home', HomeController.index);
router.get('/dashboard', HomeController.dashboard);
router.get('/employee', HomeController.employee);
router.get('/addemployee', HomeController.addemployee);

//controller route for post

router.post('/addEmployeeData', HomeController.addEmployeeData);
// router.get('/signup', HomeController.signup);
// router.get('/home', HomeController.home);
// router.get('/upload', HomeController.upload);

module.exports = router