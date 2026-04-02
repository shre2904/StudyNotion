const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    console.log(" mailSender function triggered");

    try{
        console.log(" Creating transporter...");
             const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",      // smtp.gmail.com
      port: 587,                        // REQUIRED
      secure: false,                    // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,    // App Password
      },
    });
    // console.log(" Verifying transporter...");
    // await transporter.verify();
    // console.log("Mail server is ready");
    // console.log(" Sending email to:", email);
            const info = await transporter.sendMail({
                from: `"StudyNotion" <${process.env.MAIL_USER}>`,
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(" Email sent successfully");
            console.log(" Response:", info.response);
            return info;
    }
    catch(error) {
        console.error(" Mail Error:", error);
        throw error;
    }
}


module.exports = mailSender;