import { Route, Routes } from "react-router-dom";
import Clients from "./pages/dashboard/Clients";
import DashboardLayout from "./layouts/DashboardLayout";
import { ClientsPage } from "./pages/ClientsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="clients" element={<Clients />} />
             <Route path="/clients" element={<ClientsPage />} />
        </Route>
      </Routes>
    </>



export default App;
