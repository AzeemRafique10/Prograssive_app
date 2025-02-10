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
    </div>
  );
}

export default UserList;
