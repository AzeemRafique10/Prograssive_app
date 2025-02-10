import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import db from "./database";
import { syncData } from "./sync";
import "./style.css";

function UserForm() {
  const [firstName, setFiestName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

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
    const newUser = { firstName, lastName, age, phone };

    if (navigator.onLine) {
      await saveOnline(newUser); // Store Data Offline
    } else {
      await saveOffline(newUser); // Sync Data
    }

    setFiestName("");
    setLastName("");
    setAge(0);
    setPhone("");
  };

  return (
    <div>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="inputfield"
          type="text"
          min={3}
          value={firstName}
          onChange={(e) => setFiestName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          className="inputfield"
          type="text"
          min={3}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input
          className="inputfield"
          type="number"
          value={age}
          min={1}
          minLength={2}
          maxLength={3}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />

        <input
          className="inputfield"
          type="text"
          value={phone}
          min={11}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
