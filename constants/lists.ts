import type { QueryItem } from '~/types'

export const QUERY_LIST = {
  ventas: <QueryItem[]>([
    { type: 'ventas', title: 'Punto de venta', query: 'ptv' },
    { type: 'ventas', title: 'Reportes', query: 'report' },
    { type: 'ventas', title: 'Facturacion Electronica', query: 'ebilling' },
    { type: 'ventas', title: 'anulacion', query: 'cancel' },
  ]),
  compras: <QueryItem[]>([
    { type: 'compras', title: 'Ingreso Manual', query: 'add_manual' },
    { type: 'compras', title: 'Ingreso TXT', query: 'add_by_txt' },
    { type: 'compras', title: 'Retenciones', query: 'add_deduction' },
  ]),
  inventarios: <QueryItem[]>([
    { type: 'inventarios', title: 'Ingreso O egreso', query: 'input_or_output' },
    { type: 'inventarios', title: 'kardex', query: 'view_kardex' },
    { type: 'inventarios', title: 'Lista de Inventario', query: 'list_inventory' },
  ]),
}
