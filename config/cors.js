const cors = require("cors");

const corsOptions = {
    orgin: "*",
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
};

module.exports = cors(corsOptions);