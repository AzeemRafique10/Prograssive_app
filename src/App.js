import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import UserList from "./form/UserList";
import UserForm from "./form/UserForm";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <h1 >Offline Data Entry</h1>
        <UserForm />
        <UserList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
