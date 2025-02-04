import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api, endpoints } from '../utils/api';
import { SalesAndPurchasesChart } from './charts/SalesAndPurchasesChart';
import { ProductSalesChart } from './charts/ProductSalesChart';
import { InventoryTurnoverChart } from './charts/InventoryTurnoverChart';
import { ProductsByCustomerCharts } from './charts/ProductsByCustomerCharts';
import { ChartContainer } from './ChartContainer';
import { DataTable } from './DataTable';
import { formatDate, formatCurrency, formatNumber } from '../utils/formatters';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const { data: salesData } = useQuery({
    queryKey: ['monthlySales'],
    queryFn: () => api.get(endpoints.monthlySales).then(res => res.data),
  });

  const { data: purchasesData } = useQuery({
    queryKey: ['monthlyPurchases'],
    queryFn: () => api.get(endpoints.monthlyPurchases).then(res => res.data),
  });

  const { data: salesProductData } = useQuery({
    queryKey: ['monthlySalesProduct'],
    queryFn: () => api.get(endpoints.monthlySalesProduct).then(res => res.data),
  });

  const { data: profitabilityData } = useQuery({
    queryKey: ['profitability'],
    queryFn: () => api.get(endpoints.profitability).then(res => res.data),
  });

  const { data: inventoryData } = useQuery({
    queryKey: ['inventoryTurnover'],
    queryFn: () => api.get(endpoints.inventoryTurnover).then(res => res.data),
  });

  const { data: customerProductsData } = useQuery({
    queryKey: ['productsByCustomer'],
    queryFn: () => api.get(endpoints.productsByCustomer).then(res => res.data),
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">KPI Dashboard</h1>

      {salesData && purchasesData && (
        <ChartContainer
          title={t('salesAndPurchases')}
          chart={
            <SalesAndPurchasesChart
              salesData={salesData}
              purchasesData={purchasesData}
            />
          }
          table={
            <DataTable
              columns={[
                { header: t('month'), accessor: 'mes', formatter: formatDate },
                {
                  header: t('sales'),
                  accessor: 'total_monto_ventas',
                  formatter: formatCurrency,
                },
                {
                  header: t('purchases'),
                  accessor: 'total_monto_compras',
                  formatter: (value) => value ? formatCurrency(value) : '-',
                },
              ]}
              data={salesData.map((sale: any, index: number) => ({
                ...sale,
                total_monto_compras: purchasesData[index]?.total_monto_compras,
              }))}
            />
          }
        />
      )}

      {salesProductData && profitabilityData && (
        <ChartContainer
          title={t('salesByProduct')}
          chart={
            <ProductSalesChart
              salesData={salesProductData}
              profitabilityData={profitabilityData}
            />
          }
          table={
            <DataTable
              columns={[
                { header: t('product'), accessor: 'nombre_producto' },
                {
                  header: t('sales'),
                  accessor: 'total_monto_ventas',
                  formatter: formatCurrency,
                },
                {
                  header: t('profitability'),
                  accessor: 'rentabilidad',
                  formatter: (value) => typeof value === 'number' ? `${value.toFixed(2)}%` : '-',
                },
              ]}
              data={salesProductData}
            />
          }
        />
      )}

      {inventoryData && (
        <ChartContainer
          title={t('inventoryTurnover')}
          chart={<InventoryTurnoverChart data={inventoryData} />}
          table={
            <DataTable
              columns={[
                { header: t('product'), accessor: 'nombre_producto' },
                {
                  header: t('costOfSales'),
                  accessor: 'costo_total_ventas',
                  formatter: formatCurrency,
                },
                {
                  header: t('averageInventory'),
                  accessor: 'promedio_inventario',
                  formatter: formatCurrency,
                },
                {
                  header: t('turnoverRate'),
                  accessor: 'rotacion',
                  formatter: (value) => typeof value === 'number' ? value.toFixed(2) : '-',
                },
              ]}
              data={inventoryData}
            />
          }
        />
      )}

      {customerProductsData && (
        <ChartContainer
          title={t('productsByCustomer')}
          chart={<ProductsByCustomerCharts data={customerProductsData} />}
          table={
            <DataTable
              columns={[
                { header: t('customer'), accessor: 'id_cliente' },
                { header: t('product'), accessor: 'nombre_producto' },
                {
                  header: t('quantity'),
                  accessor: 'cantidad_total',
                  formatter: formatNumber,
                },
                { header: t('ranking'), accessor: 'ranking' },
              ]}
              data={customerProductsData}
            />
          }
        />
      )}
    </div>
  );
};