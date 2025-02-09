import axios from 'axios';

// For test
//const API_BASE_URL = 'https://kpi-test-rest.onrender.com';
const API_BASE_URL = 'https://fk4fz0eh38.execute-api.us-east-1.amazonaws.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const endpoints = {
  monthlySales: '/monthly-sales',
  monthlyPurchases: '/monthly-purchases',
  monthlySalesProduct: '/monthly-sales-per-product',
  profitability: '/profitability',
  inventoryTurnover: '/inventory-turnover',
  productsByCustomer: '/products-by-customer',
};