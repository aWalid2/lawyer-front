// pages/UserTasksDetails.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import HeaderSection from "@/features/UserTasks/DetailsTask/HeaderSection";
import TaskDetailsForm from "@/features/UserTasks/DetailsTask/TaskDetailsForm";
import CommentsSection from "@/features/UserTasks/DetailsTask/CommentsSection";
import TimelineForm from "@/features/UserTasks/DetailsTask/TimelineForm";

// نفس نوع البيانات الموجود عندك
interface TaskRelatedT {
    id: string;
    TaskTitle: string;
    TaskType: string;
    PersonInCharge: string;
    status: string;
    DeliveryDate: string;
}

// بيانات تجريبية
const tasks: TaskRelatedT[] = [
    {
        id: "1",
        TaskTitle: "مراجعة عقد القضية رقم 254",
        TaskType: "نوع المهمة 1",
        PersonInCharge: "المسؤول 1",
        status: "متأخرة",
        DeliveryDate: "2024-06-01",
    },
    {
        id: "2",
        TaskTitle: "مراجعة عقد القضية رقم 24",
        TaskType: "نوع المهمة 2",
        PersonInCharge: "المسؤول 2",
        status: "مُنجزة",
        DeliveryDate: "2024-06-02",
    },
    {
        id: "3",
        TaskTitle: "مراجعة عقد القضية رقم 254",
        TaskType: "نوع المهمة 3",
        PersonInCharge: "المسؤول 3",
        status: "قيد التنفيذ ",
        DeliveryDate: "2024-06-03",
    },
    {
        id: "4",
        TaskTitle: "مراجعة عقد القضية رقم 254",
        TaskType: "نوع المهمة 4",
        PersonInCharge: "المسؤول 4",
        status: "قيد التنفيذ",
        DeliveryDate: "2024-06-04",
    },
    {
        id: "5",
        TaskTitle: "مراجعة عقد القضية رقم 254",
        TaskType: "نوع المهمة 5",
        PersonInCharge: "المسؤول 5",
        status: "متأخرة ",
        DeliveryDate: "2024-06-05",
    },
    {
        id: "6",
        TaskTitle: "مراجعة عقد القضية رقم 254",
        TaskType: "نوع المهمة 6",
        PersonInCharge: "المسؤول 6",
        status: "قيد التنفيذ",
        DeliveryDate: "2024-06-06",
    },
];

export default function UserTasksDetails() {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<TaskRelatedT | null>(null);

    useEffect(() => {
        if (id) {
            const foundTask = tasks.find((t) => t.id === id) ?? null;
            setTask(foundTask);
        }
    }, [id]);

    // بيانات تجريبية للملاحظات
    const comments = [
        { date: "22/01/2026", text: "تم الانتهاء من مراجعة البنود الأساسية." },
        { date: "22/01/2026", text: "بانتظار توقيع العميل على النسخة النهائية." },
    ];

    // نص الوصف التجريبي
    const description = "و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر بالسعادة التي لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما تنجم عنه بعض المتعة";

    // لو لسه البيانات مجتش
    if (!task) {
        return (
            <PageLayout>
                <HeaderTitle title="تفاصيل المهمة" />
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">جاري التحميل...</p>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <HeaderTitle title="تفاصيل المهمة" />
            
            {/* قسم الهيدر مع العنوان والحالة */}
            <HeaderSection title={task.TaskTitle} status={task.status} />
            
            {/* قسم تفاصيل المهمة */}
            <TaskDetailsForm task={task} />
            
            {/* قسم الجدول الزمني */}
            <TimelineForm startDate={task.DeliveryDate} endDate={task.DeliveryDate} />
            
            {/* قسم الوصف والمستندات والملاحظات */}
            <CommentsSection 
                description={description}
                comments={comments}
            />
        </PageLayout>
    );
}