var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var path = require("path");
var port = process.env.PORT || 3294;


app.get('/:email', (req, res) => {

    var smtp = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tagg.it.18@gmail.com',
            pass: 'taggitrocks@1998'
        }
    });
    var mailOptions = {
        to: req.params.email,
        from: 'tagg.it.18@gmail.com',
        subject: 'TaggIt Notification!!!',
        html: '<h1>ALERT! ALERT! <br> Clothes are being stolen</h1>'
    };

    smtp.sendMail(mailOptions, function (err) {
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
