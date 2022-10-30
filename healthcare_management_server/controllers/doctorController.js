// const  Patient = require("../model/patientModel");
// const  User = require("../model/masterUser");
const  Doctor = require("../model/doctorModel");
const  Appointment = require("../model/appointmentModel");
const jwtMiddleware = require("../middleware/jwt");

exports.GenerateSchedule = (req,res,next)=>{
    let token = req.headers.authorization.split(" ")[1];
    let userinfo = jwtMiddleware.decodeJWT(token);
    Doctor.updateOne({ email: userinfo.email },{$set:{"schedule":[]}})
    .then(()=>{
      Doctor.updateOne({ email: userinfo.email }, { $push: { schedule: req.body } })
      .then((result) => {
        if (result.acknowledged == true) {
          res.send(true);
        } else {
          res.send(false);
        }
      })
      .catch((err) => next(err));
    })
    .catch((err) => next(err));
}


exports.GetDoctors=(req,res,next)=>{
  let specId=req.params.id
  Doctor.find({specId:specId})
  .then((result)=>{
    res.send(result)
  })
  .catch(error=>next(error))
}
exports.GetSchedule=(req,res,next)=>{
  let doctorId=req.params.id
   Doctor.find({doctorId:doctorId},{schedule:1})
   .then((result)=>{
    Appointment.find({doctorId:doctorId},{_id:0,appointmentTimestamp:1})
  .then(result1=>{
    let arr=[]
    for(let i=0;i<result1.length;i++){
        arr.push(result1[i].appointmentTimestamp)
    }
    let obj={booked:arr}
    result.push(obj)
    //console.log(result)
    res.send(result)
  })
  .catch(error=>next(error))
   })
   .catch(error=>next(error))
}

exports.GetAppointment=(req,res,next)=>{
  let token = req.headers.authorization.split(" ")[1];
  let userinfo = jwtMiddleware.decodeJWT(token);
  Appointment.aggregate([
    {
        $match:{
            doctorId:userinfo.id,
            status:"pending"
        }
    },
    {
        $lookup: {
            from: 'patients',
            localField:'patientId',
            foreignField:'patientId',
            pipeline:[
                {
                    $project:{
                        firstName:1,
                        lastName:1,
                        _id:0
                    }
                }
            ],
            as:'patientsdetails'
        }
    },
    {
        $unwind:{path:'$patientsdetails'}
    }
   
])
.then((result)=>{
    res.send(result)
})
.catch(error=>(next(error)))
}


exports.cancelAppointment=(req,res,next)=>{
  Appointment.updateOne({_id:req.params.id},{$set:{"status":"cancelled"}})
  .then((result)=>{
      if(result.acknowledged){
         res.send(true)
      }else{
        res.send(false)
      }
  })
  .catch(err=>next(err))
}