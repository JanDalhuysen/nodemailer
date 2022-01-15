"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  const users = [
    "email1@gmail.com",
    "email2@gmail.com",
    "email3@gmail.com",
    "email4@gmail.com",
    "email5@gmail.com",
    "email6@gmail.com",
  ];

  const sleepNow = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your email",
      pass: "your password",
    },
  });

  for (var i = 0; i < users.length; i++) {
    let person = users[i];
    let subject = "Hello " + person;
    await sleepNow(50000);
    console.log("Sending to: " + person);
    console.log(i);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"your name" <your email>', // sender address
      to: person, // list of receivers
      subject: subject, // Subject line
      text: "Hello World", // plain text body
      html: '<h1>Hello World</h1>', // html body
    });
    console.log("Sent to: " + person);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

main().catch(console.error);
