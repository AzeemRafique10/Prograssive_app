import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { useState } from "react";
// import ProductForm from "./forms/ProductForm";
import DeleteForm from "./forms/DeleteForm";
import UserFormNew from "./components/UserFormNew";
import { Button } from "antd";

const queryClient = new QueryClient();

function App() {
  const [refresh, setRefresh] = useState(false);
  const [activeForm, setActiveForm] = useState("user"); // Toggle between forms

  const handleRefresh = () => setRefresh((prev) => !prev);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <h1>Offline Data Entry</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => setActiveForm("user")}>User Form</Button>
          {/* <button onClick={() => setActiveForm("product")}>Product Form</button> */}
          <Button onClick={() => setActiveForm("delete")}>Delete Form</Button>
        </div>

        {activeForm === "user" ? (
          // <UserForm onUserAdded={handleRefresh} />
          <UserFormNew onUserAdded={handleRefresh} />
        ) : (
          // : activeForm === "product" ? (
          //   <ProductForm onProductAdded={handleRefresh} />
          // )
          <DeleteForm onDeleteSuccess={handleRefresh} />
        )}

        <UserList key={refresh} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
