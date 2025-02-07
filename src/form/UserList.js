import React, { useState, useEffect } from "react";
import db from "./database";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const storedUsers = await db.users.toArray();
      setUsers(storedUsers);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>Stored Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
