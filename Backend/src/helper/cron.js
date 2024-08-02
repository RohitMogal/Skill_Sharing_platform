const cron = require("node-cron");
const reminder = require("../services/email.service");

cron.schedule("0 0 * * *", async () => {
  await reminder.remidnderEmail();
  console.log("Reminder mail sent succssfully");
});
