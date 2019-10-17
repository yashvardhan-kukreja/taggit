var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
const sg_transport = require('nodemailer-sendgrid-transport');
var path = require("path");
var port = process.env.PORT || 3294;


app.get('/:email', (req, res) => {

    let options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };

    let client = nodemailer.createTransport(sg_transport(options));

    // var smtp = nodemailer.createTransport({
    //     service: 'gmail',
    //     secure: false,
    //     auth: {
    //         user: 'tagg.it.18@gmail.com',
    //         pass: 'taggitrocks@1998'
    //     }
    // });
    var mailOptions = {
        to: req.params.email,
        from: 'tagg.it.18@gmail.com',
        subject: 'TaggIt Notification!!!',
        html: '<h1>ALERT! ALERT! <br> Clothes are being stolen</h1>'
    };

    client.sendMail(mailOptions, function (err) {
        if (err) {
            console.log(err);
            console.log("Error sending the mail");
            res.json({success: false, message: "Problem sending the email"});
        } else {
            console.log("Mail sent");
            res.json({success: true, message: "Mail sent successfully"});
        }

    });
});


app.listen(port, () => {
    console.log("App running successfully on port number: " + port + "..")
});
