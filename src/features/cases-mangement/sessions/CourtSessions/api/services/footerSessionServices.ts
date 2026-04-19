import api from "@/lib/api";

const getEndpoint = (level: string) => {
    // Map internal level names to API endpoint slugs
    const mapping: Record<string, string> = {
        first_instance: 'first-instance-session',
        appeal: 'appeal-session',
        cassation: 'cassation-session'
    };
    return mapping[level] || `${level.replace('_', '-')}-session`;
};

export const getFooterSessions = async (caseId: string | number, level: string) => {
    const response = await api.get(`/${getEndpoint(level)}/${caseId}`);
    return response.data;
};

export const createFooterSession = async ({ caseId, data, level }: { caseId: string | number; data: any; level: string }) => {
    const response = await api.post(`/${getEndpoint(level)}/${caseId}`, data);
    return response.data;
};

export const updateFooterSession = async ({ sessionId, data, level }: { sessionId: string | number; data: any; level: string }) => {
    const response = await api.patch(`/${getEndpoint(level)}/${sessionId}`, data);
    return response.data;
};

export const removeFooterSession = async (sessionId: string | number, level: string) => {
    const response = await api.delete(`/${getEndpoint(level)}/${sessionId}`);
    return response.data;
};
