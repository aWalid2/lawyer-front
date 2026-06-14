
import api from "@/lib/api";

const normalizeAssigner = (task: Record<string, unknown>) => {
  if (!task) return task;
  return {
    ...task,
    assigner:
      typeof task.assigner === "object" && task.assigner !== null
        ? (task.assigner as { first_name?: string }).first_name || null
        : task.assigner,
  };
};

export const getOneTask = async ({ id }: { id: string }) => {
    const response = await api.get(`/task/${id}`);
    return normalizeAssigner(response.data);

};