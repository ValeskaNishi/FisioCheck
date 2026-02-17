export const formatDate = (dateString: string | Date): string => {
  if (!dateString) return "-";

  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("pt-BR");
};
