import { ButtonDeleteTable } from "@/shared/components/buttons/ButtonDeleteTable";
import { ConfirmDeleteDialog } from "@/shared/components/dialogs/ConfirmDeleteDialog";
import { Field, FieldArray } from "formik";
import { useState } from "react";
import { CLASSES } from "../index";
import type { TeamMember } from "../types";

const TeamSection = () => {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState<TeamMember>({
    name: "",
    role: "",
    description: "",
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
      <h2 className="text-sm font-medium md:text-base">فريق العمل</h2>
      <div className="rounded-lg border border-gray-300 p-4">
        <FieldArray name="teamMembers">
          {({ push, remove }) => (
            <div className="flex flex-col gap-6">
              <Field name="teamMembers">
                {({ form }: any) =>
                  form.values.teamMembers?.map(
                    (member: TeamMember, index: number) => (
                      <div
                        key={index}
                        className="w-full rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex justify-between p-4">
                          <h1 className="text-sm font-medium md:text-base">
                            بيانات العضو: {member.name}
                          </h1>

                          <ConfirmDeleteDialog
                            title="حذف العضو"
                            description={`هل أنت متأكد من حذف العضو ${member.name} ؟`}
                            onConfirm={() => remove(index)}
                            trigger={<ButtonDeleteTable />}
                          />
                        </div>

                        <div className="mb-4 flex flex-col gap-3 md:flex-row">
                          <div className="w-full md:w-[464px]">
                            <label className={CLASSES.fieldLabel}>الاسم</label>
                            <Field
                              type="text"
                              name={`teamMembers.${index}.name`}
                              className="mt-1 h-[50px] w-full rounded-lg border border-gray-300 bg-[#FBFBFB] p-3 text-right text-sm"
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
                              className="mt-1 h-[50px] w-full rounded-lg border border-gray-300 bg-[#FBFBFB] p-3 text-right text-sm"
                              placeholder="أدخل الوظيفة"
                            />
                          </div>
                        </div>

                        <div className="w-full">
                          <label className={CLASSES.fieldLabel}>الوصف</label>
                          <Field
                            as="textarea"
                            name={`teamMembers.${index}.description`}
                            className="mt-1 h-[50px] w-full resize-none rounded-lg border border-gray-300 bg-[#FBFBFB] p-3 text-right text-sm md:w-[944px]"
                            placeholder="أدخل وصفاً مختصراً (اختياري)"
                          />
                        </div>
                      </div>
                    ),
                  )
                }
              </Field>

              <button
                type="button"
                onClick={() => setIsTeamModalOpen(true)}
                className="flex h-[50px] w-full items-center justify-center gap-2 rounded-lg border border-[#CBA462] text-lg text-[#CBA462] transition-colors hover:bg-[#CBA462] hover:text-white md:w-[400px]"
              >
                + عضو جديد
              </button>

              {isTeamModalOpen && (
                <div
                  className={CLASSES.modalOverlay}
                  onClick={() => setIsTeamModalOpen(false)}
                >
                  <div
                    className={CLASSES.modalContent}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className={CLASSES.modalTitle}>إضافة عضو جديد</h3>

                    <div>
                      <label className="mb-1 block text-right text-sm text-gray-600">
                        الاسم
                      </label>
                      <input
                        type="text"
                        value={newTeamMember.name}
                        onChange={(e) =>
                          setNewTeamMember({
                            ...newTeamMember,
                            name: e.target.value,
                          })
                        }
                        className={CLASSES.modalInput}
                        placeholder="أدخل الاسم"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-right text-sm text-gray-600">
                        الوظيفة
                      </label>
                      <input
                        type="text"
                        value={newTeamMember.role}
                        onChange={(e) =>
                          setNewTeamMember({
                            ...newTeamMember,
                            role: e.target.value,
                          })
                        }
                        className={CLASSES.modalInput}
                        placeholder="أدخل الوظيفة"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-right text-sm text-gray-600">
                        الوصف
                      </label>
                      <textarea
                        value={newTeamMember.description}
                        onChange={(e) =>
                          setNewTeamMember({
                            ...newTeamMember,
                            description: e.target.value,
                          })
                        }
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
