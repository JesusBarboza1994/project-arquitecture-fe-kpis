import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Info } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { MonthlySales, MonthlyPurchases } from '../../types/kpi';

interface Props {
  salesData: MonthlySales[];
  purchasesData: MonthlyPurchases[];
}

export const SalesAndPurchasesChart: React.FC<Props> = ({
  salesData,
  purchasesData,
}) => {
  const { t } = useTranslation();

  const combinedData = salesData.map((sale, index) => {
    const purchase = purchasesData[index];
    const purchaseAmount = purchase?.total_monto_compras || 0;
    return {
      mes: sale.mes,
      sales: sale.total_monto_ventas,
      purchases: purchaseAmount,
      profit: sale.total_monto_ventas - purchaseAmount,
    };
  });

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 group">
        <Info className="w-5 h-5 text-blue-500 cursor-help" />
        <div className="hidden group-hover:block absolute right-0 w-64 p-2 bg-white border rounded-lg shadow-lg z-10">
          <p className="text-sm text-gray-600">
            {t('salesPurchasesKpiInfo')}
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="mes"
            tickFormatter={formatDate}
            label={{ value: t('month'), position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            tickFormatter={formatCurrency}
            label={{
              value: t('amount'),
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={formatDate}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            name={t('sales')}
            stroke="#2563eb"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="purchases"
            name={t('purchases')}
            stroke="#dc2626"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="profit"
            name={t('profitMargin')}
            stroke="#16a34a"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};