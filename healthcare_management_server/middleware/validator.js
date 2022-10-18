const {validationResult} = require('express-validator')

const {body} = require('express-validator')
exports.idValidator=(req,res,next)=>{
    let product_id = req.params.id;
  if(!product_id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
    let err = new Error('Invalid ID for requested resource');
    err.status = 400;
    return next(err);
}else{
    next()
}
}

exports.validateSignUp=[body('firstName',"firstName cannot be empty").notEmpty().trim().escape(),body('lastName','lastName cannot be empty').notEmpty().trim().escape(),body('email','Email must be a valid email address').isEmail().trim().escape().normalizeEmail(), 
body('password','Password must be atleast 8 character and atmost 64 character').isLength({min:8,max:64}),body('contact','contact must be atleast 10 character and atmost 10 character').isLength({min:10,max:10})];

exports.validateLogIn=[body('email','Email must be a valid email address').isEmail().trim().escape().normalizeEmail(), 
body('password','Password must be atleast 8 character and atmost 64 character').isLength({min:4,max:64})];

exports.validateResult=(req,res,next)=>{
    let errors=validationResult(req)
    if(!errors.isEmpty()){
          return res.send(errors)
    }else{
        next()
    }
}

exports.validateProduct=[body('year','year cannot be empty and must be atleast and atmost of 4 digit').notEmpty().trim().isLength({min:4,max:4}).escape(), 
body('seller','seller cannot be empty').notEmpty().trim().escape(),body('description','description cannot be empty').notEmpty().trim().escape(),body('prod_name','Product Name cannot be empty').notEmpty().trim().escape()];