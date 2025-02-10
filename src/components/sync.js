import db from "./database";
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
    }
  } catch (error) {
    console.error("Sync Error:", error);
  }
};

// Listen for internet reconnection
window.addEventListener("online", syncData);
