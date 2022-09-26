const mongoose= require('mongoose');
const Schema= mongoose.Schema;

//Category Schema
const UserSchema= new Schema({
    fullName:{type:String,required:[true,'Full Name is required']},
    email:{type:String, required:[true,'Email is required']},
    userName:{type:String,required:[true,'username is required']},
    phone:{type:String,required:[true,'Phone Number is required']},
    role:{type:String,required:[true,'Role is required']}
},
{
    timestamps:true
});


//creating model object
let User = mongoose.model('User',UserSchema);

module.exports = {
  User
}