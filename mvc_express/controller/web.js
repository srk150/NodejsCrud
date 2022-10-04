const UserModel = require('../model/user');
const imageModel= require('../model/image');
const bcrypt    = require('bcrypt');

var sess;
const multer     = require('multer');
const path       = require('path');
const fs         = require('fs');

// SET STORAGE
var storage = multer.diskStorage({
    destination: (req, file, cb) =>{
    cb(null,'uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
  
var upload = multer({ storage: storage }).single('profile');
 



exports.login = async (req, res) => {

const success = req.flash('success');
res.render('login', { success } )


};

exports.signup = async (req, res) => {
    
res.render('signup');

};


exports.userlist = async(req,res) =>{

UserModel.find({}, (err, users) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('userlisting', { users: users});
        }
    });
}

exports.edituser = async(req,res)=>{
    UserModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
        
        const success = req.flash('success');

        res.render('useredit', { users: data ,success:success});

        }
    })
}

exports.updateUser = async(req,res)=>{
    const hashedpassword = await bcrypt.hash(req.body.password,10);
    var ids = req.body.id;

 const userData = await UserModel.findByIdAndUpdate({_id:ids},{$set:{name: req.body.name,email: req.body.email,phone: req.body.phone,password: hashedpassword}})
 req.flash("success","Successfully Updated! ");
 res.redirect("/user/edituser/"+ids);

}


exports.deluser = async(req,res)=>{
   
     UserModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // const success = req.flash('success');
            // res.render('upload', { items: items , success});
            
            res.status(200).json({
                msg: data
            })
        }
    })

}
exports.upload = async(req,res) =>{

imageModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            const success = req.flash('success');
            res.render('upload', { items: items , success});
        }
    });

}

exports.home = async (req, res) => {

if(req.session.email){
const success = req.flash('success');
const uname = req.session.username;
res.render('home', { success ,uname } )

}
else{


res.redirect('/user/login');
}


};


exports.do_upoad_file = async(req,res)=>{

    upload(req,res,(err)=>{
        if(err){
            console.log(err);
        }else{
          var imageFile =req.file.filename;
          const imgUpload = new imageModel({
                
                imagename: imageFile
               });

      imgUpload.save(function(err,doc){

        if(err) throw err;
        req.flash("success","Successfully Uploaded! ");
        res.redirect("/user/upload"); 

    });


        }
    })

}


exports.dologin = async (req, res, next) => {
  
    const email    = req.body.email;
    const password = req.body.password;


    // Find user by email
  UserModel.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ emailnotfound: "Please enter a valid email" });
    }
    
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
        sess = req.session;
        sess.email    = user.email;
        sess.username = user.name;

        req.flash("success","Successfully Loggedin! ");

        res.redirect("/user/home");

           } 
    else {
        return res
          .status(400)
          .json({ passwordincorrect: "Please provide correct password" });
      }
    });
  });

}

exports.logout = async (req, res) => {

 req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/user/login');
    });
}

function setPassword(password){
    var hashedPassword;
  
    bcrypt.hash(password, 10, function (err, hash) {
    hashedPassword = hash;

     });
}

exports.register = async (req, res) => {

  const hashedpassword = await bcrypt.hash(req.body.password,10);


    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedpassword
        
       });
     
        
    user.save().then(data => {

        // res.send({
        //     message:"User created successfully!!",
        //     user:data
        // });
        req.flash("success","You created a new User Account,Please Login Here! ");
        res.redirect("/user/login"); 

        

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
   
  
};
