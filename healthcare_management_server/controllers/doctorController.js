const  Patient = require("../model/patientModel");
// const  User = require("../model/masterUser");
const  Doctor = require("../model/doctorModel");
const  Hospital = require("../model/hospitalModel");
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
    Appointment.find({doctorId:doctorId,status:'pending'},{_id:0,appointmentTimestamp:1})
  .then(result1=>{
    let arr=[]
    for(let i=0;i<result1.length;i++){
        arr.push(result1[i].appointmentTimestamp)
    }
    let obj={booked:arr}
    result.push(obj)
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
            status:req.body.status
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

exports.GetPatient=(req,res,next)=>{
Patient.findOne({patientId:req.params.id})
.then(data=>{
  res.send(data)
})
.catch(err=>next(err))
}

exports.updatePateintDetails=(req,res,next)=>{
  Appointment.updateOne({_id:req.body.appId},{$set:{"appointmentDetails":req.body,"status":"attended"}})
  .then(()=>{
     Patient.updateOne({patientId:req.body.patientId},{$set:{"height":req.body.height,"weight":req.body.weight,
      "bloodGroup":req.body.bloodGroup,
      "bloodPressure":req.body.bloodPressure,"sugarLevel":req.body.sugarLevel}})
      .then(()=>{
          res.send(true);
      })
      .catch(err=>next(err))
  })
  .catch(err=>next(err))
}

exports.admitStatus=(req,res,next)=>{
  Appointment.updateOne({'_id':req.body.appId},{$set:{'isAdmitted':req.body.isAdmitted}})
  .then(result=>{
    console.log(result)
    res.send(result.acknowledged)
  })
  .catch(err=>next(err))
}
exports.dischargeStatus=(req,res,next)=>{
  let dischargeDate=new Date()
  Appointment.updateOne({'_id':req.body.appId},{$set:{'isAdmitted':req.body.isAdmitted,"admitDetails.dischargeDate":dischargeDate}})
  .then(result=>{
     if(result.acknowledged){
        Appointment.findOne({'_id':req.body.appId})
        .then(result1=>{
            Hospital.updateOne({"name":result1.admitDetails.roomType},{$push:{'availableRooms':result1.admitDetails.roomNo}})
            .then(result2=>{
                if(result2.acknowledged){
                    Hospital.findOne({"name":result1.admitDetails.roomType})
                    .then(result3=>{
                      Hospital.updateOne({"name":result1.admitDetails.roomType},{$set:{'remCount':result3.remCount + 1}})
                       .then(result5=>{
                            if(result5.acknowledged){
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
            })
            .catch(err=>next(err))
        })
        .catch(err=>next(err))
     }
     else{
      res.send(false)
    }
  })
  .catch(err=>next(err))
}
exports.updateDoctorRounds=(req,res,next)=>{
      let data=req.body
      let id=req.body._id
      let patientId=req.body.patientId
      for (const [key, value] of Object.entries(data)) {
         if(value=='' || value==0 || value==undefined || key=="_id" || key=='patientId'){
            delete data[key]
         }
      }
     Appointment.updateOne({'_id':id}, { $addToSet: { 'admitDetails.rounds': data } })
     .then(result=>{
       if(result.acknowledged){
        for (const [key, value] of Object.entries(data)) {
          if(key=='comment' || key=='prescription'){
             delete data[key]
          }
       }
          Patient.updateOne({'patientId':patientId},{$set:data})
          .then(result1=>{
            if(result1.acknowledged){
              res.send(true)
            }else{
              res.send(false)
            }
          })
          .catch(err=>next(err))
       }else{
         res.send(false)
       }
     })
     .catch(err=>next(err))
}