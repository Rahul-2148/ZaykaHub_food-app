import cron from "node-cron";
import { deleteExpiredUsers } from "../controller/user.controller";

// Run every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled job to delete expired users...");
  deleteExpiredUsers();
});
