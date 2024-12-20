import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Weight,
  Gauge,
  Zap,
  Target,
  Droplet,
  ThermometerSun,
  Timer,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  BarChart2,
  Activity,
  Clock,
  RotateCcw,
  Filter,
  Waves,
  Thermometer
} from 'lucide-react';

const ParameterCard = ({ title, value, unit, icon: Icon, trend, trendValue, limits, className = '' }) => (
  <Card className={`relative overflow-hidden ${className}`}>
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>

      {limits && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Min: {limits.min}</span>
            <span>Max: {limits.max}</span>
          </div>
          <Progress 
            value={(value - limits.min) / (limits.max - limits.min) * 100} 
            className="h-1.5"
          />
        </div>
      )}
    </div>
  </Card>
);

const MudPropertyCard = ({ title, value, unit, icon: Icon, critical, trend, additionalData }) => (
  <Card className="relative overflow-hidden">
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${critical ? 'bg-red-50' : 'bg-blue-50'}`}>
            <Icon className={`w-5 h-5 ${critical ? 'text-red-600' : 'text-blue-600'}`} />
          </div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
        </div>
        {trend && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            trend === 'stable' ? 'bg-green-100 text-green-800' :
            trend === 'increasing' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {trend}
          </span>
        )}
      </div>

      <div className="flex items-baseline space-x-2 mb-3">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>

      {additionalData && (
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
          {Object.entries(additionalData).map(([key, value]) => (
            <div key={key} className="text-sm">
              <p className="text-gray-500">{key}</p>
              <p className="font-medium text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </Card>
);

const OperationStatus = ({ title, status, startTime, duration, crew, details }) => (
  <Card className="relative overflow-hidden">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          status === 'In Progress' ? 'bg-green-100 text-green-800' :
          status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-600">Started: {startTime}</span>
          </div>
          <div className="flex items-center text-sm">
            <Timer className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-600">Duration: {duration}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Activity className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-gray-600">Crew: {crew}</span>
          </div>
        </div>
      </div>

      {details && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Operation Details</h4>
          <ul className="space-y-2">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-400 mr-2" />
                <span className="text-gray-600">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </Card>
);

export default function DrillingParameters({ parameters }) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="drilling" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="drilling">Drilling Parameters</TabsTrigger>
          <TabsTrigger value="mud">Mud Properties</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="drilling" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ParameterCard
              title="Weight on Bit"
              value={parameters.wob}
              unit="klbs"
              icon={Weight}
              trend="up"
              trendValue="+2.3%"
              limits={{ min: 15, max: 30 }}
            />
            <ParameterCard
              title="RPM"
              value={parameters.rpm}
              unit="rpm"
              icon={RotateCcw}
              trend="stable"
              trendValue="0.5%"
              limits={{ min: 120, max: 180 }}
            />
            <ParameterCard
              title="Pressure"
              value={parameters.pressure}
              unit="psi"
              icon={Gauge}
              trend="down"
              trendValue="-1.2%"
              limits={{ min: 2800, max: 3600 }}
            />
            <ParameterCard
              title="Torque"
              value={parameters.torque}
              unit="ft-lbs"
              icon={Zap}
              trend="up"
              trendValue="+1.8%"
              limits={{ min: 12000, max: 14000 }}
            />
          </div>

          {/* Drilling Performance Analysis */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Drilling Efficiency</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">94%</span>
                  <ArrowUp className="w-4 h-4 text-green-500" />
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Vibration Level</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">Low</span>
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">MSE</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">32.5</span>
                  <BarChart2 className="w-4 h-4 text-purple-500" />
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="mud" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MudPropertyCard
              title="Mud Weight"
              value="12.4"
              unit="ppg"
              icon={Droplet}
              trend="stable"
              additionalData={{
                'ECD': '12.8 ppg',
                'Target': '12.3-12.6 ppg'
              }}
            />
            <MudPropertyCard
              title="Temperature"
              value="120"
              unit="°F"
              icon={Thermometer}
              trend="increasing"
              additionalData={{
                'In': '115 °F',
                'Out': '120 °F'
              }}
            />
            <MudPropertyCard
              title="Viscosity"
              value="45"
              unit="sec/qt"
              icon={Waves}
              trend="stable"
              additionalData={{
                'PV': '18 cP',
                'YP': '22 lb/100ft²'
              }}
            />
          </div>

          {/* Mud System Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Mud System Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900">Active Pits</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Pit 1</p>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-gray-500">850 bbl / 1000 bbl</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Pit 2</p>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-gray-500">600 bbl / 1000 bbl</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900">Treatment Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Shakers</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Normal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Degasser</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Centrifuge</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Standby</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OperationStatus
              title="Current Operation"
              status="In Progress"
              startTime="10:30 AM"
              duration="1h 45m"
              crew="Team A"
              details={[
                "Drilling ahead at 76 ft/hr",
                "Formation: Sandstone",
                "BHA: PDC bit with MWD/LWD"
              ]}
            />
            <OperationStatus
              title="Next Operation"
              status="Scheduled"
              startTime="13:00 PM"
              duration="2h 00m"
              crew="Team B"
              details={[
                "Survey run",
                "Check downhole sensors",
                "Update trajectory plan"
              ]}
            />
          </div>

          {/* Operations Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Operations Timeline</h3>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-100"></div>
                <div className="space-y-6">
                  {[
                    {
                      time: '10:30 AM',
                      event: 'Started drilling new section',
                      details: 'Initial ROP: 65 ft/hr',
                      status: 'completed'
                    },
                    {
                      time: '11:15 AM',
                      event: 'Optimized drilling parameters',
                      details: 'Increased WOB to 22 klbs',
                      status: 'completed'
                    },
                    {
                      time: '12:00 PM',
                      event: 'Formation change detected',
                      details: 'Adjusting mud properties',
                      status: 'in-progress'
                    },
                    {
                      time: '13:00 PM',
                      event: 'Planned survey run',
                      details: 'Team B to take over',
                      status: 'scheduled'
                    }
                  ].map((item, index) => (
                    <div key={index} className="relative pl-10">
                      <div className={`absolute left-3 w-3 h-3 rounded-full ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`}></div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm text-gray-500">{item.time}</span>
                        <span className="text-sm font-medium text-gray-900">{item.event}</span>
                        <span className="text-sm text-gray-600">{item.details}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
