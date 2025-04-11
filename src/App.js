import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { useState } from "react";
import ProductForm from "./forms/ProductForm";
import DeleteForm from "./forms/DeleteForm";
import AntButton from "./components/Buttons/AntButton";
import { Typography } from "antd";

const { Title } = Typography;

const queryClient = new QueryClient();

function App() {
  const [refresh, setRefresh] = useState(false);
  const [activeForm, setActiveForm] = useState("user");

  const handleRefresh = () => setRefresh((prev) => !prev);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Title
          level={1}
          style={{
            textAlign: "center",
            background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            fontSize: "3rem",
            marginBottom: "2rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          🖋️ Online & Offline Data Entry
        </Title>
        <div style={{ display: "flex", gap: 10 }}>
          <AntButton onClick={() => setActiveForm("user")} label="User Form" />
          {/* <button onClick={() => setActiveForm("product")}>Product Form</button> */}
          <AntButton
            onClick={() => setActiveForm("delete")}
            label="Delete User"
            danger
          />
        </div>

        {activeForm === "user" ? (
          <UserForm onUserAdded={handleRefresh} />
        ) : (
          <DeleteForm onDeleteSuccess={handleRefresh} />
        )}

        <UserList reload={refresh} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
