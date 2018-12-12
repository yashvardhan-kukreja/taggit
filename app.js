var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var sgtransport = require('nodemailer-sendgrid-transport');
var path = require("path");
var port = process.env.PORT || 3294;

var sendgrid_username = process.env.SENDGRID_USERNAME;
var sendrid_password = process.env.SENDGRID_PASSWORD;



app.get('/:email', (req, res) => {
    var options = {
        auth: {
            api_user: sendgrid_username,
            api_key: sendgrid_password
        }
    };

    var mailOptions = {
        to: req.params.email,
        from: 'tagg.it.18@gmail.com',
        subject: 'TaggIt Notification!!!',
        html: '<h1>ALERT! ALERT! <br> Clothes are being stolen</h1>'
    };

    let client = nodemailer.createTransport(sgtransport(options));

    client.sendMail(mailOptions, (err) => {
        if (err) {
            console.error(err);
            res.json({success: false, message: "Error occurred while sending the mail"});
        } else {
            res.json({success: true, message: "Mail sent successfully"});
        }
    });
});

app.listen(port, () => {
    console.log("App running successfully on port number: " + port + "..")
});
