import Dexie from "dexie";

// Create new Database

const db = new Dexie("UserDatabase");

// Define the Table Structure

db.version(1).stores({
  users: "++id, name, age", // id will be auto-incremented
<<<<<<< HEAD
=======
  products: "++id, productName, price",
  deletions: "++id, type, recordId"
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
});

export default db;
