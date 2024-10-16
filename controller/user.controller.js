let User = require('../model/user.model');
let Newsletter = require('../model/newsletter.model');
const dotenv = require ('dotenv');
const jwt = require("jsonwebtoken")
const nodemailer = require ('nodemailer')
const mongoose = require ('mongoose');
const bcryptjs = require('bcryptjs');
const verifyToken = require('../middleware/verifyToken');



dotenv.config();


const pass = process.env.PASS;
const USERMAIL = process.env.USERMAIL;
const tokenStorage = new Map();

function generating() {
  return Math.floor(1000 + Math.random() * 9000)
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USERMAIL,
    pass: pass
  },
  tls: {
    rejectUnauthorized: false, // this ignores the invalid certificate
  },
})

const Captain =
  "https://res.cloudinary.com/dbp6ovv7b/image/upload/v1715783819/tvf5apwj5bwmwf2qjfhh.png";


  const newsletter = (req, res) => {
    let form = new Newsletter(req.body)
    form.save()
    .then((response)=>{
      console.log(response);
      return res.status(200).json({status: true, message: 'email submitted successfully'})
    })
    .catch((err)=> {
      if(err.code === 11000){
        res.status(409).json({ status: false, message: "Duplicate user found" });
      }
      else{
        res.status(400).json({ status: false, message: "Fill in appropriately" });
      }
    })
  }
  const register = (req, res) => {
    let form = new User(req.body);
    const { firstname, lastname, email, password } = req.body;
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    })
    // console.log(newUser);
    newUser.save()
      .then((result) => {
        console.log(result);
        res.status(200).json({ status: true, message: "User signed up successfully", result });
        console.log('✔ user found', email);
        const mailOptions = {
          from: process.env.USER,
          to: email,
          subject: "Welcome to Shoppinsphere",
          html: `
            <div style="background-color: rgb(4,48,64); padding: 20px; color: rgb(179,14,100); border-radius: 5px">
              <img src="${Captain}" alt="Shoppinsphere Logo" style="max-width: 150px; height: 130px; margin-bottom: 20px; margin-left: 300px;">
              <div style="text-align: center;">
              <p style="font-size: 18px;">Hello, ${firstname}!</p>
              <p style="font-size: 16px;">Welcome to Captain College! We're thrilled that you've chosen to register with us.</p>
              <p style="font-size: 16px;">If you have any questions or need assistance, feel free to reach out @abdullahisamsudeen@gmail.com.</p>
              <p style="font-size: 16px;">Thank you for joining us.</p>
              <p style="font-size: 16px;">Best regards,</p>
              <p style="font-size: 16px;">The Shoppinsphere Team</p>
              </div>
            </div>
          `,
        };
          return transporter.sendMail(mailOptions)
      })
      .catch((err) => {
        console.error(err);
        if (err.code === 11000) {
          res.status(409).json({ status: false, message: "Duplicate user found" });
        } else {
          res.status(400).json({ status: false, message: "Fill in appropriately" });
        }
      });
  }


const userLogin = async (req, res) => {
  console.log(req.body);
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const secrete = process.env.SECRET;
      user.validatePassword(password, (err, same) => {
        if (err) {
          res.status(500).json({ message: "Server error", status: false });
        } else {
          if (same) {
            const token = jwt.sign({ email }, secrete, { expiresIn: "10h" });
            // console.log(token);
            res.status(200).json({ message: "User signed in successfully", status: true, token, user });
          } else {
            res.status(401).json({ message: "Wrong password, please type the correct password", status: false });
          }
        }
      });
    } else {
      res.status(404).json({ message: "Wrong email, please type the correct email", status: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", status: false });
  }
}

// const getDashboard = (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const secret = process.env.SECRET;

//     jwt.verify(token, secret, async (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(401).json({ status: false, message: "Unauthorized access" });
//       } else {
//         try {
//           const userDetail = await userModel.findOne({ email: result.email });
//           if (userDetail) {
//             res.json({ status: true, message: "Welcome to the Dashboard", userDetail });
//             console.log(result);
//           } else {
//             res.status(404).json({ status: false, message: "User not found" });
//           }
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ status: false, message: "Server error" });
//         }
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ status: false, message: "Bad request" });
//   }
// };

const getDashboard = async (req, res) => {
  try {
      // User details are already populated in req.user by the middleware
      const userId = req.user.id; // Get user ID from the authenticated request

      // Fetch user details from the database
      const userDetail = await userModel.findById(userId);
      if (!userDetail) {
          return res.status(404).json({ status: false, message: "User not found" });
      }

      res.json({ status: true, message: "Welcome to the Dashboard", userDetail });
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Server error" });
  }
};




const password = (req, res) => {
  const { email } = req.body;
  console.log(email);
  const resetToken = generating();
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24); // Token expires in 24 hours

  tokenStorage.set(resetToken, { email, expires: expirationDate, pin: generating() });
  console.log(email);

  User.findOne({ email })
    .then((result) => {
      if (result === null) {
        console.log('user not found', email);
        res.status(500).json({ message: '❌ User not found', status: false })
      } else {
        console.log('✔ user found', email);
        const mailOptions = {
          from: USERMAIL,
          to: email,
          subject: 'Your OTP Code',
          text: `Your 4-digit PIN code is: ${resetToken}`,
          // html:,
        };
        return transporter.sendMail(mailOptions)
          .then((emailResult) => {
            console.log(emailResult);
            User.updateOne({ email }, { $set: { otp: resetToken } })
              .then(result => {
                console.log(result);
                res.status(200).json({ message: 'Email sent successful', status: true });
              }).catch(() => {
                res.status(500).json({ message: 'Error occur while updating Model', status: false });
              });
            // res.status(200).json({ message: 'Email sent successful' });
          }).catch((error) => {
            console.log(error);
            res.status(500).json({ message: 'Error occur while sending email', status: false });
          });
      }
    }).catch((err) => {
      console.log(err);
      console.error('Error in sendResetEmail:', err);
      res.status(500).json({ message: '❌ Internal server error', status: false });
    });

}


const resetPassword = (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'Missing required data' });
  }
  console.log('missing data');
  console.log(email, otp, newPassword);

  User.findOne({ email, otp })
    .then(async (user) => {
      if (!user) {
        return res.status(500).json({ message: 'User not found' });
      }
      console.log('is ok');
      const hashPassword = await bcryptjs.hash(newPassword, 10);
      userModel.updateOne({ _id: user._id }, { password: hashPassword })
        .then(user => {
          res.status(200).json({ message: 'Password reset successful' });
          console.log('Password reset successful');
        }).catch((error) => {
          res.status(500).json({ message: 'Internal server error' });
          console.log('internal server error');
        })

    }).catch((error) => {
      console.log(error);
    })
}

module.exports = {register, userLogin, password, resetPassword, getDashboard, newsletter}
