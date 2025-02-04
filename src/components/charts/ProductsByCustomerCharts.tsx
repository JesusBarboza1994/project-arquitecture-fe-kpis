import React from 'react';
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
import { formatNumber, getProductLabel } from '../../utils/formatters';
import { ProductsByCustomer } from '../../types/kpi';

interface Props {
  data: ProductsByCustomer[];
}

export const ProductsByCustomerCharts: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const topProducts = [...data]
    .sort((a, b) => b.cantidad_total - a.cantidad_total)
    .slice(0, 10)
    .map((item) => ({
      product: getProductLabel(item.cod_producto, item.nombre_producto),
      quantity: item.cantidad_total,
      ranking: item.ranking,
    }));

  const customerProducts = data
    .sort((a, b) => b.cantidad_total - a.cantidad_total)
    .map((item) => ({
      customer: `${t('customer')} ${item.id_cliente}`,
      product: getProductLabel(item.cod_producto, item.nombre_producto),
      quantity: item.cantidad_total,
    }));

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute top-0 right-0 group">
          <Info className="w-5 h-5 text-blue-500 cursor-help" />
          <div className="hidden group-hover:block absolute right-0 w-64 p-2 bg-white border rounded-lg shadow-lg z-10">
            <p className="text-sm text-gray-600">
              {t('productsByCustomerKpiInfo')}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">
          {t('mostPurchasedProducts')}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="product"
              label={{ value: t('product'), position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              yAxisId="left"
              tickFormatter={formatNumber}
              label={{
                value: t('quantity'),
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: t('ranking'),
                angle: 90,
                position: 'insideRight',
              }}
            />
            <Tooltip formatter={formatNumber} />
            <Legend />
            <Bar yAxisId="left" dataKey="quantity" name={t('quantity')} fill="#2563eb" />
            <Bar yAxisId="right" dataKey="ranking" name={t('ranking')} fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">
          {t('productsByCustomerTitle')}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={customerProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="customer"
              label={{ value: t('customer'), position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tickFormatter={formatNumber}
              label={{
                value: t('quantity'),
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip formatter={formatNumber} />
            <Legend />
            <Bar dataKey="quantity" name={t('quantity')} fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};