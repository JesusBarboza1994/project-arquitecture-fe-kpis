export interface MonthlySales {
  mes: string;
  total_monto_ventas: number;
  total_cantidad: number;
  total_transacciones: number;
}

export interface MonthlyPurchases {
  mes: string;
  total_monto_compras: number;
  total_cantidad: number;
  total_transacciones: number;
}

export interface MonthlySalesProduct {
  cod_producto: number;
  nombre_producto: string | null;
  mes: string;
  total_monto_ventas: number;
  total_cantidad: number;
  total_transacciones: number;
}

export interface Profitability {
  cod_producto: number;
  nombre_producto: string | null;
  mes: string;
  costo_promedio: number;
  precio_promedio: number;
  rentabilidad: number;
}

export interface InventoryTurnover {
  cod_producto: number;
  nombre_producto: string | null;
  mes: string;
  costo_total_ventas: number;
  promedio_inventario: number;
  rotacion: number;
}

export interface ProductsByCustomer {
  id_cliente: number;
  cod_producto: number;
  nombre_producto: string | null;
  cantidad_total: number;
  ranking: number;
}