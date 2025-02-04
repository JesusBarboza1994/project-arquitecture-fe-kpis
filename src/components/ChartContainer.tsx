import React, { useState } from 'react';

interface ChartContainerProps {
  title: string;
  chart: React.ReactNode;
  table: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  chart,
  table,
}) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="mb-4">{chart}</div>
      <button
        onClick={() => setShowTable(!showTable)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {showTable ? 'Hide Table' : 'Show Table'}
      </button>
      {showTable && <div className="mt-4">{table}</div>}
    </div>
  );
};