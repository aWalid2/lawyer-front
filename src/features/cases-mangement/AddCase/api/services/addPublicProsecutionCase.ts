import api from "@/lib/api";
import type { ProsecutionPayload } from "../../types/caseT";

export const addPublicProsecutionCase = async (data: ProsecutionPayload) => {
    const response = await api.post("cases/public-prosecution", data);
    return response.data;
};