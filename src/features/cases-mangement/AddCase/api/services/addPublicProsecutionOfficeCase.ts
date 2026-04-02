import api from "@/lib/api";
import type { ProsecutionPayload } from "../../types/caseT";

export const addPublicProsecutionOfficeCase = async (payload: ProsecutionPayload) => {
    const response = await api.post("cases/at-prosecution-office", payload);
    return response.data;
};