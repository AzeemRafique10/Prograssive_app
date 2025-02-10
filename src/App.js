import React from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { QueryClient, QueryClientProvider } from "react-query"



// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Offline Data Entry</h1>
        <UserForm />
        <UserList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
