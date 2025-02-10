import Dexie from "dexie";

// Create new Database

const db = new Dexie("UserDatabase");

// Define the Table Structure

db.version(1).stores({
  users: "++id, name, age", // id will be auto-incremented
});

export default db;
