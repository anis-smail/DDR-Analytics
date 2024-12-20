import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertCircle, AlertOctagon, AlertTriangle, ArrowDown, ArrowUp, BarChart2, Brain, Calendar, CheckCircle2, ChevronRight, ClipboardList, Clock, Clock4, Database, Download, Droplet, Filter, Gauge, Hammer, HardDrive, MapPin, Maximize2, MoreHorizontal, Printer, RefreshCw, RotateCw, Ruler, Scale, Settings, Share2, Target, Timer, TrendingUp, Users, Wrench, X, XCircle, Zap
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import Plot from 'react-plotly.js';

// Utility Functions
const formatNumber = (value, decimals = 1) => {
  return Number(value).toFixed(decimals);
};

const formatDuration = (hours) => {
  const hrs = Math.floor(hours);
  const mins = Math.round((hours - hrs) * 60);
  return `${hrs}h ${mins}m`;
};

// Header Component with Filters
const DashboardHeader = ({ onFilterChange, onTimeRangeChange, onExport }) => (
  <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-6">
    <h2 className="text-2xl font-bold">Drilling Operations Dashboard</h2>
    <div className="flex flex-wrap items-center gap-4">
      <Select onValueChange={onTimeRangeChange} defaultValue="24h">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Time Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="12h">Last 12 Hours</SelectItem>
          <SelectItem value="24h">Last 24 Hours</SelectItem>
          <SelectItem value="7d">Last 7 Days</SelectItem>
          <SelectItem value="30d">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>
      
      <Select onValueChange={onFilterChange} defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter By Phase" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Phases</SelectItem>
          <SelectItem value="drilling">Drilling</SelectItem>
          <SelectItem value="tripping">Tripping</SelectItem>
          <SelectItem value="casing">Casing</SelectItem>
        </SelectContent>
      </Select>

      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        onClick={onExport}
      >
        <Download className="w-4 h-4" />
        Export
      </button>
    </div>
  </div>
);

// Quick Stats Component
const QuickStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {stats.map((stat, index) => (
      <Card key={index} className="p-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${stat.bgColor}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
            {stat.trend && (
              <p className={`text-sm ${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}% vs prev.
              </p>
            )}
          </div>
        </div>
      </Card>
    ))}
  </div>
);

// Time Analysis Tab
const TimeAnalysisTab = ({ timeData, lostTimeData, outOfScopeData }) => (
  <div className="space-y-6">
    {/* Time Distribution Chart */}
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Time Distribution</CardTitle>
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
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="productive" stackId="1" stroke="#10B981" fill="#10B981" name="Productive" />
              <Area type="monotone" dataKey="nonProductive" stackId="1" stroke="#F59E0B" fill="#F59E0B" name="Non-Productive" />
              <Area type="monotone" dataKey="lostTime" stackId="1" stroke="#EF4444" fill="#EF4444" name="Lost Time" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

    {/* Lost Time Analysis */}
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-semibold">Lost Time Details</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date/Time</th>
                <th className="text-left py-2">Duration</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Cause</th>
                <th className="text-left py-2">Impact</th>
              </tr>
            </thead>
            <tbody>
              {(lostTimeData || []).map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{item.datetime}</td>
                  <td className="py-2">{formatDuration(item.duration)}</td>
                  <td className="py-2">{item.type}</td>
                  <td className="py-2">{item.cause}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.impact === 'High' ? 'bg-red-100 text-red-800' :
                      item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.impact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    {/* Out of Scope Analysis */}
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-semibold">Out of Scope Activities</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">From</th>
                <th className="text-left py-2">Hours</th>
                <th className="text-left py-2">Cumulative Hrs</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Summary</th>
              </tr>
            </thead>
            <tbody>
              {(outOfScopeData || []).map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{item.from}</td>
                  <td className="py-2">{item.hours}</td>
                  <td className="py-2">{item.cumulativeHours}</td>
                  <td className="py-2">{item.type}</td>
                  <td className="py-2">{item.category}</td>
                  <td className="py-2">{item.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Drilling Parameters Tab
const DrillingParametersTab = ({ drillingData, mudData, bitData }) => (
  <div className="space-y-6">
    {/* Real-time Parameters */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <Gauge className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">WOB</p>
            <p className="text-xl font-bold">{drillingData.wob} klbs</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-green-50">
            <RotateCw className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">RPM</p>
            <p className="text-xl font-bold">{drillingData.rpm}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple-50">
            <Scale className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Torque</p>
            <p className="text-xl font-bold">{drillingData.torque} kft-lbs</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-red-50">
            <Droplet className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Flow Rate</p>
            <p className="text-xl font-bold">{drillingData.flowRate} gpm</p>
          </div>
        </div>
      </Card>
    </div>

    {/* Parameters Chart */}
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Drilling Parameters Trend</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Parameters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Parameters</SelectItem>
              <SelectItem value="wob">WOB</SelectItem>
              <SelectItem value="rpm">RPM</SelectItem>
              <SelectItem value="torque">Torque</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={drillingData.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="wob" name="WOB (klbs)" stroke="#2563EB" />
              <Line yAxisId="right" type="monotone" dataKey="rpm" name="RPM" stroke="#059669" />
              <Line yAxisId="left" type="monotone" dataKey="torque" name="Torque (kft-lbs)" stroke="#7C3AED" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

    {/* Mud Data */}
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Mud Properties</CardTitle>
          <button className="text-blue-600 hover:text-blue-700">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2">Physical Properties</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Density</span>
                <span>{mudData.density} pcf</span></div>
              <div className="flex justify-between">
                <span className="text-gray-600">Funnel Viscosity</span>
                <span>{mudData.funnelViscosity} sec</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">PV</span>
                <span>{mudData.pv}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">YP</span>
                <span>{mudData.yp}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Chemical Properties</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">pH</span>
                <span>{mudData.ph}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chlorides</span>
                <span>{mudData.chlorides} ppm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Calcium</span>
                <span>{mudData.calcium} ppm</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Volume Fractions</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Water</span>
                <span>{mudData.waterVolume}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Oil</span>
                <span>{mudData.oilVolume}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Solids</span>
                <span>{mudData.solidsVolume}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mud Treatment */}
        <div className="mt-6">
          <h4 className="font-medium mb-2">Mud Treatment</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-left py-2">Unit</th>
                  <th className="text-left py-2">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {(mudData.treatments || []).map((treatment, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2">{treatment.product}</td>
                    <td className="py-2">{treatment.quantity}</td>
                    <td className="py-2">{treatment.unit}</td>
                    <td className="py-2">{treatment.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Bit Data */}
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Bit Performance</CardTitle>
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-4">Current Bit Details</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bit Number</p>
                  <p className="font-medium">{bitData.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Size</p>
                  <p className="font-medium">{bitData.size}"</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Manufacturer</p>
                  <p className="font-medium">{bitData.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">IADC Code</p>
                  <p className="font-medium">{bitData.iadcCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jets</p>
                  <p className="font-medium">{bitData.jets}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">TFA</p>
                  <p className="font-medium">{bitData.tfa}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Performance Metrics</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Footage</p>
                  <p className="font-medium">{bitData.footage} ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hours</p>
                  <p className="font-medium">{bitData.hours} hrs</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg ROP</p>
                  <p className="font-medium">{bitData.avgROP} ft/hr</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Depth In</p>
                  <p className="font-medium">{bitData.depthIn} ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Depth Out</p>
                  <p className="font-medium">{bitData.depthOut} ft</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dull Grade</p>
                  <p className="font-medium">{bitData.dullGrade}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bit Performance Chart */}
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bitData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="depth" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="rop" name="ROP (ft/hr)" stroke="#2563EB" />
              <Line yAxisId="right" type="monotone" dataKey="wob" name="WOB (klbs)" stroke="#059669" />
              <Line yAxisId="right" type="monotone" dataKey="rpm" name="RPM" stroke="#7C3AED" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Formation and Survey Tab
const FormationSurveyTab = ({ formationData, surveyData }) => {
  const [show3D, setShow3D] = useState(false);

  const WellPath3D = () => {
    // Prepare data for 3D visualization
    const data = [{
      type: 'scatter3d',
      mode: 'lines+markers',
      x: surveyData.map(d => d.ew),
      y: surveyData.map(d => d.ns),
      z: surveyData.map(d => -d.tvd), // Negative TVD to show depth correctly
      line: {
        color: '#2563EB',
        width: 4
      },
      marker: {
        size: 4,
        color: '#2563EB',
      },
      name: 'Well Path'
    }];

    const layout = {
      title: '3D Well Trajectory',
      scene: {
        xaxis: { title: 'E/W Displacement (ft)' },
        yaxis: { title: 'N/S Displacement (ft)' },
        zaxis: { 
          title: 'TVD (ft)',
          autorange: 'reversed' // To show depth increasing downward
        },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 }
        }
      },
      showlegend: true,
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
      margin: { l: 0, r: 0, t: 40, b: 0 }
    };

    const config = {
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToAdd: ['hoverClosest3d']
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-[95vw] max-h-[95vh]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">3D Well Trajectory</h3>
            <button 
              onClick={() => setShow3D(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="relative">
            <Plot
              data={data}
              layout={layout}
              config={config}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Current Position Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-50">
              <Ruler className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current MD</p>
              <p className="text-xl font-bold">{formationData.currentMD} ft</p>
              <p className="text-sm text-gray-500">TVD: {formationData.currentTVD} ft</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Formation</p>
              <p className="text-xl font-bold">{formationData.currentFormation}</p>
              <p className="text-sm text-gray-500">Top: {formationData.formationTop} ft MD</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-50">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Hole Section</p>
              <p className="text-xl font-bold">{formationData.holeSection}</p>
              <p className="text-sm text-gray-500">Last Casing: {formationData.lastCasing}"</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Formation Tops Table */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Formation Tops</CardTitle>
            <button className="text-blue-600 hover:text-blue-700">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Formation</th>
                  <th className="text-left py-2">MD Top (ft)</th>
                  <th className="text-left py-2">TVD (ft)</th>
                  <th className="text-left py-2">Thickness (ft)</th>
                  <th className="text-left py-2">Comments</th>
                </tr>
              </thead>
              <tbody>
                {(formationData.tops || []).map((formation, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2">{formation.name}</td>
                    <td className="py-2">{formation.mdTop}</td>
                    <td className="py-2">{formation.tvd}</td>
                    <td className="py-2">{formation.thickness}</td>
                    <td className="py-2">{formation.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Survey Data */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Directional Survey</CardTitle>
            <div className="flex items-center space-x-4">
              <Select defaultValue="last">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Survey Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last">Last Survey</SelectItem>
                  <SelectItem value="last10">Last 10 Surveys</SelectItem>
                  <SelectItem value="all">All Surveys</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">MD (ft)</th>
                  <th className="text-left py-2">Inclination (°)</th>
                  <th className="text-left py-2">Azimuth (°)</th>
                  <th className="text-left py-2">TVD (ft)</th>
                  <th className="text-left py-2">N/S</th>
                  <th className="text-left py-2">E/W</th>
                  <th className="text-left py-2">DLS (°/100ft)</th>
                </tr>
              </thead>
              <tbody>
                {(surveyData || []).map((survey, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2">{survey.md}</td>
                    <td className="py-2">{survey.inclination}</td>
                    <td className="py-2">{survey.azimuth}</td>
                    <td className="py-2">{survey.tvd}</td>
                    <td className="py-2">{survey.ns}</td>
                    <td className="py-2">{survey.ew}</td>
                    <td className="py-2">{survey.dls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Wellpath Visualization */}
          <div className="mt-6 h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={surveyData.slice().reverse()} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="ew" 
                  label={{ value: 'E/W Displacement (ft)', position: 'bottom' }}
                  domain={['dataMin - 100', 'dataMax + 100']}
                  type="number"
                  tickFormatter={value => value.toFixed(0)}
                />
                <YAxis 
                  dataKey="ns" 
                  label={{ value: 'N/S Displacement (ft)', angle: -90, position: 'left' }}
                  domain={['dataMin - 100', 'dataMax + 100']}
                  type="number"
                  tickFormatter={value => value.toFixed(0)}
                />
                <Tooltip 
                  formatter={(value, name) => [value.toFixed(2), name === 'ns' ? 'N/S' : 'E/W']}
                  labelFormatter={(label) => `Depth: ${label} ft`}
                />
                <Line 
                  type="monotone" 
                  dataKey="ns" 
                  stroke="#2563EB" 
                  dot={true}
                  name="N/S"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="ew" 
                  stroke="#DC2626" 
                  dot={true}
                  name="E/W"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Add a 3D view toggle button */}
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => setShow3D(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
              <span>View in 3D</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 3D View Modal */}
      {show3D && <WellPath3D />}
    </div>
  );
};

// Personnel and Equipment Tab
const PersonnelEquipmentTab = ({ personnelData, equipmentData }) => (
  <div className="space-y-6">
    {/* Personnel Overview */}
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Personnel on Location</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Total POB:</span>
            <span className="font-medium">{personnelData.totalPOB}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(personnelData.byCompany || {}).map(([company, data], index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{company}</h4>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {data.count} personnel
                </span>
              </div>
              <div className="space-y-1">
                {(data.roles || []).map((role, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{role.title}</span>
                    <span>{role.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Crew Time Tracking */}
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-semibold">Crew Time Tracking</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-4">Hours Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={personnelData.timeTracking}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="crew" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="regular" name="Regular Hours" fill="#2563EB" />
                  <Bar dataKey="overtime" name="Overtime" fill="#7C3AED" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Crew Rotation Schedule</h4>
            <div className="space-y-4">
              {(personnelData.rotations || []).map((rotation, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{rotation.crew}</p>
                    <p className="text-sm text-gray-600">{rotation.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{rotation.schedule}</p>
                    <p className="text-sm text-gray-600">{rotation.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Equipment Status */}
    <Card className="p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Equipment Status</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Equipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Equipment</SelectItem>
              <SelectItem value="critical">Critical Items</SelectItem>
              <SelectItem value="maintenance">Due Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Equipment</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Hours</th>
                <th className="text-left py-2">Last Maintenance</th>
                <th className="text-left py-2">Next Due</th>
                <th className="text-left py-2">Comments</th>
              </tr>
            </thead>
            <tbody>
              {(equipmentData || []).map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Operational' ? 'bg-green-100 text-green-800' :
                      item.status === 'Maintenance Required' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2">{item.hours}</td>
                  <td className="py-2">{item.lastMaintenance}</td>
                  <td className="py-2">{item.nextDue}</td>
                  <td className="py-2">{item.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Main Dashboard Component
const PerformanceAnalysis = () => {
  // State management for all the different data sections
  const [activeTab, setActiveTab] = useState('time');
  const [timeRange, setTimeRange] = useState('24h');
  const [filterPhase, setFilterPhase] = useState('all');

  // Initialize dashboard data
  const {
    timeData,
    lostTimeData,
    outOfScopeData,
    drillingData,
    mudData,
    bitData,
    surveyData,
    formationData,
    personnelData,
    equipmentData
  } = initializeDashboard();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <DashboardHeader 
        onFilterChange={setFilterPhase}
        onTimeRangeChange={setTimeRange}
        onExport={() => console.log('Exporting data...')}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="time">
            <Clock className="w-4 h-4 mr-2" />
            Time Analysis
          </TabsTrigger>
          <TabsTrigger value="drilling">
            <Hammer className="w-4 h-4 mr-2" />
            Drilling Parameters
          </TabsTrigger>
          <TabsTrigger value="formation">
            <MapPin className="w-4 h-4 mr-2" />
            Formation & Survey
          </TabsTrigger>
          <TabsTrigger value="personnel">
            <Users className="w-4 h-4 mr-2" />
            Personnel & Equipment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="time">
          <TimeAnalysisTab 
            timeData={timeData} 
            lostTimeData={lostTimeData} 
            outOfScopeData={outOfScopeData} 
          />
        </TabsContent>

        <TabsContent value="drilling">
          <DrillingParametersTab 
            drillingData={drillingData} 
            mudData={mudData} 
            bitData={bitData} 
          />
        </TabsContent>

        <TabsContent value="formation">
          <FormationSurveyTab 
            formationData={formationData} 
            surveyData={surveyData} 
          />
        </TabsContent>

        <TabsContent value="personnel">
          <PersonnelEquipmentTab 
            personnelData={personnelData} 
            equipmentData={equipmentData} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Utility function to format dates
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

// Initialize the dashboard with sample data
const initializeDashboard = () => {
  // Sample time data
  const timeData = [
    { time: '00:00', productive: 45, nonProductive: 20, downtime: 5 },
    { time: '04:00', productive: 50, nonProductive: 15, downtime: 8 },
    { time: '08:00', productive: 40, nonProductive: 25, downtime: 12 },
    { time: '12:00', productive: 55, nonProductive: 18, downtime: 6 },
    { time: '16:00', productive: 48, nonProductive: 22, downtime: 9 },
    { time: '20:00', productive: 52, nonProductive: 16, downtime: 7 }
  ];

  // Sample lost time data from the provided report
  const lostTimeData = [
    {
      datetime: '23 Oct 2230',
      duration: 6.5,
      type: 'BHA',
      cause: 'FOT',
      impact: 'High',
      summary: 'LOST COMMUNICATION WITH DIRECTIONAL TOOLS, TROUBLESHOOTING & TRY TO RE-GAIN COMMUNICATION, NO SUCCESS.'
    }
  ];

  // Sample out of scope data from the report
  const outOfScopeData = [
    {
      from: '10 Oct 0030',
      hours: 9.5,
      cumulativeHours: 62.75,
      type: 'OOS',
      category: 'DRLG',
      summary: 'USING MPD WHILE DRILLING 6-1/8" SECTION.'
    }
  ];

  // Sample drilling parameters
  const drillingData = {
    wob: 22,
    rpm: 165,
    torque: 13200,
    flowRate: 265,
    trends: [
      { time: '00:00', wob: 22, rpm: 165, torque: 13200, pressure: 3300 },
      { time: '04:00', wob: 23, rpm: 168, torque: 13400, pressure: 3320 },
      { time: '08:00', wob: 24, rpm: 172, torque: 13600, pressure: 3340 }
    ]
  };

  // Sample mud data from the report
  const mudData = {
    density: 81,
    funnelViscosity: 53,
    pv: 23,
    yp: 28,
    ph: 9.6,
    chlorides: 79000,
    calcium: 640,
    waterVolume: 76,
    oilVolume: 3,
    solidsVolume: 21,
    treatments: [
      { product: 'FLO-TROL', quantity: 20, unit: '50LB', purpose: 'Viscosifier' },
      { product: 'MRBL-F', quantity: 3, unit: '2200L', purpose: 'Base Oil' },
      { product: 'MAXSHIELD', quantity: 1, unit: '55GL', purpose: 'Inhibitor' }
    ]
  };

  // Sample bit data from the report
  const bitData = {
    number: '16RR',
    size: 6.125,
    manufacturer: 'ULTR',
    iadcCode: 'M232',
    jets: 'TFA 0.518',
    footage: 301.88,
    hours: 117,
    avgROP: 40,
    depthIn: 9595,
    depthOut: 13567,
    dullGrade: '1-1-WT-A-X-I-NO-TD',
    performanceData: [
      { depth: 9595, rop: 65, wob: 22, rpm: 165 },
      { depth: 10595, rop: 68, wob: 23, rpm: 168 },
      { depth: 11595, rop: 72, wob: 24, rpm: 172 }
    ]
  };

  // Sample survey data from the report
  const surveyData = [
    {
      md: 13267,
      inclination: 89.2,
      azimuth: 22.5,
      tvd: 6981,
      ns: 1867.34,
      ew: -264.18,
      dls: 0.61,
      path: [0, 0, 0]
    },
    {
      md: 13147,
      inclination: 88.9,
      azimuth: 22.3,
      tvd: 6980,
      ns: 1847.12,
      ew: -261.45,
      dls: 0.58,
      path: [120, -2.73, -20.22]
    },
    {
      md: 13027,
      inclination: 88.5,
      azimuth: 21.1,
      tvd: 6979,
      ns: 1827.01,
      ew: -258.83,
      dls: 0.55,
      path: [240, -5.35, -40.33]
    },
    {
      md: 12907,
      inclination: 88.3,
      azimuth: 21.9,
      tvd: 6978,
      ns: 1807.01,
      ew: -256.33,
      dls: 0.52,
      path: [360, -7.85, -60.33]
    },
    {
      md: 12787,
      inclination: 88.0,
      azimuth: 21.7,
      tvd: 6977,
      ns: 1787.12,
      ew: -253.95,
      dls: 0.49,
      path: [480, -10.23, -80.22]
    },
    {
      md: 12667,
      inclination: 87.8,
      azimuth: 21.5,
      tvd: 6976,
      ns: 1767.34,
      ew: -251.68,
      dls: 0.47,
      path: [600, -12.50, -100.00]
    }
  ];

  // Sample personnel data from the report
  const personnelData = {
    totalPOB: 99,
    byCompany: {
      RZT: { count: 15, roles: [{ title: 'CTRG', count: 15 }] },
      SPS: { count: 4, roles: [{ title: 'DPDS', count: 4 }] },
      RIG: { count: 50, roles: [{ title: 'Crew', count: 50 }] }
    },
    timeTracking: [
      { crew: 'Day Shift', regular: 12, overtime: 2 },
      { crew: 'Night Shift', regular: 12, overtime: 3 }
    ],
    rotations: [
      { crew: 'Crew 1', position: 'Driller', schedule: '14/14', status: 'On Duty' }
    ]
  };

  return {
    timeData,
    lostTimeData,
    outOfScopeData,
    drillingData,
    mudData,
    bitData,
    surveyData,
    formationData: {
      currentMD: 13267,
      currentTVD: 6981,
      currentFormation: 'Sandstone',
      formationTop: 9595,
      holeSection: '6-1/8"',
      lastCasing: '9-5/8"',
      tops: [
        { name: 'Sandstone', mdTop: 9595, tvd: 6981, thickness: 100, comments: 'Good quality' },
        { name: 'Shale', mdTop: 10595, tvd: 7481, thickness: 150, comments: 'Poor quality' }
      ]
    },
    personnelData,
    equipmentData: [
      { name: 'Top Drive', status: 'Operational', hours: 100, lastMaintenance: '2024-01-15', nextDue: '2024-02-15', comments: 'Good condition' },
      { name: 'Draw Works', status: 'Needs Inspection', hours: 150, lastMaintenance: '2023-12-30', nextDue: '2024-01-30', comments: 'Due for maintenance' }
    ]
  };
};

// Export the dashboard component
export default PerformanceAnalysis;