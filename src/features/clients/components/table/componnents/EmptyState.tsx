// src/components/clients/table/EmptyState.tsx
import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 md:p-12 text-center bg-gray-50 rounded-lg md:rounded-xl border border-gray-200">
      <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 mb-2">لا يوجد موكلين</p>
      <p className="text-xs sm:text-sm text-gray-500">اضغط على "إضافة موكل" لإنشاء موكل جديد</p>
    </div>
  );
};