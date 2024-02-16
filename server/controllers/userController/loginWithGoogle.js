require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/UserSchema');
const loginWithGoogle = async (req, res) => {
    // Extract the token from the request header
    const { code } = req.query;
    console.log(code)
    if (code) {
        const googleClient = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        )

        try {

            const ticket = new googleClient.verifyIdToken({
                idToken: code,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload();

            const {
                sub: googleUserId,
                email,
                email_verified,
                picture,
                name,
            } = payload

            if (email_verified) {
                try {

                    const user = await User.find({ email })

                    if (user) {
                        return res.send({
                            user,
                        });
                    }
                    else {

                        const newUser = new User({
                            googleId: googleUserId,
                            email,
                            name: name,
                            profileImage: picture,
                            isVerified: email_verified
                        });

                        // Save the new user to the database
                        const saveduser = await newUser.save();

                        return res.send({
                            user: saveduser,
                        });
                    }
                }
                catch (error) {
                    console.log(error)
                }
            }
            else {
                // If the email is not verified, return an error message
                return res.status(401).send({
                    message: "Email not verified",
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    else {
        // If the token is invalid or missing, return an error message
        return res.status(401).send({
            message: "Invalid token",
        });
    }
}

module.exports = {
    loginWithGoogle
}