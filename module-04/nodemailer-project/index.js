
const nodemailer = require("nodemailer");
require("dotenv").config();

// 1. Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 2. Create email options
const mailOptions = {
    from: process.env.EMAIL_USER,

    to: "muhammad.umair1019@gmail.com",

    subject: "Hello from Node.js",

    text: "This is my first email using Nodemailer!"
};

// 3. Send email
transporter.sendMail(mailOptions, (error, info) => {

    if (error) {
        console.log("Error:", error);
    } else {
        console.log("Email sent successfully!");
        console.log(info.response);
    }

});
