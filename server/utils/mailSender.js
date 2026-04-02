const https = require('https');

const mailSender = async (email, title, body) => {
    console.log("mailSender function triggered connecting to Brevo API");

    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            sender: { email: process.env.MAIL_USER, name: "StudyNotion" },
            to: [{ email: email }],
            subject: title,
            htmlContent: body
        });

        const options = {
            hostname: 'api.brevo.com',
            path: '/v3/smtp/email',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.MAIL_PASS, // Brevo uses the same pass for SMTP and API v3
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(payload)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log("Email sent successfully via Brevo API");
                    try {
                        resolve(JSON.parse(data));
                    } catch(e) {
                        resolve(data);
                    }
                } else {
                    console.error("Brevo API Error:", data);
                    reject(new Error(`Brevo API Error (${res.statusCode}): ${data}`));
                }
            });
        });

        req.on('error', (error) => {
            console.error("Mail Request Error:", error);
            reject(error);
        });

        req.write(payload);
        req.end();
    });
};

module.exports = mailSender;