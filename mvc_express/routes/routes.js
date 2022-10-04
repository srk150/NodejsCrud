const express        = require('express')
const UserController = require('../controller/user')
const WebController  = require('../controller/web')
const router         = express.Router();

router.get('/', UserController.findAll);
router.get('/getuser/:id', UserController.findOne);
router.post('/create', UserController.create);
router.patch('/upduser/:id', UserController.update);
router.delete('/deluser/:id', UserController.destroy);

//ejs template
router.get('/login', WebController.login);
router.get('/signup', WebController.signup);
router.get('/home', WebController.home);
router.get('/upload', WebController.upload);

router.post('/register', WebController.register);
router.post('/dologin', WebController.dologin);
router.post('/do_upoad_file', WebController.do_upoad_file);
router.get('/logout', WebController.logout);
router.get('/userlist', WebController.userlist);
router.get('/deluser/:id', WebController.deluser);
router.get('/edituser/:id', WebController.edituser);
router.post('/updateUser', WebController.updateUser);

module.exports = router