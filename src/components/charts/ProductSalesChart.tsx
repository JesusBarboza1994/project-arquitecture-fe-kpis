import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Info } from 'lucide-react';
import { formatCurrency, formatDate, getProductLabel } from '../../utils/formatters';
import { MonthlySalesProduct, Profitability } from '../../types/kpi';

interface Props {
  salesData: MonthlySalesProduct[];
  profitabilityData: Profitability[];
}

export const ProductSalesChart: React.FC<Props> = ({
  salesData,
  profitabilityData,
}) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(salesData[0]?.mes);

  const uniqueDates = [...new Set(salesData.map((item) => item.mes))];

  const filteredSalesData = salesData
    .filter((item) => item.mes === selectedDate)
    .map((item) => ({
      product: getProductLabel(item.cod_producto, item.nombre_producto),
      sales: item.total_monto_ventas,
    }));

  const filteredProfitabilityData = profitabilityData
    .filter((item) => item.mes === selectedDate)
    .map((item) => ({
      product: getProductLabel(item.cod_producto, item.nombre_producto),
      profitability: item.rentabilidad,
    }));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2">{t('selectDate')}:</label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded p-1"
          >
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>
        <div className="relative group">
          <Info className="w-5 h-5 text-blue-500 cursor-help" />
          <div className="hidden group-hover:block absolute right-0 w-64 p-2 bg-white border rounded-lg shadow-lg z-10">
            <p className="text-sm text-gray-600">
              {t('salesProfitabilityKpiInfo')}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">{t('salesByProduct')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredSalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="product"
              label={{ value: t('product'), position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              label={{
                value: t('sales'),
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip formatter={formatCurrency} />
            <Legend />
            <Bar dataKey="sales" name={t('sales')} fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">{t('profitabilityByProduct')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredProfitabilityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="product"
              label={{ value: t('product'), position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tickFormatter={(value) => `${Number(value).toFixed(2)}%`}
              label={{
                value: t('profitability'),
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              formatter={(value: any) =>
                typeof value === 'number' ? `${value.toFixed(2)}%` : '0%'
              }
            />
            <Legend />
            <Bar dataKey="profitability" name={t('profitability')} fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};