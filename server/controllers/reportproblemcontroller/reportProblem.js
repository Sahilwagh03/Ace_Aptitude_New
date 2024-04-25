const { sendVerificationEmail } = require("../../helpers/sendVerificationEmail");
const User = require("../../models/UserSchema");

const reportProblem = async (req, res) => {
    const { email } = req.body;
    const purpose = "Report problem";


    const user = await User.find({ email })
    const name = user.Name;

    // send mail to  user
    await sendVerificationEmail(name, email, purpose)

    res.send({ message: 'Problem is reported Thanks for the report' })
}

module.exports = { reportProblem }