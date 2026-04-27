import { Navigate, useParams } from "react-router-dom";

const DocumentDetails = () => {
  const { id } = useParams<{ id: string }>();

  return <Navigate to={`/dashboard/case-management/${id}/documents`} replace />;
};

export default DocumentDetails;
