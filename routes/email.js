const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const express = require('express');
const router = express.Router();
const testRoute = require('./test');
const paths = require('path');

router.get('/sendemail', (req,res,next)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ENTER  YOUR SENDGRID DETAILS',
            pass: 'ENTER  YOUR SENDGRID DETAILS'
        }
    });

transporter.sendMail({
    to:testRoute.emailid,
    from : 'ENTER  YOUR SENDGRID DETAILS',
    subject: 'ENTER  YOUR SENDGRID DETAILS',
    html: "Hi there,<br>" +
        "Please find the attached Report<br>" ,
        
    attachments: [{
        file: "Report.pdf",
        path: paths.join(__dirname,'..','report.pdf')
    }]
});
res.render("email",{ testId: testRoute.testid2 });
});

module.exports = router;