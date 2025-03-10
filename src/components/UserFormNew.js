import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import db from "./database";
import { syncData } from "./sync";

const UserFormNew = () => {
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
      const response = await axios.post(
        "http://localhost:5000/api/users",
        user
      );
      console.log("User saved online:", response.data);
    } catch (error) {
      console.error(
        "Error saving user online:",
        error.response?.data || error.message
      );
    }
  };

  const mutation = useMutation(syncData, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  // Sync data when back online
  useEffect(() => {
    if (navigator.onLine) {
      syncData();
    }
  }, [navigator.onLine]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <form name="form_item_path" layout="vertical" onSubmit={handleSubmit}>
      <Col
        span={10}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
          required
          style={{ width: 350 }}
        />

        <Input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
          style={{ width: 350 }}
        />
      </Col>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
};
export default UserFormNew;
