import { Route, Routes } from "react-router-dom";
import Clients from "./pages/dashboard/Clients";
import DashboardLayout from "./layouts/DashboardLayout";

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
