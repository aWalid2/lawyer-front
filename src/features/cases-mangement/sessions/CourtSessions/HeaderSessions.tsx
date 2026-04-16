import { FormSessionDialog } from "./components/FormSessionDialog";

export const HeaderSessions = ({ tab }: { tab: string }) => {

    const initialValues = {
        courtName: "نيابة",
        courtRole: "نيابة",
        courtRoomNumber: "نيابة",
        courtCircleNumber: "نيابة",
        courtType: "نيابة",
        courtJudge: "نيابة",
        courtSecretary: "نيابة",
        courtSecretaryRole: "نيابة",
        courtSecretaryNumber: "نيابة",
        caseRegistrationDate: "sdfsdf",
        nextSessionDate: "sdfsdf",
    };
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full pb-6">
            <h2 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
                {tab === "first" ? "بيانات أول درجة" : tab === "appeal" ? "بيانات الاستئناف" : "بيانات التمييز"}
            </h2>
            {tab === "first" && <FormSessionDialog title="تعديل معلومات أول درجة" initialValues={initialValues} />}
            {tab === "appeal" && <FormSessionDialog title="تعديل معلومات الاستئناف" initialValues={initialValues} />}
            {tab === "distinction" && <FormSessionDialog title="تعديل معلومات التمييز" initialValues={initialValues} />}
        </div>
    );
};
