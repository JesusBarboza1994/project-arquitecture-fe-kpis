import React from 'react';

interface Column {
  header: string;
  accessor: string;
  formatter?: (value: any) => string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-2 text-sm text-gray-800">
                  {column.formatter
                    ? column.formatter(row[column.accessor])
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};