import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ClientsPage } from "./pages/ClientsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<ClientsPage />} />
    </Routes>
  );
}

export default App;
