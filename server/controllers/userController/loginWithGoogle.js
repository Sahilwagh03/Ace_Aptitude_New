require('dotenv').config();
const axios = require('axios');
const User = require('../../models/UserSchema');

const loginWithGoogle = async (req, res) => {
    const { code } = req.query;

    if (code) {
        try {
            // Exchange authorization code for tokens
            const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
                code: code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            });

            const accessToken = tokenResponse.data.access_token;
            const idToken = tokenResponse.data.id_token;

            // Verify ID token
            const idTokenInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`);

            const payload = idTokenInfo.data;
            const { sub: googleUserId, email, email_verified, picture, name } = payload;

            if (email_verified) {
                try {
                    const user = await User.findOne({ email });

                    if (user) {
                        return res.send({ user });
                    } else {
                        const newUser = new User({
                            googleId: googleUserId,
                            email,
                            name: name,
                            profileImage: picture,
                            isVerified: email_verified,
                        });

                        const savedUser = await newUser.save();

                        return res.send({ user: savedUser });
                    }
                } catch (error) {
                    console.log(error);
                    return res.status(500).send({ message: "Internal server error" });
                }
            } else {
                return res.status(401).send({ message: "Email not verified" });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: "Failed to exchange code for token" });
        }
    } else {
        return res.status(400).send({ message: "Invalid code" });
    }
};

module.exports = {
    loginWithGoogle
};
