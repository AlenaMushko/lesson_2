'use strict';
const nodemailer = require('nodemailer');

async function sendEmail(data) {
  const { userName, userEmail, userMessage } = data;

  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'max_goit_63@outlook.com', // generated ethereal user
      pass: '63_max_goit', // generated ethereal password
    },
    tls: { rejectUnauthorized: false },
  });

  const emailContent = `<h1 style="color: green">Ви отримали листа! Від ${userName}</h1>
  <p>Він написав таке ${userMessage} повідомлення.</p>
  <p>Його контактний email ${userEmail}</p>
  <p style="color: blue">
    Вітаю ви отримали листа від компанії GoIT. Купіть 50 сковородок!
  </p>`;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'max_goit_63@outlook.com', // sender address
    to: 'maxymasan.dev@gmail.com', // list of receivers
    subject:
      'City of Yellow Waters, Three Horses Monument, July 4, 7:00 p.m., First Galactic Conference', // Subject line
    text: userMessage, // plain text body
    html: emailContent, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  return true;
}

module.exports = sendEmail;
