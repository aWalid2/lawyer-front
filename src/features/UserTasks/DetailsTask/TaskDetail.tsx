import React from 'react';
import { HeaderTitle } from '@/shared/components/HeaderTitle';
import LoadingPage from '@/shared/components/LoadingPage';
import { Error } from '@/shared/components/Error';
import HeaderSection from './HeaderSection';
import TaskDetailsForm from './TaskDetailsForm';
import TimelineForm from './TimelineForm';
import CommentsSection from './CommentsSection';
import { useGetOneTask } from '../api/hooks/useGetOne';

interface TaskDetailProps {
    id?: string;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ id: propId }) => {
    const taskId = propId;
    
    const { data, isPending, isError, error } = useGetOneTask(taskId || '');

    if (isPending) {
        return <LoadingPage />;
    }

    if (isError) {
        return <Error message={`حدث خطأ: ${error?.message || "خطأ في تحميل البيانات"}`} />;
    }

    const task = data;

    if (!task) {
        return <Error message="لا توجد بيانات للمهمة" />;
    }

    const getStatusArabic = (status: string): string => {
        const statusMap: Record<string, string> = {
            "in_progress": "قيد التنفيذ",
            "pending": "قيد الانتظار",
            "done": "مُنجزة",
            "late": "متأخرة"
        };
        return statusMap[status] || status;
    };

    const formatDate = (date: string): string => {
        if (!date) return "";
        const d = new Date(date);
        // ✅ تحقق من صحة التاريخ
        if (isNaN(d.getTime())) return "";
        return d.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    };

    // ✅ تنظيف التواريخ قبل إرسالها للـ InputForm
    const cleanDate = (date: string): string => {
        if (!date) return "";
        const d = new Date(date);
        if (isNaN(d.getTime())) return "";
        return d.toISOString().split('T')[0]; // تحويل إلى YYYY-MM-DD
    };

    const taskDetails = {
        TaskType: task.task_type || "",
        PersonInCharge: task.assignee?.first_name || task.assigned_to?.toString() || "",
        DeliveryDate: cleanDate(task.delivery_date),  // ✅ استخدم التاريخ المنظف
        status: getStatusArabic(task.status)
    };

    const timeline = {
        startDate: cleanDate(task.start_date),  // ✅ استخدم التاريخ المنظف
        endDate: cleanDate(task.end_date)       // ✅ استخدم التاريخ المنظف
    };

    const commentsData = {
        description: task.details || task.notes || "لا يوجد وصف",
        comments: []
    };

    return (
        <>
            <HeaderTitle title="تفاصيل المهمة" />
            
            <HeaderSection 
                title={task.task_title || "بدون عنوان"} 
                status={getStatusArabic(task.status)} 
            />
            
            <TaskDetailsForm task={taskDetails} />
            
            <TimelineForm 
                startDate={timeline.startDate} 
                endDate={timeline.endDate} 
            />
            
            <CommentsSection
                description={commentsData.description} 
                comments={commentsData.comments} 
            />
        </>
    );
};

export default TaskDetail;