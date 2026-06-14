import React from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/shared/components/PageLayout";
import TaskDetail from "@/features/UserTasks/TaskDetails";

const UserTasksDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageLayout>
      <TaskDetail id={id} />
    </PageLayout>
  );
};

export default UserTasksDetails;
