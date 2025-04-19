
// Simple utility to convert USD to INR (Indian Rupees)
// Using a fixed conversion rate for demonstration purposes

export const USD_TO_INR_RATE = 83.5; // Example rate: 1 USD = 83.5 INR

export const formatCurrency = (amount: number, currency: 'USD' | 'INR' = 'INR') => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } else {
    const amountInRupees = amount * USD_TO_INR_RATE;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amountInRupees);
  }
};

export const convertUSDtoINR = (amountUSD: number): number => {
  return amountUSD * USD_TO_INR_RATE;
};
