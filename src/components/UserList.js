import React, { useState, useEffect } from "react";
import db from "./database";

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const storedUsers = await db.users.toArray();
    setUsers(storedUsers);
  };
  useEffect(() => {
    
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await db.users.delete(id);
      console.log(`Deleted user with ID: ${id}`);
      
      fetchUsers();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <h2>Stored Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.firstName} - 
              {user.lastName} -  
              {user.age} years old -
              {user.phone} -
              {user.phone}
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No users stored.</p>
        )}
      </ul>
    </div>
  );
}

export default UserList;
