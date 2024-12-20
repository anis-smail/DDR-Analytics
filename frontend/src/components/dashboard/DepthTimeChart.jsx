import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">Time: {label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name === 'Depth' ? ' ft' : ' ft/hr'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DepthTimeChart({ data }) {
  const [view, setView] = useState('standard');

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Depth vs Time Analysis</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setView('standard')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              view === 'standard'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Standard View
          </button>
          <button
            onClick={() => setView('detailed')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              view === 'detailed'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Detailed View
          </button>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => value}
            />
            <YAxis
              yAxisId="left"
              stroke="#6b7280"
              fontSize={12}
              domain={['auto', 'auto']}
              orientation="left"
              label={{ value: 'Depth (ft)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis
              yAxisId="right"
              stroke="#6b7280"
              fontSize={12}
              domain={[0, 'auto']}
              orientation="right"
              label={{ value: 'ROP (ft/hr)', angle: 90, position: 'insideRight' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="stepAfter"
              dataKey="depth"
              stroke="#2563eb"
              name="Depth"
              dot={false}
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rop"
              stroke="#16a34a"
              name="ROP"
              dot={false}
              strokeWidth={2}
            />
            {view === 'detailed' && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="formationTop"
                stroke="#dc2626"
                strokeDasharray="5 5"
                name="Formation"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Standard view shows depth progression and rate of penetration over time.</p>
        <p>Formation tops are marked with dashed red lines.</p>
      </div>
    </Card>
  );
}
