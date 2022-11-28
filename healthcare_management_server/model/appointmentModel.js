const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
    doctorId: {type: String, required: [true, 'doctorId required']},
    patientId: {type: String, required: [true, 'patientId is required']},
    appointmentTimestamp: {type: Number, required: [true, 'timestamp is required']},
    appointmentDetails: {type: Object, default:{}},
    status: {type: String, default:'pending'},
    discription:{type: String, required: [true, 'discription is required']},
    isAdmitted:{type:String},
    admitDetails:{type:Object},
},
{
  timestamps:true
}
);


//collection name is stories in the database
module.exports = mongoose.model('Appointment', appointmentSchema);
