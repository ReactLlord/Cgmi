require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
  const { email, message, name, subject } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or other email provider
    auth: {
      user: 'EMAIL_USER ',
      pass: 'EMAIL_PASS',
    },
  });

  // Define mail options
  const mailOptions = {
    from: email,
    to: 'ebunowoeye316@gmail.com',
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\n\Subject: ${subject}\n\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error sending message');
    } else {
      console.log('Message sent: ' + info.response);
      res.send('Message sent successfully');
    }
  });
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
