import React, { useState } from "react";
import db from "../components/database";
import axios from "axios";
import { Button, Select } from "antd";
import { Input } from "antd";

const { Option } = Select;

const DeleteForm = ({ onDeleteSuccess }) => {
  const [deleteType, setDeleteType] = useState("user");
  const [recordId, setRecordId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!recordId) {
      alert("Please enter a valid username to delete.");
      return;
    }

    if (navigator.onLine) {
      try {
        console.log("Sending DELETE request for:", recordId);
        const response = await axios.delete(
          `http://localhost:5000/api/users/${recordId}`
        );
        console.log("Response:", response.data);
      } catch (error) {
        console.error(
          "Error deleting online:",
          error.response?.data || error.message
        );
      }
    } else {
      try {
        await db.deletions.add({ type: deleteType, recordId });
        console.log(`${deleteType} deletion stored offline:`, recordId);
      } catch (error) {
        console.error("Error storing offline deletion:", error);
      }
    }

    onDeleteSuccess();
    setRecordId("");
  };

  return (
    <div>
      <h2>Delete {deleteType === "user" ? "User" : "Product"}</h2>

      <label>
        Select:
        <Select
          value={deleteType}
          onChange={(e) => setDeleteType(e.target.value)}
        >
          <Option value="user">User</Option>
          <Option value="product">Product</Option>
        </Select>
      </label>

      <Input
        type="text"
        value={recordId}
        onChange={(e) => setRecordId(e.target.value)}
        placeholder={`Enter ${deleteType} Username`}
        required
      />

      <Button onClick={handleDelete} disabled={!recordId || loading}>
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

export default DeleteForm;
