const  User = require("../model/userModel");
const { v4: uuidv4 } = require("uuid");
//api to add new user 
exports.registerUser = (req, res, next) => {
 console.log(req.body);
 req.body.userId = uuidv4();
  let user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(true);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};

exports.test = (req, res, next) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};
