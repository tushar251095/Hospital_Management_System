const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hospitalSchema = new Schema({
    name: {type: String,required: [true, 'name is required'], unique: [true, 'name already used']},
    status: {type: String,required: [true, 'status is required']},
    count:{type:Number,required: [true, 'count is required']},
    remCount:{type:Number,required: [true, 'remCount is required']},
},
{
  timestamps:true
}
);


//collection name is stories in the database
module.exports = mongoose.model('Hospital', hospitalSchema);