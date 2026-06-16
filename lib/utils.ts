import dayjs from "dayjs";

export const formatCurrency = (value:number, currency = 'INR') => {
  try {
    const numericValue = Number(value);

    if (isNaN(numericValue)) {
      return value;
    }

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);
  } catch (error) {
    console.error('Error formatting currency:', error);
    // Fallback formatting
    try {
      const numericValue = Number(value);
      const symbol = currency === 'INR' ? '₹' : currency + ' ';
      return `${symbol}${numericValue.toFixed(2)}`;
    } catch (fallbackError) {
      return value;
    }
  }
};

export const formatSubscriptionDateTime = (value?: string): string => {
  if (!value) return "Not provided";
  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate.format("DD/MM/YYYY") : "Not provided";
};

export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};