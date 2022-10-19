const express    = require('express');
const bodyParser = require('body-parser');
const dbConfig   = require('./Db/db.js');
const Home       = require('./Routes/home.js')
const mongoose   = require('mongoose');
const bcrypt     = require('bcrypt');


var session        = require('express-session');
const cookieParser = require("cookie-parser");

var flash          = require('connect-flash');

const multer       = require('multer');
const path         = require('path');
const fs           = require('fs');



const app     = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(session({secret:'ssshhhhh'}));
app.use(flash());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



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
app.use('/home',Home);
// app.use(express.static('public')); 
app.use(express.static(__dirname + '/public'));


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server is listening on locahost:8080");
});