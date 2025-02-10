import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import db from "./database";
import { syncData } from "./sync";

function UserForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const queryClient = useQueryClient();

  // Save to IndexDB if Offline

  const saveOffline = async (user) => {
    try {
      await db.users.add(user); // Ensure 'db.users' exists
      console.log("Saved Offline:", user);
    } catch (error) {
      console.error("Error saving offline:", error);
    }
  };

  // React Query mutation to sync data when Online

  const saveOnline = async (user) => {
    try {
      console.log("Sava Online User: ", user);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Data Sucessfully Save Online");
    } catch (error) {
      console.log("Error saving online: ", error);
    }
  };

  const mutation = useMutation(syncData, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  //   Check for Internet Rotation and sync data

  useEffect(() => {
    if (navigator.onLine) {
      mutation.mutate();
    }
  }, [navigator.onLine]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, age };

    if (navigator.onLine) {
      await saveOnline(newUser); // Store Data Offline
    } else {
      await saveOffline(newUser); // Sync Data
    }

    setName("");
    setAge("");
  };

  return (
    <>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UserForm;
