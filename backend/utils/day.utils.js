exports.SIX_HOURS_IN_SEC = 21600000;

exports.get6HFromNow = () => new Date().getTime() + SIX_HOURS_IN_SEC;

exports.getFull6HFromNow = () => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 6);
  return {
    ms: currentDate.getTime(),
    gmt: currentDate,
  };
};

exports.get30DaysFromNow = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);
  return currentDate.getTime();
};
