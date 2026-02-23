import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Clients from "./pages/dashboard/Clients";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="clients" element={<Clients />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
