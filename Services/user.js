const db = require("../Models/index.js");
const ApiError = require("../middlewares/apiError.js");

class UserService {
    async create(data) {
        // await sequelize.sync({ alter: true });
        const newUser = await db.User.create(data);

        return newUser;
    }

    async findAll() {
        const users = await db.User.findAll();

        return users;
    }

    async findByMobile(mobile) {
        const user = await db.User.findOne({ mobile: mobile });
        
        return user;
    }

    async loginUser(mobile) {
        const user = await this.findByMobile(mobile);

        if (!user)
            throw ApiError.notFound("User not found");

        if (!user.active)
            throw ApiError.notActive("User found but not active");

        user.active = undefined;
        user.dataValues.createdAt = undefined;
        user.dataValues.updatedAt = undefined;
        user.dataValues.deletedAt = undefined;

        return user;
    }
}

module.exports = new UserService();