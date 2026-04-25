import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { Field, FieldArray } from "formik";
import { useState } from "react";
import { CLASSES } from "../index";
import type { TeamMember } from "../types";

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

                                                <ConfirmDeleteDialog
                                                    title="حذف العضو"
                                                    description={`هل أنت متأكد من حذف العضو ${member.name} ؟`}
                                                    onConfirm={() => remove(index)}
                                                    trigger={
                                                        <ButtonDeleteTable />
                                                    }
                                                />
                                            </div>

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


                            {isTeamModalOpen && (
                                <div className={CLASSES.modalOverlay} onClick={() => setIsTeamModalOpen(false)}>
                                    <div className={CLASSES.modalContent} onClick={(e) => e.stopPropagation()}>
                                        <h3 className={CLASSES.modalTitle}>إضافة عضو جديد</h3>


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