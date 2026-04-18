import { FormSessionDialog } from "./components/FormSessionDialog";
import { useParams } from "react-router-dom";
import { useGetCourtSessionData } from "./api/hooks/useGetCourtSessionData";
import { useUpdateCourtSessionData } from "./api/hooks/useUpdateCourtSessionData";
import { useCreateCourtSessionData } from "./api/hooks/useCreateCourtSessionData";
import LoadingPage from "@/shared/components/LoadingPage";

export const HeaderSessions = ({ tab }: { tab: string }) => {
    const { id } = useParams<{ id: string }>();
    const { data: appealDataArr, isPending: isAppealLoading } = useGetCourtSessionData(id || "", tab);
    const { mutate: updateAppeal } = useUpdateCourtSessionData();
    const { mutate: createAppeal } = useCreateCourtSessionData();

    const hasData = appealDataArr && appealDataArr.length > 0;
    const appealData = hasData ? appealDataArr[0] : null;

    const initialValues = {
        court_id: tab === "appeal" && appealData ? appealData.court_id : "",
        floor_number: tab === "appeal" && appealData ? appealData.floor_number : "",
        hall_number: tab === "appeal" && appealData ? appealData.hall_number : "",
        district_number: tab === "appeal" && appealData ? appealData.district_number : "",
        district_type: tab === "appeal" && appealData ? appealData.district_type : "",
        judge_name: tab === "appeal" && appealData ? appealData.judge_name : "",
        secretary_name: tab === "appeal" && appealData ? appealData.secretary_name : "",
        secretary_floor: tab === "appeal" && appealData ? appealData.secretary_floor : "",
        secretary_office_number: tab === "appeal" && appealData ? appealData.secretary_office_number : "",
        registration_date: tab === "appeal" && appealData ? appealData.registration_date : "",
        next_session_date: tab === "appeal" && appealData ? appealData.next_session_date : "",
    };

    const handleSave = (values: any) => {
        if (tab === "appeal" && id) {
            if (hasData) {
                updateAppeal({ id, data: values, level: "appeal" });
            } else {
                createAppeal({ id, data: values, level: "appeal" });
            }
        } else {
            console.log(`Saving ${tab} sessions:`, values);
        }
    };

    if (tab === "appeal" && isAppealLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full pb-6">
            <h2 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
                {tab === "first" ? "بيانات أول درجة" : tab === "appeal" ? "بيانات الاستئناف" : "بيانات التمييز"}
            </h2>
            {tab === "first" && <FormSessionDialog title="تعديل معلومات أول درجة" initialValues={initialValues} onSubmit={handleSave} />}

            {tab === "appeal" && (
                <FormSessionDialog
                    title={hasData ? "تعديل معلومات الاستئناف" : "إضافة معلومات الاستئناف"}
                    buttonTitle={hasData ? "تعديل" : "إضافة"}
                    initialValues={initialValues}
                    onSubmit={handleSave}
                />
            )}

            {tab === "distinction" && <FormSessionDialog title="تعديل معلومات التمييز" initialValues={initialValues} onSubmit={handleSave} />}
        </div>
    );
};
