const RateLimit = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");

const limiter = new RateLimit({
  store: new MongoStore({
    uri: process.env.MONGO_URI,
    expireTimeMs: 60 * 1000,
    errorHandler: console.error.bind(null, "User rate limit is reached"),
    // see Configuration section for more options and details
  }),
  max: 100,
  // should match expireTimeMs
  windowMs: 60 * 1000,
});

module.exports = limiter;
