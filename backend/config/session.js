const { SIX_HOURS_IN_SEC } = require("../utils/day.utils");

const sessionConfig = () => {
  const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: {
      maxAge: SIX_HOURS_IN_SEC,
      httpOnly: true,
      sameSite: "strict",
      domain: process.env.FRONTEND_BASE_URL,
    },
    resave: false,
  };

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
    sessionConfig.cookie.secure = true;
  }

  return sessionConfig;
};

module.exports = sessionConfig;
