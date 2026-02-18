export const formatDate = (dateString: string | Date): string => {
  if (!dateString) return "-";

  const date =
    typeof dateString === "string"
      ? new Date(dateString + "T00:00:00")
      : dateString;

  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("pt-BR");
};
