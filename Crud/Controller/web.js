const EmployeeModel = require('../Model/user');
const bcrypt        = require('bcrypt');

const validateRegisterInput = require("../Validation/register");


exports.index = async (req, res) => {

res.render('web/login'); 


};


exports.dashboard = async (req, res) => {

res.render('web/dashboard'); 


};

exports.employee = async (req, res) => {

res.render('web/users'); 


};


exports.addemployee = async (req, res) => {

const success = req.flash('success');
const alert   = req.flash('alert');
res.render('web/add_emp',{ success,alert }); 


};




exports.signup = async (req, res) => {
    
res.render('web/signup');

};

exports.addEmployeeData = async (req, res) => {
    
  // Form validation
  //const { errors, isValid } = validateRegisterInput(req.body);

   // Check validation
  //if (!isValid) {
    
    //return res.status(400).json(errors);
    
    //const alert = errors
    //console.log(alert);
  //  req.flash("alert",alert);
  //  res.redirect('/home/addemployee');


  //}else{

    req.checkBody('email','Email field is required').notEmpty();
    errors = req.validationErrors();

    if(errors){
          
          console.log("errors: " + errors);
          req.flash("alert",errors);
          res.redirect('/home/addemployee');


    } else{
        


const hashedpassword = await bcrypt.hash(req.body.password,10);

    const employees = new EmployeeModel({
        emp_name: req.body.emp_name,
        email: req.body.email,
        password: hashedpassword,
        designation: req.body.designation,
        department: req.body.department,
        emp_type: req.body.emp_type,
        salary: req.body.salary

        
       });
     
        
    employees.save().then(data => {

        
        req.flash("success","You have successfully created a account! ");
        res.redirect("/home/addemployee"); 

        

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
   
 //}
        console.log('No Errors');
        //res.render("/");
    }

};


