import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const FinanceExpenses = lazy(() => import("../pages/dashboard/finance/FinanceExpenses"));
const FinancePayments = lazy(() => import("../pages/dashboard/finance/FinancePayments"));

const FinanceRoutes = () => {
  return (
    <Routes>
      <Route path="expences" element={<FinanceExpenses />} />
      <Route path="payments" element={<FinancePayments />} />
    </Routes>
  );
};

export default FinanceRoutes;
