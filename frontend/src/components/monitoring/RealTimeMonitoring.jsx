import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, ComposedChart, LineChart, ScatterChart, PieChart, Pie, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Scatter } from 'recharts';
import { COLORS, CHART_DEFAULTS } from '@/lib/constants';
import Timeline from '@/components/ui/timeline';
import { Activity, Clock, ArrowUp, ArrowDown, Wrench, Download, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

const RealTimeMonitoring = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Initialize state for various data types
  const [formationPerformanceData, setFormationPerformanceData] = useState([
    { 
      formation: "SDCSC",
      depth: 9595,
      rop: 75.2,
      mse: 12000,
      wob: 22,
      rpm: 165,
      torque: 13200
    },
    {
      formation: "LMST",
      depth: 10200,
      rop: 82.5,
      mse: 11500,
      wob: 23,
      rpm: 170,
      torque: 13500
    },
    {
      formation: "SHLE",
      depth: 11000,
      rop: 68.3,
      mse: 13200,
      wob: 21,
      rpm: 160,
      torque: 12800
    }
  ]);

  const [parametersHistory, setParametersHistory] = useState([
    { timestamp: "00:00", wob: 22, rpm: 165, torque: 13200, flow: 265 },
    { timestamp: "01:00", wob: 23, rpm: 168, torque: 13400, flow: 268 },
    { timestamp: "02:00", wob: 22.5, rpm: 166, torque: 13300, flow: 266 },
    { timestamp: "03:00", wob: 21.8, rpm: 164, torque: 13100, flow: 264 },
    { timestamp: "04:00", wob: 22.2, rpm: 165, torque: 13250, flow: 265 }
  ]);

  const [costData, setCostData] = useState({
    categories: [
      {
        name: "Drilling Operations",
        amount: 125000,
        percentage: 45,
        trend: -2.3
      },
      {
        name: "Tripping",
        amount: 60000,
        percentage: 25,
        trend: -1.5
      },
      {
        name: "Connections",
        amount: 28000,
        percentage: 12,
        trend: -3.2
      },
      {
        name: "Maintenance",
        amount: 14000,
        percentage: 8,
        trend: 0.5
      }
    ],
    insights: [
      {
        title: "Connection Time Optimization",
        description: "Reducing connection time could save significant costs",
        potentialSavings: 15000
      },
      {
        title: "Tripping Efficiency",
        description: "Optimize tripping speed in stable sections",
        potentialSavings: 8000
      }
    ]
  });

  const [correlationData, setCorrelationData] = useState([
    { paramX: 20, paramY: 70, timestamp: "00:00" },
    { paramX: 21, paramY: 72, timestamp: "01:00" },
    { paramX: 22, paramY: 75.2, timestamp: "02:00" },
    { paramX: 23, paramY: 76.5, timestamp: "03:00" },
    { paramX: 22.5, paramY: 75.8, timestamp: "04:00" },
    { paramX: 21.8, paramY: 74.2, timestamp: "05:00" },
    { paramX: 22.2, paramY: 75.0, timestamp: "06:00" }
  ]);

  const [timeData, setTimeData] = useState({
    productive: 18.5,
    nonProductive: 4.2,
    downtime: 1.3,
    drilling: 12.5,
    tripping: 6.0,
    connection: 2.8,
    maintenance: 1.4,
    detailed: {
      "Drilling Operations": {
        duration: 12.5,
        percentage: 52.1,
        costImpact: 125000,
        trend: 2.3,
        subActivities: [
          { name: "Drilling Ahead", duration: 10.2 },
          { name: "Reaming", duration: 1.5 },
          { name: "Back Reaming", duration: 0.8 }
        ]
      },
      "Tripping": {
        duration: 6.0,
        percentage: 25.0,
        costImpact: 60000,
        trend: -1.5,
        subActivities: [
          { name: "Tripping In", duration: 3.2 },
          { name: "Tripping Out", duration: 2.8 }
        ]
      },
      "Connections": {
        duration: 2.8,
        percentage: 11.7,
        costImpact: 28000,
        trend: -3.2,
        subActivities: [
          { name: "Make Connection", duration: 1.5 },
          { name: "Break Connection", duration: 1.3 }
        ]
      },
      "Maintenance": {
        duration: 1.4,
        percentage: 5.8,
        costImpact: 14000,
        trend: 0.5,
        subActivities: [
          { name: "Planned", duration: 0.8 },
          { name: "Unplanned", duration: 0.6 }
        ]
      }
    }
  });

  const [bitData, setBitData] = useState({
    current: {
      number: "16RR",
      type: "PDC",
      size: "6.125",
      manufacturer: "ULTR",
      hoursRun: 117,
      footage: 3972,
      ropAvg: 75.2,
      costPerFoot: 125.5
    },
    history: [
      {
        number: "15RR",
        type: "PDC",
        footage: 3500,
        hours: 95,
        ropAvg: 71.5,
        costPerFoot: 132.4,
        dullGrade: "2-2-WT-A-X-I-NO-TD"
      }
    ]
  });

  // Add new state variables for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateInterval, setUpdateInterval] = useState(5000); // 5 seconds default

  // Add useEffect for real-time updates
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulated API call - replace with actual API endpoint
        const response = await fetch('/api/drilling-data');
        const data = await response.json();
        
        setFormationPerformanceData(data.formations || formationPerformanceData);
        setParametersHistory(data.parameters || parametersHistory);
        setError(null);
      } catch (err) {
        setError('Failed to fetch real-time data');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const intervalId = setInterval(fetchData, updateInterval);
    return () => clearInterval(intervalId);
  }, [updateInterval]);

  return (
    <div className="space-y-6">
      {/* Add error message display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add update interval selector */}
      <div className="flex justify-end mb-4">
        <Select
          value={updateInterval.toString()}
          onValueChange={(value) => setUpdateInterval(parseInt(value))}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Update Interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1000">Every 1 second</SelectItem>
            <SelectItem value="5000">Every 5 seconds</SelectItem>
            <SelectItem value="10000">Every 10 seconds</SelectItem>
            <SelectItem value="30000">Every 30 seconds</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Add loading indicator */}
      {isLoading && (
        <div className="absolute top-4 right-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="time">Time Analysis</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          <TabsTrigger value="bit">Bit Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Current ROP"
              value={formationPerformanceData[0].rop}
              unit="ft/hr"
              trend={2.3}
            />
            <MetricCard
              title="MSE"
              value={formationPerformanceData[0].mse}
              unit="psi"
              trend={-1.5}
            />
            <MetricCard
              title="Drilling Efficiency"
              value={85}
              unit="%"
              trend={3.2}
            />
            <MetricCard
              title="Cost per Foot"
              value={125.5}
              unit="$/ft"
              trend={-2.1}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Formation Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <FormationPerformanceChart data={formationPerformanceData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline data={timeData.detailed} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="space-y-6">
          <TimeDistributionAnalysis data={timeData} />
        </TabsContent>

        <TabsContent value="parameters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Drilling Parameters Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ParametersChart data={parametersHistory} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>ROP vs WOB Correlation</CardTitle>
            </CardHeader>
            <CardContent>
              <CorrelationChart data={correlationData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Cost Distribution</h3>
                  <CostDistributionChart data={costData} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Cost Insights</h3>
                  <div className="space-y-4">
                    {costData.insights.map((insight, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                        <p className="text-sm font-medium text-green-600">
                          Potential savings: ${insight.potentialSavings.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bit" className="space-y-6">
          <BitPerformanceAnalysis bitData={bitData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Utility Components
const MetricCard = ({ title, value, unit, trend }) => (
  <Card className="p-4">
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-lg bg-blue-50">
        <Activity className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</h3>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend > 0 ? 
              <ArrowUp className="w-4 h-4 mr-1" /> : 
              <ArrowDown className="w-4 h-4 mr-1" />
            }
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  </Card>
);

const FormationPerformanceChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="formation" />
      <YAxis 
        yAxisId="left" 
        orientation="left"
        domain={[0, 'auto']}
        label={{ value: 'ROP (ft/hr)', angle: -90, position: 'insideLeft', offset: -20 }}
        width={80}
      />
      <YAxis 
        yAxisId="right" 
        orientation="right"
        domain={[0, 'auto']}
        label={{ value: 'MSE (psi)', angle: 90, position: 'insideRight', offset: 10 }}
        width={80}
      />
      <Tooltip formatter={(value, name) => [value, name === 'mse' ? `${value} psi` : `${value} ft/hr`]} />
      <Legend />
      <Bar yAxisId="left" dataKey="rop" fill="#8884d8" name="ROP" barSize={40} />
      <Line yAxisId="right" type="monotone" dataKey="mse" stroke="#82ca9d" name="MSE" strokeWidth={2} />
    </ComposedChart>
  </ResponsiveContainer>
);

const ParametersChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <ComposedChart data={data} margin={{ top: 20, right: 50, left: 20, bottom: 20 }}>
      <defs>
        <linearGradient id="wobGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
      <XAxis 
        dataKey="timestamp" 
        stroke="#94a3b8"
        tick={{ fill: '#64748b' }}
        label={{ value: 'Time (HH:mm)', position: 'bottom', fill: '#64748b' }}
      />
      <YAxis 
        yAxisId="left"
        orientation="left"
        domain={[0, 200]}
        stroke="#94a3b8"
        tick={{ fill: '#64748b' }}
        tickCount={5}
        label={{ value: 'WOB (klbs) / RPM', angle: -90, position: 'insideLeft', fill: '#64748b' }}
      />
      <YAxis 
        yAxisId="right"
        orientation="right"
        domain={[0, 16000]}
        stroke="#94a3b8"
        tick={{ fill: '#64748b' }}
        tickCount={5}
        ticks={[0, 4000, 8000, 12000, 16000]}
        tickFormatter={(value) => `${value}`}
        label={{ 
          value: 'Torque (ft-lbs) / Flow (gpm)', 
          angle: 90, 
          position: 'insideRight', 
          fill: '#64748b',
          offset: 0
        }}
        width={60}
      />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          padding: '12px'
        }}
        formatter={(value, name) => {
          const units = {
            wob: 'klbs',
            rpm: '',
            torque: 'ft-lbs',
            flow: 'gpm'
          };
          return [`${value} ${units[name.toLowerCase()] || ''}`, name];
        }}
      />
      <Legend 
        verticalAlign="top" 
        height={36}
        iconType="circle"
        wrapperStyle={{ paddingTop: '10px' }}
      />
      <Line 
        yAxisId="left"
        type="monotone"
        dataKey="wob"
        stroke="#3b82f6"
        strokeWidth={3}
        dot={false}
        name="WOB"
      />
      <Line 
        yAxisId="left"
        type="monotone"
        dataKey="rpm"
        stroke="#22c55e"
        strokeWidth={3}
        dot={false}
        name="RPM"
      />
      <Line 
        yAxisId="right"
        type="monotone"
        dataKey="torque"
        stroke="#f59e0b"
        strokeWidth={3}
        dot={false}
        name="Torque"
      />
      <Line 
        yAxisId="right"
        type="monotone"
        dataKey="flow"
        stroke="#ef4444"
        strokeWidth={3}
        dot={false}
        name="Flow"
      />
    </ComposedChart>
  </ResponsiveContainer>
);

const CostDistributionChart = ({ data }) => {
  const COLORS = {
    'Drilling Operations': '#4F46E5', // Indigo
    'Tripping': '#10B981',           // Emerald
    'Connections': '#F59E0B',        // Amber
    'Maintenance': '#EF4444'         // Red
  };

  const pieData = data.categories.map(category => ({
    name: category.name,
    value: category.amount,
    color: COLORS[category.name]
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `$${value.toLocaleString()}`}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            padding: '12px'
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value, entry) => (
            <span style={{ color: '#374151' }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

const CorrelationChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <ScatterChart margin={{ top: 20, right: 30, left: 100, bottom: 60 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
      <XAxis 
        type="number" 
        dataKey="paramX" 
        name="WOB" 
        domain={[15, 25]}
        label={{ value: 'Weight on Bit (klbs)', position: 'bottom', offset: 40 }}
        tick={{ fontSize: 12 }}
        stroke="#666"
      />
      <YAxis 
        type="number" 
        dataKey="paramY" 
        name="ROP"
        domain={[60, 80]}
        label={{ value: 'Rate of Penetration (ft/hr)', angle: -90, position: 'insideLeft', offset: -20 }}
        tick={{ fontSize: 12 }}
        stroke="#666"
      />
      <Tooltip 
        cursor={{ strokeDasharray: '3 3' }}
        contentStyle={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          padding: '12px'
        }}
        formatter={(value, name) => {
          const units = {
            wob: 'klbs',
            rpm: '',
            torque: 'ft-lbs',
            flow: 'gpm'
          };
          return [`${value} ${units[name.toLowerCase()] || ''}`, name === 'paramX' ? 'WOB' : 'ROP'];
        }} 
      />
      <Legend 
        verticalAlign="top" 
        align="right"
        wrapperStyle={{ paddingBottom: '10px' }}
      />
      <Scatter 
        name="ROP vs WOB" 
        data={data} 
        fill="#6366f1"
        line={{ stroke: '#4338ca', strokeWidth: 2 }}
        shape="circle"
      />
    </ScatterChart>
  </ResponsiveContainer>
);

const TimeDistributionAnalysis = ({ data }) => {
  const timeDistribution = {
    productive: (data.productive / (data.productive + data.nonProductive + data.downtime) * 100).toFixed(1),
    nonProductive: (data.nonProductive / (data.productive + data.nonProductive + data.downtime) * 100).toFixed(1),
    downtime: (data.downtime / (data.productive + data.nonProductive + data.downtime) * 100).toFixed(1)
  };

  const pieData = [
    { name: 'Productive', value: parseFloat(timeDistribution.productive), color: '#10B981' },
    { name: 'Non-Productive', value: parseFloat(timeDistribution.nonProductive), color: '#F59E0B' },
    { name: 'Downtime', value: parseFloat(timeDistribution.downtime), color: '#EF4444' }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Time Distribution Analysis
        </h3>
        <div className="flex items-center space-x-4">
          <Select defaultValue="24h">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12h">Last 12 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
            </SelectContent>
          </Select>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Distribution Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Time Categories Breakdown */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-green-800">Productive Time</h4>
              <p className="text-2xl font-bold text-green-600">{timeDistribution.productive}%</p>
              <p className="text-sm text-green-600">Target: 85%</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-800">Non-Productive</h4>
              <p className="text-2xl font-bold text-yellow-600">{timeDistribution.nonProductive}%</p>
              <p className="text-sm text-yellow-600">Target: 10%</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="text-sm font-medium text-red-800">Downtime</h4>
              <p className="text-2xl font-bold text-red-600">{timeDistribution.downtime}%</p>
              <p className="text-sm text-red-600">Target: 5%</p>
            </div>
          </div>

          {/* Time Categories Details */}
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Drilling Operations</span>
                <span>{data.drilling} hrs</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Tripping Operations</span>
                <span>{data.tripping} hrs</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Connection Time</span>
                <span>{data.connection} hrs</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Maintenance</span>
                <span>{data.maintenance} hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const BitPerformanceAnalysis = ({ bitData }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Wrench className="w-5 h-5 mr-2 text-blue-600" />
          Bit Performance Analysis
        </h3>
        <div className="flex items-center space-x-4">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Bit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Bit</SelectItem>
              <SelectItem value="previous">Previous Bit</SelectItem>
              <SelectItem value="all">All Bits</SelectItem>
            </SelectContent>
          </Select>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bit Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Current Bit Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bit Number</span>
                  <span className="font-medium">{bitData.current.number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">{bitData.current.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size</span>
                  <span className="font-medium">{bitData.current.size}"</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Manufacturer</span>
                  <span className="font-medium">{bitData.current.manufacturer}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours Run</span>
                  <span className="font-medium">{bitData.current.hoursRun} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Footage</span>
                  <span className="font-medium">{bitData.current.footage} ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROP Avg</span>
                  <span className="font-medium">{bitData.current.ropAvg} ft/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost per Foot</span>
                  <span className="font-medium">${bitData.current.costPerFoot}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Bit Comparison */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Bit #</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Footage</th>
                <th className="text-left py-2">Hours</th>
                <th className="text-left py-2">Avg ROP</th>
                <th className="text-left py-2">Cost/ft</th>
                <th className="text-left py-2">Dull Grade</th>
              </tr>
            </thead>
            <tbody>
              {bitData.history.map((bit, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{bit.number}</td>
                  <td className="py-2">{bit.type}</td>
                  <td className="py-2">{bit.footage} ft</td>
                  <td className="py-2">{bit.hours} hrs</td>
                  <td className="py-2">{bit.ropAvg} ft/hr</td>
                  <td className="py-2">${bit.costPerFoot}</td>
                  <td className="py-2">{bit.dullGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default RealTimeMonitoring;