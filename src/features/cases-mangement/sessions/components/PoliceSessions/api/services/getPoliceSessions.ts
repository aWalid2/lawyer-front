import api from "@/lib/api";


export const getPoliceSessions = async () => {
    const data = await api.get("/police-sessions/All-policeSession");
    return data;
}