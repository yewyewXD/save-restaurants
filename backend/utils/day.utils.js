exports.ONE_DAY_IN_SEC = 24 * 60 * 60 * 1000;
exports.HALF_DAY_IN_SEC = 12 * 60 * 60 * 1000;
exports.SIX_HOURS_IN_SEC = 6 * 60 * 60 * 1000;

exports.getOneDayFromNow = () => new Date().getTime() + ONE_DAY_IN_SEC;
