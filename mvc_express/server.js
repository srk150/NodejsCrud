const express    = require('express');
const bodyParser = require('body-parser');

const dbConfig   = require('./config/db.js');
const UserRoute  = require('./routes/routes.js')

const bcrypt     = require('bcryptjs');

const mongoose   = require('mongoose');

var session      = require('express-session');
const cookieParser = require("cookie-parser");

var flash        = require('connect-flash');

const multer     = require('multer');
const path       = require('path');
const fs         = require('fs');


const app        = express();

app.set('view engine', 'ejs');

app.use(cookieParser('secret'));


app.use(session({cookie: { maxAge: 60000 }}));
app.use(session({secret:'ssshhhhh'}));
app.use(flash());


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


//create db conn in mongoose

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


//connect to route
app.use('/user',UserRoute);


// inside public directory.
app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));
 

app.get('/', (req, res) => {
    res.json({"message": "Wel-come to my app"});
});

app.listen(3000, () => {
    console.log("Server is listening on locahost:3000");
});
