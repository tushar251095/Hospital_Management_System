const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const masterUserSchema = new Schema({
    email: { type: String, required: [true, 'email address is required'], unique: [true, 'this email address has been used'] },
    password: { type: String, required: [true, 'password is required'] },
    role: { type: String, required: [true, 'password is required'] }
},
{
  timestamps:true
}
);

//$2b$10$dU00uT3HsTfuULQIiF23duB.DIBci7m5EM.SzRPpH5.i1DCBmAWNK
masterUserSchema.pre('save', function(next){
  let user = this;
  if (!user.isModified('password'))
      return next();
  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash;
    //console.log(hash)
    next();
  })
  .catch(err => next(error));
});


masterUserSchema.methods.comparePassword = function(inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
}

//collection name is stories in the database
module.exports = mongoose.model('MasterUser', masterUserSchema);