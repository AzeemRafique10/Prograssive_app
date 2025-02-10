import db from "./database";
<<<<<<< HEAD

export const syncData = async () => {
  console.log("Checking IndexedDB...");

  try {
    await db.open(); // Ensure DB is open before querying
    const allUsers = await db.users.toArray(); // Ensure 'users' is defined

    if (allUsers.length > 0) {
      console.log("Syncing Data...", allUsers);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await db.users.clear();
      console.log("Sync Completed, data cleared from IndexedDB");
=======
import axios from "axios";

export const syncData = async () => {
  console.log("Checking IndexedDB for pending data...");

  try {
    await db.open();

    // Sync Users
    const allUsers = await db.users.toArray();
    if (allUsers.length > 0) {
      console.log("Syncing Users Data...", allUsers);
      await axios.post("http://localhost:5000/api/sync", { users: allUsers });
      await db.users.clear(); // Clear IndexedDB after syncing
      console.log("User Sync Completed");
    }

    // Sync Deletions
    const pendingDeletions = await db.deletions.toArray();
    for (let deletion of pendingDeletions) {
      console.log(`Processing deletion for ${deletion.type} ID ${deletion.recordId}...`);
      await axios.delete(`http://localhost:5000/api/${deletion.type}s/${deletion.recordId}`);
      await db.deletions.delete(deletion.id);
      console.log(`Deletion of ${deletion.type} ID ${deletion.recordId} completed.`);
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
    }
  } catch (error) {
    console.error("Sync Error:", error);
  }
};

<<<<<<< HEAD
=======
// Listen for internet reconnection
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
window.addEventListener("online", syncData);
