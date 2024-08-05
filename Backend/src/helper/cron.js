const cron = require("node-cron");
const reminder = require("../services/email.service");

module.exports = cron.schedule("0 0 * * *", async () => {
  await reminder.remidnderEmail();
});
