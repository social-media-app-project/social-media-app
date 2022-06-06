const{body, validationResult, check} = require('express-validator');

exports.jwt_signup_post = [
  body('first_name').trim().escape().isLength({min:1}).withMessage("First name is required").matches(/^[A-Za-z]+$/).withMessage('Name must be alphabetic.'),
  body('last_name').trim().escape().isLength({min:1}).withMessage("Last name is required").matches(/^[A-Za-z]+$/).withMessage('Name must be alphabetic.'),
  body('username').trim().escape().isLength({min:1}).withMessage("Username is required"),
  body('password').trim().escape().isLength({min:1}).withMessage("Password is required"),
  body('password_confirm').trim().escape().isLength({min:1}).withMessage("Password is required"),
  check('passowrd_confirm', 'passwords do not match')
    .custom((val,{req})=>{
      if(val===req.body.password){
        return true;
      }else{
        return false;
      }
    }),
    //add username exists check

  (req,res,) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(404).send({errors:errors.array()})
    }
  }



]