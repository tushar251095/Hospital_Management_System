const  Patient = require("../model/patientModel");
const  User = require("../model/masterUser");
const  Doctor = require("../model/doctorModel");
const  Spec = require("../model/specialitiesModel");
const  Hospital = require("../model/hospitalModel");
const jwtMiddleware = require("../middleware/jwt");
const mailServer = require("../mailserver/mailconfig")
const { v4: uuidv4 } = require("uuid");

const emailValidator = require('deep-email-validator');
 

//api to add new user 
exports.registerUser = (req, res, next) => {
 //console.log(req.body);
 req.body.patientId = uuidv4();
 req.body.role="patient"
 req.body.firstName=req.body.firstName.toLowerCase()
 req.body.lastName=req.body.lastName.toLowerCase()
 req.body.email=req.body.email.toLowerCase()
  let patient = new Patient(req.body);
  let obj={
    email:req.body.email,
    password:req.body.password,
    role:req.body.role
  }
  patient
    .save()
    .then(() => {
      let user = new User(obj)
      user. save()
      .then(()=>{
        res.send(true);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          err.status = 400;
        }
        next(err);
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};



exports.registerDoctor = (req, res, next) => {
  //console.log(req.body);
  req.body.doctorId = uuidv4();
  req.body.role="doctor"
  req.body.password=Math.random().toString(36).slice(-8)
  console.log( req.body.password)
  emailValidator.validate(req.body.email)
  .then(isvalid=>{
    if(!isvalid.valid){
      let err = new Error("Check your email address");
      err.status = 404;
      return next(err);
    }else{
      req.body.firstName=req.body.firstName.toLowerCase()
      req.body.lastName=req.body.lastName.toLowerCase()
      req.body.email=req.body.email.toLowerCase()
       let obj={
         email:req.body.email,
         password:req.body.password,
         role:req.body.role
       }
       Spec.findOne({specId:req.body.specId})
       .then((output)=>{
          //console.log(output)
          req.body.specialization=output.specName;
          let doctor = new Doctor(req.body);
          doctor
         .save()
         .then(() => {
           let user = new User(obj)
           user. save()
           .then(()=>{
            mailServer.sendMail(req.body.email,"HMS doctor login password","Your login password for account"+" "+req.body.email+" is "+req.body.password)
            res.send(true);
           })
           .catch((err) => {
             if (err.name === "ValidationError") {
               err.status = 400;
             }
             next(err);
           });
         })
         .catch((err) => {
           if (err.name === "ValidationError") {
             err.status = 400;
           }
           next(err);
         });
       })
       .catch(err=>next(err))
    }
  })
  .catch(err=>next(err))
 
 
 
   
 };

let getDeatils=(role,email)=>{
  return new Promise((resolve,reject)=>{
    if(role=='patient'){
      Patient.findOne({email:email})
      .then(result=>{
           resolve(result)
      })
      .catch(error=>reject(error))
   }else if(role=='doctor'){
    Doctor.findOne({email:email})
    .then(result=>{
         resolve(result)
    })
    .catch(error=>reject(error))
   }else{
    User.findOne({email:email})
    .then(result=>{
      resolve(result)
    })
   }
  })
}
exports.Login = (req, res, next) => {
  let email = req.body.email.toLowerCase();
  let password = req.body.password;
  User
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        let err = new Error("wrong email address");
        err.status = 404;
        return next(err);
      } else {
        user.comparePassword(password).then((result) => {
          if (result) {
            // console.log(user);
            const userinfo = {};

            getDeatils(user.role,user.email)
            .then(result=>{
              if(result.role=="patient"){
                userinfo.firstName=result.firstName,
                userinfo.lastName=result.lastName,
                userinfo.role=result.role
                userinfo.email=result.email
                userinfo.id=result.patientId
              }else if(result.role=="admin"){
                userinfo.firstName="admin",
                userinfo.lastName="admin",
                userinfo.role="admin"
                userinfo.email=result.email
                userinfo.id='hdjhdjhdhddhuh'
              }else if(result.role=="doctor"){
                userinfo.firstName=result.firstName,
                userinfo.lastName=result.lastName,
                userinfo.role=result.role
                userinfo.email=result.email
                userinfo.id=result.doctorId
              }
              //console.log(userinfo)
              const token = jwtMiddleware.generateToken(userinfo);
              
              res.json({
                token
              });
            })
          } else {
            let err = new Error("wrong password");
            err.status = 404;
            return next(err);
          }
        });
      }
    })
    .catch((err) => next(err));
};

exports.geAllSpecialities=(req,res,next)=>{
  Spec.find()
  .then((result)=>{
    //console.log(result)
    res.send(result)
  })
  .catch(error=>next(error))
}

exports.addSpecialities=(req,res,next)=>{
  req.body.specId = uuidv4();
   let speciality= new Spec(req.body)
   speciality.save()
   .then((result)=>{
      if(result){
        res.send(true)
      }else{
        res.send(false)
      }
   })
   .catch(error=>next(error))
}

exports.getDoctors=(req,res,next)=>{
   Doctor.find()
   .then((result)=>{
      res.send(result)
   })
   .catch(error=>next(error))
}

exports.editProfile=(req,res,next)=>{
  if(req.body.role=="doctor"){
    Spec.findOne({specId:req.body.specId})
    .then(result=>{
       req.body.specialization=result.specName
       Doctor.updateOne({doctorId:req.body.doctorId},{$set:req.body})
       .then(result=>{
          if(result.modifiedCount==1){
            res.send(true)
          }else{
            res.send(false)
          }
         
       })
       .catch(err=>next(err))
    })
    .catch(err=>next(err))
  }else{
    res.send(false)
  }
 
}


exports.getProfile=(req,res,next)=>{
  if(req.params.user=="patient"){
      Patient.findOne({patientId:req.params.id})
      .then((result)=>{
          res.send(result)
      })
      .catch(err=>next(err))
  }else{
    Doctor.findOne({doctorId:req.params.id})
    .then((result)=>{
      res.send(result)
  })
  .catch(err=>next(err))
  }
}

exports.AdminUpdateHospitalDetails=(req,res,next)=>{
      Hospital.updateOne({name:req.body.name},{$set:req.body}, {upsert: true})
      .then(result=>{
        if(result.acknowledged){
          res.send(true)
        }else{
          res.send(false)
        }
          
      })
      .catch(err=>next(err))
}

exports.getHospitalDetails=(req,res,next)=>{
  Hospital.find({})
  .then(result=>{
    res.send(result)
  })
  .catch(err=>next(err))
}

exports.deleteHospitaldetails=(req,res,next)=>{
  Hospital.deleteOne({_id:req.params.id})
  .then(result=>{
    if(result.acknowledged){
      res.send(true)
    }else{
      res.send(false)
    }
  })
  .catch(err=>next(err))
}
