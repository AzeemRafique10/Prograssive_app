import React, { useState, useEffect } from "react";
import db from "../components/database";
import { syncData } from "./sync";
import { List } from "antd";
import { Card } from "antd";
import { Avatar } from "antd";
import AntButton from "./Buttons/AntButton";

function UserList(reload) {
  const [users, setUsers] = useState([]);

  const fetchList = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      console.log("Fetched users from backend:", data);

      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchList();
  }, [reload]);
  return (
    <div>
      <h2>Stored Users & Products</h2>
      <AntButton
        onClick={fetchList}
        style={{ marginBottom: "10px" }}
        label="🔄 Refresh"
      />

      <h3>Users</h3>
      <List
        dataSource={users}
        locale={{ emptyText: "No users found" }}
        renderItem={(user) => (
          <List.Item>
            <Card style={{ width: 300 }}>
              <List.Item.Meta
                style={{ cursor: "pointer" }}
                avatar={
                  <Avatar style={{ backgroundColor: "#1890ff" }}>
                    {user.name?.[0]?.toUpperCase()}
                  </Avatar>
                }
                title={user.name}
                description={`Age: ${user.age}`}
              />
            </Card>
          </List.Item>
        )}
      />

      {/* <h3>Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.productName} - ${p.price}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default UserList;
