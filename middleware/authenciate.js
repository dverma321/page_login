const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenciate = async (req, res, next) => {
    try {
        console.log("Authenticating...");
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error('User not found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

         console.log("req.rootUser:", req.rootUser);

        next();
    } catch (err) {
         console.error("Authentication error:", err);
        res.status(401).send({ error: 'Unauthorized' });
    }
};

module.exports = authenciate;
