const  Patient = require("../model/patientModel");
// const  User = require("../model/masterUser");
const  Doctor = require("../model/doctorModel");
const  Appointment = require("../model/appointmentModel");
const jwtMiddleware = require("../middleware/jwt");

exports.BookAppointment = (req,res,next)=>{
    let token = req.headers.authorization.split(" ")[1];
    let userinfo = jwtMiddleware.decodeJWT(token);
    req.body.patientId=userinfo.id
   //console.log(userinfo)
    let appot=new Appointment(req.body)
    appot.save()
    .then((result) => {
      if (result) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((err) => next(err));
},

exports.GetAppointments=(req,res,next)=>{
    let token = req.headers.authorization.split(" ")[1];
    let userinfo = jwtMiddleware.decodeJWT(token);
    Appointment.aggregate([
        {
            $match:{
                patientId:userinfo.id,
                status:req.params.status
            }
        },
        {
            $lookup: {
                from: 'doctors',
                localField:'doctorId',
                foreignField:'doctorId',
                pipeline:[
                    {
                        $project:{
                            firstName:1,
                            lastName:1,
                            _id:0
                        }
                    }
                ],
                as:'doctordetails'
            }
        },
        {
            $unwind:{path:'$doctordetails'}
        }
       
    ])
    .then((result)=>{
        res.send(result)
    })
    .catch(error=>(next(error)))
}

exports.SearchPatient=(req,res,next)=>{
    let obj={}
    req.body.query=req.body.query.toLowerCase()
    obj[req.body.field]={$regex: new RegExp("^"+req.body.query)}
    console.log(obj)
    Patient.find(obj)
    .then((result)=>{
        console.log(result);
        res.send(result);
    })
    .catch(err=>next(err))
}

exports.GetProfile=(req,res,next)=>{
    //console.log(req.body)
    Patient.findOne({patientId:req.params.id},{_id:0,firstName:1,lastName:1,age:1,gender:1,height:1,weight:1,bloodPressure:1,bloodGroup:1,sugarLevel:1,patientId:1})
    .then((result)=>{
        res.send(result)
    })
    .catch(err=>next(err))
}

exports.GetHistory=(req,res,next)=>{
    Appointment.aggregate([
        {
            $match:{
                patientId:req.params.id
            }
        },
        {
            $lookup: {
                from: 'doctors',
                localField:'doctorId',
                foreignField:'doctorId',
                pipeline:[
                    {
                        $project:{
                            firstName:1,
                            lastName:1,
                            _id:0
                        }
                    }
                ],
                as:'doctordetails'
            }
        },
        {
            $unwind:{path:'$doctordetails'}
        }
       
    ])
    .then((result)=>{
        res.send(result)
    })
    .catch(err=>next(err))
}