import { FormSessionDialog } from "./components/FormSessionDialog";
import { useParams } from "react-router-dom";
import { useGetCourtSessionData } from "./api/hooks/useGetCourtSessionData";
import { useUpdateCourtSessionData } from "./api/hooks/useUpdateCourtSessionData";
import { useCreateCourtSessionData } from "./api/hooks/useCreateCourtSessionData";
import LoadingPage from "@/shared/components/LoadingPage";

export const HeaderSessions = ({ tab }: { tab: string }) => {
    const { id } = useParams<{ id: string }>();
    const { data: courtSessionData, isPending: isCourtSessionLoading } = useGetCourtSessionData(id || "", tab);
    const { mutate: updateCourtSession } = useUpdateCourtSessionData();
    const { mutate: createCourtSession } = useCreateCourtSessionData();

    const hasData = !!courtSessionData;

    const initialValues = {
        court_id: courtSessionData?.court_id ? String(courtSessionData.court_id) : "",
        lawyer_id: courtSessionData?.lawyer_id ? String(courtSessionData.lawyer_id) : "",
        floor_number: courtSessionData?.floor_number ? String(courtSessionData.floor_number) : "",
        hall_number: courtSessionData?.hall_number ? String(courtSessionData.hall_number) : "",
        district_number: courtSessionData?.district_number ? String(courtSessionData.district_number) : "",
        district_type: courtSessionData?.district_type || "",
        judge_name: courtSessionData?.judge_name || "",
        secretary_name: courtSessionData?.secretary_name || "",
        secretary_floor: courtSessionData?.secretary_floor ? String(courtSessionData.secretary_floor) : "",
        secretary_office_number: courtSessionData?.secretary_office_number ? String(courtSessionData.secretary_office_number) : "",
        registration_date: courtSessionData?.registration_date ? courtSessionData.registration_date.split("T")[0] : "",
        registration_time: courtSessionData?.registration_date ? courtSessionData.registration_date.split("T")[1]?.substring(0, 5) : "",
        next_session_date: courtSessionData?.next_session_date ? courtSessionData.next_session_date.split("T")[0] : "",
        next_session_time: courtSessionData?.next_session_date ? courtSessionData.next_session_date.split("T")[1]?.substring(0, 5) : "",
    };

    const handleSave = (values: any) => {
        const payload = {
            ...values,
            court_id: Number(values.court_id),
            lawyer_id: Number(values.lawyer_id),
            floor_number: Number(values.floor_number),
            hall_number: Number(values.hall_number),
            district_number: Number(values.district_number),
            secretary_floor: Number(values.secretary_floor),
            secretary_office_number: Number(values.secretary_office_number),
            registration_date: values.registration_date + "T" + (values.registration_time || "00:00") + ":00.000Z",
            next_session_date: values.next_session_date + "T" + (values.next_session_time || "00:00") + ":00.000Z",
            session_type: tab,
        };



        if (id) {
            if (hasData) {
                updateCourtSession({ id, data: payload, level: tab });
            } else {
                createCourtSession({ id, data: payload, level: tab });
            }
        }
    };

    if (isCourtSessionLoading) {
        return <LoadingPage />;
    }

    const tabConfig: Record<string, { title: string; formTitle: string }> = {
        first_instance: { title: "بيانات أول درجة", formTitle: "معلومات أول درجة" },
        appeal: { title: "بيانات الاستئناف", formTitle: "معلومات الاستئناف" },
        cassation: { title: "بيانات التمييز", formTitle: "معلومات التمييز" },
    };

    const currentTab = tabConfig[tab] || tabConfig.first_instance;

    return (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full pb-6">
            <h2 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
                {currentTab.title}
            </h2>
            <FormSessionDialog
                title={hasData ? `تعديل ${currentTab.formTitle}` : `إضافة ${currentTab.formTitle}`}
                buttonTitle={hasData ? "تعديل" : "إضافة"}
                initialValues={initialValues}
                onSubmit={handleSave}
            />
        </div>
    );
};
