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
import { InventoryTurnover } from '../../types/kpi';

interface Props {
  data: InventoryTurnover[];
}

export const InventoryTurnoverChart: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(data[0]?.mes);
  const [selectedProduct, setSelectedProduct] = useState(data[0]?.cod_producto);

  const uniqueDates = [...new Set(data.map((item) => item.mes))];
  
  // Fix duplicate keys by using a Map to ensure unique products
  const productsMap = new Map(
    data.map((item) => [
      item.cod_producto,
      {
        code: item.cod_producto,
        name: item.nombre_producto,
      },
    ])
  );
  const uniqueProducts = Array.from(productsMap.values());

  const filteredData = data
    .filter((item) => 
      (!selectedDate || item.mes === selectedDate) &&
      (!selectedProduct || item.cod_producto === selectedProduct)
    )
    .map((item) => ({
      product: getProductLabel(item.cod_producto, item.nombre_producto),
      costOfSales: item.costo_total_ventas,
      averageInventory: item.promedio_inventario,
      turnoverRate: item.rotacion,
    }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-4">
          <label className="mr-2">{t('selectDate')}:</label>
          <select
            value={selectedDate || ''}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded p-1"
          >
            <option value="">{t('allDates')}</option>
            {uniqueDates.map((date) => (
              <option key={`date-${date}`} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>

          <label className="mr-2">{t('selectProduct')}:</label>
          <select
            value={selectedProduct || ''}
            onChange={(e) => setSelectedProduct(Number(e.target.value) || undefined)}
            className="border rounded p-1"
          >
            <option value="">{t('allProducts')}</option>
            {uniqueProducts.map((product) => (
              <option key={`product-${product.code}`} value={product.code}>
                {getProductLabel(product.code, product.name)}
              </option>
            ))}
          </select>
        </div>
        <div className="relative group">
          <Info className="w-5 h-5 text-blue-500 cursor-help" />
          <div className="hidden group-hover:block absolute right-0 w-64 p-2 bg-white border rounded-lg shadow-lg z-10">
            <p className="text-sm text-gray-600">
              {t('inventoryTurnoverKpiInfo')}
            </p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="product"
            label={{ value: t('product'), position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            yAxisId="left"
            tickFormatter={formatCurrency}
            label={{
              value: t('amount'),
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: t('turnoverRate'),
              angle: 90,
              position: 'insideRight',
            }}
          />
          <Tooltip
            formatter={(value: any, name: string) => {
              if (name === t('turnoverRate')) {
                return typeof value === 'number' ? value.toFixed(2) : '0';
              }
              return formatCurrency(value);
            }}
          />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="costOfSales"
            name={t('costOfSales')}
            fill="#2563eb"
          />
          <Bar
            yAxisId="left"
            dataKey="averageInventory"
            name={t('averageInventory')}
            fill="#dc2626"
          />
          <Bar
            yAxisId="right"
            dataKey="turnoverRate"
            name={t('turnoverRate')}
            fill="#16a34a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};