import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

export const formatDate = (dateString: string, language: string = 'en') => {
  try {
    const date = new Date(dateString);
    return format(date, 'MMM yyyy', {
      locale: language === 'es' ? es : enUS,
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const getProductLabel = (code: number, name: string | null) => {
  return name || `Product ${code}`;
};