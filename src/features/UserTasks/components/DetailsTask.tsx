import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Define a type for the task data
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  // add other task properties as needed
}

function DetailsTask() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch task details when component mounts or id changes
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        const response = await fetch(`/api/tasks/${id}`);
        if (!response.ok) {
          throw new Error('Task not found');
        }
        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTaskDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center p-4">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!task) {
    return <div className="text-center p-4">المهمة غير موجودة</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">تفاصيل المهمة</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">عنوان المهمة</h2>
          <p className="mt-1">{task.title}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">الوصف</h2>
          <p className="mt-1">{task.description || 'لا يوجد وصف'}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">الحالة</h2>
          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
            task.status === 'completed' ? 'bg-green-100 text-green-800' :
            task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {task.status === 'completed' ? 'مكتملة' :
             task.status === 'in-progress' ? 'قيد التنفيذ' :
             'معلقة'}
          </span>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">تاريخ الإنشاء</h2>
          <p className="mt-1">{new Date(task.createdAt).toLocaleDateString('ar-EG')}</p>
        </div>

        {/* Add more task details as needed */}
      </div>
    </div>
  );
}

export default DetailsTask;