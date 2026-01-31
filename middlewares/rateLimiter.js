const rateLimit = require("express-rate-limit");
module.exports = rateLimit({
    windows: 60*1000,
    max: 3
});