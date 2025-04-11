import axios from "axios";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import db from "./database";
import { syncData } from "./sync";
import "./style.css";
import AntInput from "./Inputs/AntInput";
import AntButton from "./Buttons/AntButton";
import { Alert } from "antd";
import {
  CheckCircleTwoTone,
  LockTwoTone,
  MailTwoTone,
  UserOutlined,
} from "@ant-design/icons";
// import AntButton from "./Buttons/AntButton";

function UserForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

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
      setAlert({ message: "User saved Online successfully!", type: "success" });
    } catch (error) {
      setAlert({
        message: "Error saving user!",
        type: "error",
      });
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
    <div>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {alert.message && (
          <Alert message={alert.message} type={alert.type} showIcon closable />
        )}
        <AntInput
          value={name}
          placeholder="Name"
          className="inputfield"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
          prefix={<MailTwoTone style={{ fontSize: 15 }} />}
        />

        <AntInput
          className="inputfield"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          prefix={<LockTwoTone style={{ fontSize: 15 }} />}
          required
        />
        <AntButton
          label="Submit"
          className="btn-submit"
          type="submit"
          htmlType="submit"
          onClick={handleSubmit}
          required
        />
      </form>
    </div>
  );
}

export default UserForm;
