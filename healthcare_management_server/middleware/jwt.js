const jwt = require("jsonwebtoken");
User = require("../model/masterUser");
const secretKey =
  "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

exports.generateToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: "86400s" });
};
// exports.verifyToken = (req, res, next) => {
//   if (
//     req.headers &&
//     req.headers.authorization &&
//     req.headers.authorization.split(" ")[0] === "Bearer"
//   ) {
//     jwt.verify(
//       req.headers.authorization.split(" ")[1],
//       secretKey,
//       function (err, decode) {
//         if (err) {
//           console.log(err.message)
//           let err1 = "";
//           if (err.message == "jwt expired") {
//             err1 = new Error("Session expired");
//           } else {
//             err1 = new Error("Unauthorized access");
//           }
//           err1.status = 401;
//           return next(err1);
//         }
//         User.findOne({
//           _id: decode.id,
//         }).then((result) => {
//           if (result) {
//             if (result._id == decode.id) {
//               next();
//             } else {
//               let err = new Error("Unauthorized user");
//               err.status = 401;
//               return next(err);
//             }
//           }
//         });
//       }
//     );
//   }
// };


exports.verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    //console.log(req.headers.authorization)
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      secretKey,
      function (err, decode) {
        if (err) {
          console.log(err.message)
          let err1 = "";
          if (err.message == "jwt expired") {
            err1 = new Error("Session expired");
          } else {
            err1 = new Error("Unauthorized access");
          }
          err1.status = 401;
          return next(err1);
        }
        User.findOne({
          email: decode.email,
          role:decode.role
        }).then((result) => {
          if (result) {
            if (result.role == decode.role) {
              next();
            } else {
              let err = new Error("Unauthorized user");
              err.status = 401;
              return next(err);
            }
          }
        });
      }
    );
  }
};









exports.decodeJWT = (token) => {
  let userinfo = {};
  let err1 = null;
  jwt.verify(token, secretKey, function (err, decode) {
    err1 = err;
    userinfo.firstName = decode.firstName;
    userinfo.lastName = decode.lastName;
    userinfo.role=decode.role
    userinfo.email=decode.email
    userinfo.id=decode.id
  });
  if (err1 != null) {
    let err = "";
    if (err.message == "jwt expired") {
      err = new Error("Session expired");
    } else {
      err = new Error("Unauthorized access");
    }
    err.status = 401;
    return next(err);
  } else {
    return userinfo;
  }
};

exports.isGuest = (req, res, next) => {
  if (req.headers.authorization.split(" ")[1] != null) {
    return next();
  } else {
    let err = new Error("Already logged in");
    err.status = 400;
    return next(err);
  }
};

exports.isLoggedIn = (req, res, next) => {
  if (req.headers.authorization.split(" ")[1] != null) {
    return next();
  } else {
    let err = new Error("You need to log in first");
    err.status = 400;
    return next(err);
  }
};

exports.isAuthor = (req, res, next) => {
  
  if(req.params.id!=null){
    product_id = req.params.id;
  }else{
    product_id = req.body.product_id;
  }
  Product.find({ product_id: product_id })
    .then((trade) => {
      if (trade.length > 0) {
        let jwterror,
          userinfo = this.decodeJWT(req.headers.authorization.split(" ")[1]);
        if (jwterror != null) {
          let err = new Error("Unauthorized access to the resource");
          err.status = 401;
          return next(err);
        }
        if (trade[0].seller_id == userinfo.id) {
          return next();
        } else {
          let err = new Error("Unauthorized access to the resource");
          err.status = 401;
          return next(err);
        }
      }
    })
    .catch((err) => next(err));
};

exports.isAdmin=(req,res,next)=>{
  let token=req.headers.authorization.split(' ')[1]
  let userinfo=this.decodeJWT(token)
  //console.log(userinfo)
  if(userinfo.role=="admin"){
    return next()
  }else{
    let err = new Error("Unauthorized access to the resource");
    err.status = 401;
    return next(err); 
  }
}
