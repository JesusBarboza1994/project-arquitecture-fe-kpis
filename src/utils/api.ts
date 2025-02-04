import axios from 'axios';

const API_BASE_URL = 'https://kpi-test-rest.onrender.com';

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