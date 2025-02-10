<<<<<<< HEAD
=======
import axios from "axios";
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import db from "./database";
import { syncData } from "./sync";
<<<<<<< HEAD
=======
import "./style.css";
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd

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
<<<<<<< HEAD
      console.log("Sava Online User: ", user);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Data Sucessfully Save Online");
    } catch (error) {
      console.log("Error saving online: ", error);
=======
      const response = await axios.post("http://localhost:5000/api/users", user);
      console.log("User saved online:", response.data);
    } catch (error) {
      console.error("Error saving user online:", error.response?.data || error.message);
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
    }
  };

  const mutation = useMutation(syncData, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

<<<<<<< HEAD
  //   Check for Internet Rotation and sync data

  useEffect(() => {
    if (navigator.onLine) {
      mutation.mutate();
=======
  // Sync data when back online
  useEffect(() => {
    if (navigator.onLine) {
      syncData();
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
    }
  }, [navigator.onLine]);

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
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
=======
    const newUser = { name, age: Number(age) }; // Convert age to number
  
    if (navigator.onLine) {
      await saveOnline(newUser);
    } else {
      await saveOffline(newUser);
    }
  
    setName("");
    setAge(""); // Keep the input clear instead of setting it to 0
  };
  

  return (
    <div>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="inputfield"
          type="text"
          min={3}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
          required
        />

        <input
          className="inputfield"
          type="number"
          value={age}
          min={1}
          minLength={2}
          maxLength={3}
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />
<<<<<<< HEAD
        <button type="submit">Submit</button>
      </form>
    </>
=======
        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
  );
}

export default UserForm;
