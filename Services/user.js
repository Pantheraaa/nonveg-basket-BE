const db = require("../Models/index.js");
const ApiError = require("../middlewares/apiError.js");
const bcrypt = require("bcrypt");
const UserValidation = require("../validations/user.js");
const JwtUtils = require("../utils/jwt.js");

class UserService {
    async create(data) {
        const isValid = UserValidation.insert(data);
        if (!isValid) return;

        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);

        const newUser = await db.User.create(data);
        return newUser;
    }

    async findAll() {
        const users = await db.User.findAll({ where: { active: true } });

        return users;
    }

    async findByMobile(mobile) {
        const user = await db.User.findOne({ mobile: mobile });
        return user;
    }

    async findByEmail(email) {
        const user = await db.User.findOne({ email: email });
        return user;
    }

    async loginUser(data) {
        const { username, password } = data;
        let user;
        user = await this.findByMobile(username);

        if (!user) user = await this.findByEmail(username);

        if (!user) throw ApiError.notFound("Invalid credentials");
        if (!user.active) throw ApiError.notActive("Invalid credentials");

        // Find and compare password:
        const hashPassword = await this.findPasswordById(user.id);
        const isValidPassword = await bcrypt.compare(password, hashPassword);

        if (!isValidPassword) throw ApiError.notAuthorized("Invalid credentials");

        user.shop = undefined;
        return user;
    };

    async findPasswordById(id) {
        const { password } = await db.User.findByPk(id, { attributes: ["password"] });

        return password;
    }
}

module.exports = new UserService();