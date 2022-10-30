// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const userSchema = new Schema({
//     userId: {type: String, required: [true, 'UserID required']},
//     firstName: {type: String, required: [true, 'first name is required']},
//     lastName: {type: String, required: [true, 'last name is required']},
//     username: {type: String, required: [true, 'Username is required']},
//     email: { type: String, required: [true, 'email address is required'], unique: [true, 'this email address has been used'] },
//     password: { type: String, required: [true, 'password is required'] },
//     contact: { type: String, required: [true, 'contact is required'] },
//     role: { type: String, default:"patient" }
// },
// {
//   timestamps:true
// }
// );

// userSchema.pre('save', function(next){
//   let user = this;
//   if (!user.isModified('password'))
//       return next();
//   bcrypt.hash(user.password, 10)
//   .then(hash => {
//     user.password = hash;
//     next();
//   })
//   .catch(err => next(error));
// });


// userSchema.methods.comparePassword = function(inputPassword) {
//   let user = this;
//   return bcrypt.compare(inputPassword, user.password);
// }

// //collection name is stories in the database
// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientSchema = new Schema({
    patientId: {type: String, required: [true, 'UserID required']},
    firstName: {type: String, required: [true, 'first name is required']},
    lastName: {type: String, required: [true, 'last name is required']},
    age:{type: String, required:[true, 'Age is required']},
    gender:{type: String, required:[true, 'Gender is required']},
    height:{type: String},
    weight:{type: String},
    bloodGroup:{type: String},
    bloodPressure:{type: String},
    sugarLevel:{type: String},
    email: { type: String, required: [true, 'email address is required'], unique: [true, 'this email address has been used'] },
    contact: { type: String, required: [true, 'contact is required'] },
    role: { type: String, default:"patient" }
},
{
  timestamps:true
}
);



//collection name is stories in the database
module.exports = mongoose.model('Patient', patientSchema);