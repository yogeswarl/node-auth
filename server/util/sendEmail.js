const nodemailer = require('nodemailer');
const { AUTH_EMAIL, AUTH_PASS } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth:{
    user: AUTH_EMAIL,
    pass: AUTH_PASS
  },
  send: true
});

transporter.verify((error,success) => {
 if (error){
  console.log(error)
 }
 else {
  console.log('Server is ready to take messages')
  console.log(success)
 }
})


const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;

