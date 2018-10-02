var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var path = require("path");
var port = process.env.PORT || 7040;


app.get('/', (req, res) => {
	
var smtp = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'tagg.it.18@gmail.com',
                        pass: 'taggitrocks'
                    }
                });
                var mailOptions = {
                    to: "goelashwin36@gmail.com",
                    from: 'tagg.it.18@gmail.com',
                    subject: 'TaggIt Notification!!!',
                    html: '<h1>Kapde chori hone vaale hai!!!!</h1>'
                };

                smtp.sendMail(mailOptions, function (err) {
                    if (err) {
                        console.log(err);
                        console.log("Error sending the mail");
                    } else {
                        console.log("Mail sent");
                    }

});
});


app.listen(port, () => {
    console.log("App running successfully on port number: " + port + "..")
});
