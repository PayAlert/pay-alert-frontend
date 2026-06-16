
export const formatCurrency = (value, currency = 'INR') => {
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
