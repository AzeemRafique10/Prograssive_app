<<<<<<< HEAD
import React from "react";

function UserList({ users }) {
  return (
    <div>
      <h2>Stored Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.age}
          </li>
        ))}
      </ul>
=======
import React, { useState, useEffect } from "react";
import db from "../components/database";
import { syncData } from "./sync";

function UserList() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setUsers(await db.users.toArray());
      setProducts(await db.products.toArray());
    };

    fetchData();

    if (navigator.onLine) {
      syncData();
    }
  }, []);

  return (
    <div>
      <h2>Stored Users & Products</h2>
      <h3>Users</h3>
      <ul>{users.map((u) => <li key={u.id}>{u.name} (Age: {u.age})</li>)}</ul>
      
      <h3>Products</h3>
      <ul>{products.map((p) => <li key={p.id}>{p.productName} - ${p.price}</li>)}</ul>
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
    </div>
  );
}

export default UserList;
