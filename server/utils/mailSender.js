const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
             const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,      // smtp.gmail.com
      port: 587,                        // REQUIRED
      secure: false,                    // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,    // App Password
      },
    });
    await transporter.verify();
    console.log("Mail server is ready");

            const info = await transporter.sendMail({
                from: `"StudyNotion" <${process.env.MAIL_USER}>`,
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;