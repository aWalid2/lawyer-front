// pages/dashboard/UserTasksDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/shared/components/PageLayout';
import TaskDetail from '@/features/UserTasks/DetailsTask/TaskDetail';

const UserTasksDetails: React.FC = () => {  
    const { id } = useParams<{ id: string }>();
    
    console.log("ID from URL in UserTasksDetails:", id);
    
    return (
        <PageLayout>
            <TaskDetail id={id} />
        </PageLayout>
    );
};

export default UserTasksDetails;