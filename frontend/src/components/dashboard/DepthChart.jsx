
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Area,
  Scatter
} from 'recharts';

const DepthChart = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [chartType, setChartType] = useState('standard');

  // Sample data - In production, this would come from your API
  const generateDepthData = () => {
    const baseData = [
      { time: '00:00', depth: 13000, rop: 65, wob: 22, rpm: 160, torque: 13000, mudFlow: 750 },
      { time: '02:00', depth: 13050, rop: 70, wob: 23, rpm: 165, torque: 13100, mudFlow: 755 },
      { time: '04:00', depth: 13075, rop: 68, wob: 21, rpm: 163, torque: 13150, mudFlow: 752 },
      { time: '06:00', depth: 13125, rop: 72, wob: 22, rpm: 164, torque: 13200, mudFlow: 748 },
      { time: '08:00', depth: 13150, rop: 75, wob: 24, rpm: 166, torque: 13250, mudFlow: 751 },
      { time: '10:00', depth: 13180, rop: 73, wob: 23, rpm: 165, torque: 13300, mudFlow: 753 },
      { time: '12:00', depth: 13200, rop: 71, wob: 22, rpm: 164, torque: 13350, mudFlow: 749 },
      { time: '14:00', depth: 13225, rop: 74, wob: 23, rpm: 165, torque: 13400, mudFlow: 752 },
      { time: '16:00', depth: 13240, rop: 76, wob: 24, rpm: 166, torque: 13450, mudFlow: 754 },
      { time: '18:00', depth: 13250, rop: 75, wob: 23, rpm: 165, torque: 13500, mudFlow: 751 },
      { time: '20:00', depth: 13260, rop: 72, wob: 22, rpm: 164, torque: 13550, mudFlow: 750 },
      { time: '22:00', depth: 13267, rop: 70, wob: 21, rpm: 163, torque: 13600, mudFlow: 748 },
    ];

    // Add formation tops
    return baseData.map(point => ({
      ...point,
      formationTop: point.depth === 13125 ? 'Formation A' : undefined,
    }));
  };

  const depthData = generateDepthData();

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="text-sm font-bold text-gray-700">Time: {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()} {entry.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render different chart types
  const renderChart = (type) => {
    switch (type) {
      case 'standard':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={depthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis 
                yAxisId="depth"
                orientation="left"
                domain={['auto', 'auto']}
                reversed={true}
                label={{ value: 'Depth (ft)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="rop"
                orientation="right"
                domain={[0, 'auto']}
                label={{ value: 'ROP (ft/hr)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                yAxisId="depth"
                type="stepAfter"
                dataKey="depth"
                stroke="#2563eb"
                name="Depth"
                dot={false}
                unit=" ft"
              />
              <Line 
                yAxisId="rop"
                type="monotone"
                dataKey="rop"
                stroke="#16a34a"
                name="ROP"
                dot={false}
                unit=" ft/hr"
              />
              {/* Formation tops markers */}
              {depthData.map((entry, index) => (
                entry.formationTop && (
                  <ReferenceLine 
                    key={index}
                    y={entry.depth}
                    yAxisId="depth"
                    stroke="#dc2626"
                    strokeDasharray="3 3"
                    label={{ value: entry.formationTop, position: 'insideLeft' }}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'detailed':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart data={depthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis 
                yAxisId="depth"
                orientation="left"
                domain={['auto', 'auto']}
                reversed={true}
                label={{ value: 'Depth (ft)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="parameters"
                orientation="right"
                domain={[0, 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                yAxisId="depth"
                type="monotone"
                dataKey="depth"
                fill="#bfdbfe"
                stroke="#2563eb"
                name="Depth"
                unit=" ft"
              />
              <Line 
                yAxisId="parameters"
                type="monotone"
                dataKey="wob"
                stroke="#16a34a"
                name="WOB"
                unit=" klbs"
              />
              <Line 
                yAxisId="parameters"
                type="monotone"
                dataKey="rpm"
                stroke="#dc2626"
                name="RPM"
              />
              <Line 
                yAxisId="parameters"
                type="monotone"
                dataKey="torque"
                stroke="#9333ea"
                name="Torque"
                unit=" ft-lbs"
              />
              <Scatter 
                yAxisId="parameters"
                dataKey="mudFlow"
                fill="#0891b2"
                name="Mud Flow"
                unit=" gpm"
              />
            </ComposedChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Depth vs Time Analysis</CardTitle>
          <div className="flex space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">Last 12 hrs</SelectItem>
                <SelectItem value="24h">Last 24 hrs</SelectItem>
                <SelectItem value="48h">Last 48 hrs</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={chartType} onValueChange={setChartType} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="standard">Standard View</TabsTrigger>
            <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          </TabsList>

          <TabsContent value="standard">
            {renderChart('standard')}
            <div className="mt-4 text-sm text-gray-500">
              <p>Standard view shows depth progression and rate of penetration over time.</p>
              <p>Formation tops are marked with dashed red lines.</p>
            </div>
          </TabsContent>

          <TabsContent value="detailed">
            {renderChart('detailed')}
            <div className="mt-4 text-sm text-gray-500">
              <p>Detailed view includes additional drilling parameters:</p>
              <ul className="list-disc list-inside">
                <li>Weight on Bit (WOB)</li>
                <li>Rotations Per Minute (RPM)</li>
                <li>Torque</li>
                <li>Mud Flow Rate</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DepthChart;