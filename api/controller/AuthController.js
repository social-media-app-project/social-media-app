const bcrypt = require('bcryptjs');
const{body, validationResult, check} = require('express-validator');
const User = require('../models/Users');
exports.jwt_signup_post = [
  body('first_name').trim().escape().isLength({min:1}).withMessage("First name is required").matches(/^[A-Za-z]+$/).withMessage('Name must be alphabetic.'),
  body('last_name').trim().escape().isLength({min:1}).withMessage("Last name is required").matches(/^[A-Za-z]+$/).withMessage('Name must be alphabetic.'),
  body('username').trim().escape().isLength({min:1}).withMessage("Username is required"),
  body('password').trim().escape().isLength({min:1}).withMessage("Password is required"),
  body('password_confirm').trim().escape().isLength({min:1}).withMessage("Password is required"),
  body('bio').trim().escape(),
  check('password_confirm', 'passwords do not match')
    .custom((val,{req})=>{
      if(val===req.body.password){
        return true;
      }else{
        return false;
      }
    }),
  check('username', 'username already exists')
    .custom(async(val) =>{
      let user = await User.findOne({username:val})
      if(user!==null){
        return Promise.reject('username already in use')
      }
    }),

  (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      //maybe there should be a different error code 
      return res.status(404).send({errors:errors.array()})
    }
    try {
      bcrypt.hash(req.body.password,10,(err,hashed)=>{
        const user = new User({
          first_name:req.body.first_name,
          last_name:req.body.last_name,
          username:req.body.username,
          password: hashed+"",
          dob:req.body.dob,
          friends:[],
          bio:req.body.bio,
        })
        user.save(function(err){
          if(err){
            throw(err);
          }
          /**
           * Can set up JWT token to be sent here on the sign up 
           * and can have it on sign in 
           */
        })
        if(err){
          throw (err);
        }
      })
      
    } catch (error) {
      return res.status(400).send({errors:[{msg:"internal errorf"}]});
      
    }
    return res.status(200).send({success:[{msg:'Thanks for signing up'}]})
  }
]