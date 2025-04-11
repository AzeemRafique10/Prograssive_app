import React, { useState } from "react";
import db from "../components/database";
import axios from "axios";
import { Col, Row, Select } from "antd";
import AntInput from "../components/Inputs/AntInput";
import AntButton from "../components/Buttons/AntButton";
import { Card } from "antd";

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
    <Card
      title={`Delete ${deleteType === "user" ? "User" : "Product"}`}
      style={{
        maxWidth: 600,
        margin: "30px auto",
        padding: "24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "16px",
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8}>
          <Select
            style={{ width: "100%" }}
            value={deleteType}
            onChange={(value) => setDeleteType(value)}
          >
            <Option value="user">User</Option>
            <Option value="product">Product</Option>
          </Select>
        </Col>

        <Col xs={24} sm={16}>
          <AntInput
            style={{ width: 200 }}
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
            placeholder={`Enter ${deleteType} ID or username`}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24} style={{ textAlign: "right" }}>
          <AntButton
            onClick={handleDelete}
            disabled={!recordId || loading}
            label={loading ? "Deleting..." : "Delete"}
            danger
          />
        </Col>
      </Row>
    </Card>
  );
};

export default DeleteForm;
