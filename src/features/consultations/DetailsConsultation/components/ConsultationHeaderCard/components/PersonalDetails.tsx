import React from 'react';

interface PersonalDetailsProps {
  consultation: any;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ consultation }) => {

  
  const lawyerName = consultation.lawyer 
    ? `${consultation.lawyer.first_name} `.trim()
    : "غير محدد";

  return (
    <div className="flex-1 space-y-4 text-center md:text-right w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-[#153A4D]">{consultation.consultation_title}</h2>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <span className="text-paragraph font-regular text-base">رقم الطلب :</span>
          <span className="text-accent font-regular text-lg">{consultation.id}</span>
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <span className="text-paragraph font-regular text-base">المستشار :</span>
          <span className="text-[#727272] font-regular text-lg">{lawyerName}</span>
        </div>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <span className="text-paragraph font-regular text-base">نوع الاستشارة :</span>
          <span className="text-[#727272] font-regular text-base">{consultation.consultation_type}</span>
        </div>
      </div>
    </div>
  );
};