const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const specialitySchema = new Schema({
    specId: {type: String, required: [true, 'specId required']},
    specName: {type: String, required: [true, 'spec name is required']},
    imageUrl:  {type: String, required: [true, 'URL is required']}
},
{
  timestamps:true
}
);


//collection name is stories in the database
module.exports = mongoose.model('Speciality', specialitySchema);