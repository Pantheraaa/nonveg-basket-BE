const jwt = require("jsonwebtoken");
const ApiError = require("../middlewares/apiError");
const SECRET = process.env.JWT_SECRET;

class JwtUtils {
    static generateToken(user) {
        try {
            const days = 30;
            const token = jwt.sign(user, SECRET, {
                algorithm: "HS256",
                expiresIn: 60 * 60 * (24 * days),
            });

            return token;
        } catch (err) {
            throw ApiError.internal(err);
        };
    };

    static verifyToken(token) {
        let result = null;
        jwt.verify(token, SECRET, {
            algorithms: ["HS256"]
        }, function (err, user) {
            if (err) throw ApiError.notAuthorized();

            result = user;
        });

        return result;
    }
};

module.exports = JwtUtils;