export const getDecisionStyles = (decision: string) => {
  switch (decision) {
    case "pending":
      return "bg-[#937F12]/20 text-[#937F12]";
    case "in_progress":
      return "bg-[#5570F1]/20 text-[#5570F1]";
    case "late":
      return "bg-[#C60000]/20 text-[#C60000]";
    case "done":
      return "bg-[#519C66]/20 text-[#519C66]";
    default:
      return "bg-gray-100 text-gray-500";
  }
};