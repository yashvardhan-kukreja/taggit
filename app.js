var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var sgtransport = require('nodemailer-sendgrid-transport');
var path = require("path");
var port = process.env.PORT || 3294;
//
// var sendgrid_username = process.env.SENDGRID_USERNAME;
// var sendgrid_password = process.env.SENDGRID_PASSWORD;

var sendgrid_username = "yashvardhankukreja";
var sendgrid_password = "Python@1998";

app.get('/:email', (req, res) => {
    var options = {
        auth: {
            api_user: sendgrid_username,
            api_key: sendgrid_password
        }
    };

    var mailOptions = {
        to: req.params.email,
        from: 'recruitments@ieeevit.com',
        subject: 'IEEE VIT Recruitments',
        html: `<p>Dear applicant,<br><br>

Greetings from IEEE-VIT!<br><br>

IEEE-VIT student branch invites you to the first round of it's recruitment.<br><br>

Kindly report on any of the following dates and timings:<br>
Thursday (13-12-2018) - 6PM onwards: TT112 and TT204<br>
Friday (14-12-2018) - 6PM onwards: TT112 and TT104<br>

We hope to see you soon!<br><br>
Reply 'yes' if you're coming tomorrow!
 
For any queries contact us on our facebook page - facebook.com/ieeevit</p>`
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
