require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000; // Default to 5000 if PORT is not set
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_USER = process.env.EMAIL_USER;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', (req, res) => {
  const { email, message, name, subject } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or other email provider
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // Define mail options
  const mailOptions = {
    from: email,
    to: 'ebunowoeye316@gmail.com',
    subject: `New Message: ${subject || 'No Subject'}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending message:', error);
      res.status(500).send('Error sending message');
    } else {
      console.log('Message sent successfully:', info.response);
      res.status(200).send('Message sent successfully');
    }
  });
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
