import { useState } from "react";
import { Field, FieldArray } from "formik";
import { CLASSES } from "../index";
import type { TeamMember } from "../types";
import del from '@/public/images/delete.svg';

const TeamSection = () => {
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [newTeamMember, setNewTeamMember] = useState<TeamMember>({
        name: "",
        role: "",
        description: ""
    });

    const handleAddTeamMember = (push: any) => {
        if (newTeamMember.name.trim() && newTeamMember.role.trim()) {
            push(newTeamMember);
            setNewTeamMember({ name: "", role: "", description: "" });
            setIsTeamModalOpen(false);
        }
    };

    return (
        <>
            <h2 className="text-sm md:text-base font-medium">فريق العمل</h2>
            <div className="border border-gray-300 p-4 rounded-lg">
                <FieldArray name="teamMembers">
                    {({ push, remove }) => (
                        <div className="flex flex-col gap-6">
                            <Field name="teamMembers">
                                {({ form }: any) => (
                                    form.values.teamMembers?.map((member: TeamMember, index: number) => (
                                        <div key={index} className="w-full p-4 rounded-lg border border-gray-200">
                                            <div className="flex justify-between p-4">
                                                <h1 className="text-sm md:text-base font-medium">بيانات العضو: {member.name}</h1>
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    <img src={del} alt="حذف" />
                                                </button>
                                            </div>
                                            {/* صف الاسم والوظيفة */}
                                            <div className="flex flex-col md:flex-row gap-3 mb-4">
                                                <div className="w-full md:w-[464px]">
                                                    <label className={CLASSES.fieldLabel}>
                                                        الاسم
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`teamMembers.${index}.name`}
                                                        className="w-full h-[50px] border border-gray-300 rounded-lg p-3 text-right bg-[#FBFBFB] text-sm mt-1"
                                                        placeholder="أدخل الاسم"
                                                    />
                                                </div>
                                                <div className="w-full md:w-[464px]">
                                                    <label className={CLASSES.fieldLabel}>
                                                        الوظيفة
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`teamMembers.${index}.role`}
                                                        className="w-full h-[50px] border border-gray-300 rounded-lg p-3 text-right bg-[#FBFBFB] text-sm mt-1"
                                                        placeholder="أدخل الوظيفة"
                                                    />
                                                </div>
                                            </div>

                                            {/* صف الوصف */}
                                            <div className="w-full">
                                                <label className={CLASSES.fieldLabel}>
                                                    الوصف
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    name={`teamMembers.${index}.description`}
                                                    className="w-full md:w-[944px] h-[50px] border border-gray-300 rounded-lg p-3 text-right bg-[#FBFBFB] text-sm resize-none mt-1"
                                                    placeholder="أدخل وصفاً مختصراً (اختياري)"
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </Field>

                            <button
                                type="button"
                                onClick={() => setIsTeamModalOpen(true)}
                                className="w-full md:w-[400px] h-[50px] text-[#CBA462] rounded-lg border border-[#CBA462] flex items-center justify-center gap-2 text-lg hover:bg-[#CBA462] hover:text-white transition-colors"
                            >
                                + عضو جديد
                            </button>

                            {/* مودال إضافة عضو جديد */}
                            {isTeamModalOpen && (
                                <div className={CLASSES.modalOverlay} onClick={() => setIsTeamModalOpen(false)}>
                                    <div className={CLASSES.modalContent} onClick={(e) => e.stopPropagation()}>
                                        <h3 className={CLASSES.modalTitle}>إضافة عضو جديد</h3>

                                        {/* حقل الاسم */}
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1 text-right">الاسم</label>
                                            <input
                                                type="text"
                                                value={newTeamMember.name}
                                                onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                                                className={CLASSES.modalInput}
                                                placeholder="أدخل الاسم"
                                                autoFocus
                                            />
                                        </div>

                                        {/* حقل الوظيفة */}
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1 text-right">الوظيفة</label>
                                            <input
                                                type="text"
                                                value={newTeamMember.role}
                                                onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                                                className={CLASSES.modalInput}
                                                placeholder="أدخل الوظيفة"
                                            />
                                        </div>

                                        {/* حقل الوصف */}
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1 text-right">الوصف</label>
                                            <textarea
                                                value={newTeamMember.description}
                                                onChange={(e) => setNewTeamMember({ ...newTeamMember, description: e.target.value })}
                                                className={`${CLASSES.modalInput} h-[100px] resize-none`}
                                                placeholder="أدخل وصفاً مختصراً (اختياري)"
                                            />
                                        </div>

                                        <div className={CLASSES.modalButtons}>
                                            <button
                                                type="button"
                                                onClick={() => handleAddTeamMember(push)}
                                                className={`${CLASSES.modalButton} bg-[#E3C086] hover:bg-[#CBA462]`}
                                            >
                                                إضافة
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsTeamModalOpen(false)}
                                                className={`${CLASSES.modalButton} bg-gray-400 hover:bg-gray-500`}
                                            >
                                                إلغاء
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </FieldArray>
            </div>
        </>
    );
};

export default TeamSection;