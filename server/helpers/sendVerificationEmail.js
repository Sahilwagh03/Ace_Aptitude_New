const nodemailer = require('nodemailer');

const sendVerificationEmail = async (name, email, otp, purpose) => {
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

        let mailOptions;

        if (purpose === 'passwordReset') {
            mailOptions = {
                from: 'aceaptitude79@gmail.com',
                to: email,
                subject: 'Reset Password OTP',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
                        <img src="https://i.ibb.co/Ks12KLg/logo.png" alt="Company Logo" style="max-width: 200px;">
                        <h1>Hello ${name}!</h1>
                        <p>Your OTP for password reset:</p>
                        <h3 style="font-weight: bold; color: #6674cc; font-size: 32px;">${otp}</h3>
                        <p>Use this OTP to reset your password.</p>
                        <p>If you didn't request a password reset, please ignore this email.</p>
                        <p>Thank you for using our service.</p>
                    </div>
                `
            };
        } 
        else if (purpose === 'Resend otp') {
            mailOptions = {
                from: 'aceaptitude79@gmail.com',
                to: email,
                subject: 'Resend OTP',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
                        <img src="https://i.ibb.co/Ks12KLg/logo.png" alt="Company Logo" style="max-width: 200px;">
                        <h1>Hello ${name}!</h1>
                        <p>We noticed you requested another OTP.</p>
                        <h3 style="font-weight: bold; color: #6674cc; font-size: 32px;">${otp}</h3>
                        <p>This OTP is valid for your password reset.</p>
                        <p>If you haven't requested this OTP, please contact us immediately.</p>
                        <p>Thank you for your patience and using our service.</p>
                    </div>
                `
            };
        }        
        else {
            mailOptions = {
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
        }




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
