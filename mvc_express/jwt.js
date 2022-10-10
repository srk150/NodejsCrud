const { sign , verfy } = require('jsonwebtoken');

const createTokens = (user) =>{

const accessToken  = sign(
	{ email:user.email,id:user.id },
	 "mylogin_jwtToken");
return accessToken;

}; 

const validateToken = (req,res,next)=>{
	const accessToken = req.cookie["access-token"];
   if(!accessToken) return res.status(400).json({error:"User not Authenticate"});
 try{
    const validToken = verify(accessToken,"mylogin_jwtToken")
     if(validToken){
     	req.authenticated = true;
     	return next();
     }

 }catch(err){
 	return res.status(400).json({error:err});


 }

}



module.exports = { createTokens,validateToken }