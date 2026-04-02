const https = require('https');

const mailSender = async (email, title, body) => {
    console.log("mailSender function triggered connecting to SendGrid API");

    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            personalizations: [{ to: [{ email: email }] }],
            from: { email: process.env.MAIL_USER, name: "StudyNotion" },
            subject: title,
            content: [{ type: "text/html", value: body }]
        });

        const options = {
            hostname: 'api.sendgrid.com',
            path: '/v3/mail/send',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MAIL_PASS}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                // SendGrid returns 202 Accepted on success
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log("Email sent successfully via SendGrid API");
                    resolve({ success: true, status: res.statusCode });
                } else {
                    console.error("SendGrid API Error:", data);
                    reject(new Error(`SendGrid API Error (${res.statusCode}): ${data}`));
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