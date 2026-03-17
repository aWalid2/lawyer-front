import SettingsCard from "./SettingsCard";

const settingsItems = [
  {
    title: "الإعدادات العامة",
    description: "إدارة الإعدادات الأساسية للنظام.",
    href: "/dashboard/settings/general",
  },
  {
    title: "إدارة المستخدمين",
    description: "إدارة حسابات المستخدمين في النظام.",
    href: "/dashboard/settings/users",
  },
  {
    title: "الصلاحيات",
    description: "إدارة أدوار المستخدمين وصلاحياتهم في النظام.",
    href: "/dashboard/settings/permissions",
  },
  {
    title: "المحاكم",
    description: "إدارة وتعديل قائمة المحاكم في النظام.",
    href: "/dashboard/settings/courts",
  },
  {
    title: "إدارة القضايا",
    description: "إدارة وتعديل أنواع القضايا في النظام.",
    href: "/dashboard/settings/cases",
  },
  {
    title: "إدارة الجلسات",
    description: "إدارة وتعديل أنواع الجلسات وخصائصها.",
    href: "/dashboard/settings/sessions",
  },
  {
    title: "حالات القضايا",
    description: "إدارة وتعديل حالات القضايا في النظام.",
    href: "/dashboard/settings/case-statuses",
  },
  {
    title: "المخافر",
    description: "إدارة بيانات المخافر في النظام.",
    href: "/dashboard/settings/police-stations",
  },
  {
    title: "النيابات",
    description: "إضافة وتعديل وحذف النيابات.",
    href: "/dashboard/settings/prosecutions",
  },
];

const SettingsFeature = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {settingsItems.map((item, index) => (
        <SettingsCard key={index} {...item} />
      ))}
    </div>
  );
};

export default SettingsFeature;
