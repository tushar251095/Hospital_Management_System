var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hmsuncc@gmail.com',
      pass: 'xpzxcarwyqrhzwyi' //hmsuncc@123
    }
  });
  
  exports.sendMail=(to,subject,body)=>{
    var mailOptions = {
        from: 'hmsuncc@gmail.com',
        to: to,
        subject: subject,
        text: body
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('Email not sent: ' + error);
        } else {
          console.log('Email sent: ' + info.response);
        
        }
      });
  }
 
  
 