const rateLimit=require('express-rate-limit')

exports.loginLimiter=rateLimit({
    windowMs:60 * 1000,
    max:5,
    handler:(req,res,next)=>{
        let err = new Error('Too many login request.Try again later');
            err.status = 429;
            next(err);
    }
   // message:"Too many login request.Try again later"
});