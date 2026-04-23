
import NotFound from "@/shared/components/NotFound";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const CaseMangement = lazy(() => import("../pages/dashboard/cases/CaseMangement"));
const AddCase = lazy(() => import("../pages/dashboard/cases/AddCase"));
const CaseDetails = lazy(() => import("../pages/dashboard/cases/CaseDetails"));
const CaseInfo = lazy(() => import("../features/cases-mangement/CaseInfo"));
const Sessions = lazy(() => import("../pages/dashboard/caseinfo/Sessions"));
const RelatedCases = lazy(() => import("../pages/dashboard/caseinfo/RelatedCases"));
const CaseDocuments = lazy(() => import("../pages/dashboard/caseinfo/Documents"));
const Expenses = lazy(() => import("../pages/dashboard/caseinfo/Expenses"));
const Procedures = lazy(() => import("../pages/dashboard/caseinfo/Procedures"));
const Employees = lazy(() => import("../pages/dashboard/caseinfo/Employees"));
const EmployeeDetails = lazy(() => import("../pages/dashboard/caseinfo/EmployeeDetails"));
const CaseDocumentDetails = lazy(() => import("../pages/dashboard/caseinfo/DocumentDetails"));
const ExpertSessionDetails = lazy(() => import("../pages/dashboard/caseinfo/ExpertSessionDetails"));


const CaseRoutes = () => {
  return (
    <Routes>
      <Route index element={<CaseMangement />} />
      <Route path="sessions/expert-sessions/:id" element={<ExpertSessionDetails />} />
      <Route path="add-case" element={<AddCase />} />
      <Route path=":id" element={<CaseDetails />}>
        <Route index element={<CaseInfo />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="related" element={<RelatedCases />} />
        <Route path="documents" element={<CaseDocuments />} />
        <Route path="documents/:docId" element={<CaseDocumentDetails />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="procedures" element={<Procedures />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employees/:employeeId" element={<EmployeeDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CaseRoutes;
