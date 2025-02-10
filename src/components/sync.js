import db from "./database";

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
    }
  } catch (error) {
    console.error("Sync Error:", error);
  }
};

window.addEventListener("online", syncData);
