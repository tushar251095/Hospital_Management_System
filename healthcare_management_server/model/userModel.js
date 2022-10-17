const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    userId: {type: String, required: [true, 'UserID required']},
    firstName: {type: String, required: [true, 'first name is required']},
    lastName: {type: String, required: [true, 'last name is required']},
    username: {type: String, required: [true, 'Username is required']},
    email: { type: String, required: [true, 'email address is required'], unique: [true, 'this email address has been used'] },
    password: { type: String, required: [true, 'password is required'] },
    contact: { type: String, required: [true, 'contact is required'] },
    role: { type: String, default:"patient" }
},
{
  timestamps:true
}
);

userSchema.pre('save', function(next){
  let user = this;
  if (!user.isModified('password'))
      return next();
  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash;
    next();
  })
  .catch(err => next(error));
});


userSchema.methods.comparePassword = function(inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
}

//collection name is stories in the database
module.exports = mongoose.model('User', userSchema);