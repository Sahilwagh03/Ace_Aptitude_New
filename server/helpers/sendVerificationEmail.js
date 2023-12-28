const nodemailer = require('nodemailer');

const sendVerificationEmail = async (name,email,otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'aceaptitude79@gmail.com', // Your Gmail email address
                pass: 'uitd ugst wyoo uozn' // Your Gmail password or app-specific password
            }
        });


        const mailOptions = {
            from: 'aceaptitude79@gmail.com',
            to: email,
            subject: 'Email Verification OTP',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
                <img src="https://i.ibb.co/Ks12KLg/logo.png" alt="Company Logo" style="max-width: 200px;">
                    <h1>Hello ${name}!</h1>
                    <p>Your OTP for email verification:</p>
                    <h3 style="font-weight: bold; color: #6674cc; font-size: 32px;">${otp}</h3>
                    <p>Thank you for using our service.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log(error);
        return null;
    }
};



module.exports = {
    sendVerificationEmail
};
