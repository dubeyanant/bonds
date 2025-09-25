export const getRatingColor = (rating: string) => {
  if (rating === "AAA") return "bg-green-100 text-green-800";
  if (rating.startsWith("AA")) return "bg-blue-100 text-blue-800";
  if (rating.startsWith("A")) return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};

export const getRiskColor = (risk: string) => {
  if (risk === "Low") return "text-green-600";
  if (risk === "Medium") return "text-yellow-600";
  return "text-red-600";
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
