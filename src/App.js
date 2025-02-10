<<<<<<< HEAD
import React from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { QueryClient, QueryClientProvider } from "react-query"



// Create a QueryClient instance
=======
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { useState } from "react";
import ProductForm from "./forms/ProductForm";
import DeleteForm from "./forms/DeleteForm";

>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
const queryClient = new QueryClient();

function App() {
  const [refresh, setRefresh] = useState(false);
  const [activeForm, setActiveForm] = useState("user"); // Toggle between forms

  const handleRefresh  = () => setRefresh((prev) => !prev);

  return (
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <div className="App">
        <h1>Offline Data Entry</h1>
        <UserForm />
        <UserList />
=======
      <div className="container">
        <h1>Offline Data Entry</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setActiveForm("user")}>User Form</button>
          {/* <button onClick={() => setActiveForm("product")}>Product Form</button> */}
          <button onClick={() => setActiveForm("delete")}>Delete Form</button>
        </div>

        {activeForm === "user" ? (
          <UserForm onUserAdded={handleRefresh} />
        ) 
        // : activeForm === "product" ? (
        //   <ProductForm onProductAdded={handleRefresh} />
        // ) 
        : (
          <DeleteForm onDeleteSuccess={handleRefresh} />
        )}

        <UserList key={refresh} />
>>>>>>> 8d5360369d3824fbf01adfee53e7b6715995e4dd
      </div>
    </QueryClientProvider>
  );
}

export default App;
