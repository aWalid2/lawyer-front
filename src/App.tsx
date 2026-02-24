// import { Route, Routes } from "react-router-dom";
// import DashboardLayout from "./layouts/DashboardLayout";
// import Clients from "./pages/dashboard/Clients";
// import AddClient from "./components/clients/addclient/AddClient";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<DashboardLayout />} />

//         <Route path="dashboard" element={<DashboardLayout />}>
//           <Route path="clients" element={<Clients />} />
//           <Route path="add-client" element={<AddClient />} />

//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default App;
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Clients from "./pages/dashboard/Clients";
import AddClient from "./components/clients/addclient/AddClient";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="clients" element={<Clients />} />
          <Route path="add-client" element={<AddClient />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;