const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], // Allow both localhost and 127.0.0.1
    methods: ['GET', 'POST', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type'], // Allow these headers
}));

app.use(express.json()); // Parse JSON-encoded request bodies

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Email route
app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
            return res.status(500).send('Error sending email');
        }
        console.log("Email sent:", info.response);
        res.status(200).send('Email sent successfully');
    });
});

// Start the server
const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
