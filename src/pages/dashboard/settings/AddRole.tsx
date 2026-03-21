import { AddRoleFeature } from "@/features/settings/permissions/components/AddRoleFeature";
import { useParams } from "react-router-dom";

const mockRoleData = {
  name: "مدير النظام",
  description: "صلاحيات كاملة للوصول النظام",
  permissions: {
    "الصفحة الرئيسية": ["عرض الصفحة الرئيسية", "عرض المعلومات المالية"],
    "الملف الشخصي": ["عرض الملف الشخصي", "تعديل الملف الشخصي"],
    "الإعدادات": ["رؤية صفحة الإعدادات", "إعدادات المكتب"],
  }
};

const AddRole = () => {
  const { id } = useParams();
  const isEdit = !!id;

  const initialData = isEdit ? mockRoleData : undefined;

  return <AddRoleFeature isEdit={isEdit} initialData={initialData} />;
};

export default AddRole;
