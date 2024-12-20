import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ClipboardList, 
  BarChart2,
  Bell,
  Calendar,
  Clock,
  AlertTriangle,
  Users,
  Wrench,
  Download
} from 'lucide-react';

// Sample data generators
const generateDailyReport = () => ({
  reportInfo: {
    date: '2024-12-20',
    wellName: 'WELL-GG/GG',
    rig: '555.55',
    contractor: 'CONTRACTOR XYZ',
    engineer: 'JOHN DOE',
    manager: 'JANE SMITH'
  },
  operations: [
    {
      time: '0500-0900',
      hours: 4,
      phase: '6 1/8',
      action: 'DRLG',
      details: 'CIRC',
      depth: '13267-13267'
    },
    {
      time: '0900-1030',
      hours: 1.5,
      phase: '6 1/8',
      action: 'DRLG',
      details: 'P.E.M',
      depth: '13267-13267'
    }
  ],
  surveys: {
    md: '13,267',
    tvd: '11,111',
    inclination: '22.5',
    azimuth: '180.5'
  },
  mudData: {
    weight: '83 PCF',
    funnel: '53',
    ph: '9.6',
    solids: '21%'
  },
  personnel: {
    total: 99,
    breakdown: [
      { company: 'SPS', count: 4 },
      { company: 'RIG', count: 50 },
      { company: 'MUD', count: 15 }
    ]
  }
});

const generateAnalytics = () => ({
  performanceMetrics: {
    ropAverage: 45.5,
    connectionTime: 15.2,
    tripSpeed: 850,
    nptPercentage: 8.5
  },
  timeAnalysis: [
    { category: 'Drilling', hours: 18.5 },
    { category: 'Tripping', hours: 3.2 },
    { category: 'Circulation', hours: 1.5 },
    { category: 'NPT', hours: 0.8 }
  ],
  depthProgression: [
    { date: '2024-12-18', depth: 12980 },
    { date: '2024-12-19', depth: 13100 },
    { date: '2024-12-20', depth: 13267 }
  ]
});

const generateNotifications = () => ([
  {
    id: 1,
    type: 'alert',
    message: 'Lost communication with direction tools',
    timestamp: '23 Oct 22:30',
    status: 'critical',
    details: 'LOST COMMUNICATION WITH DIRECTION TOOLS, TROUBLESHOOTING & TRY TO REGAIN COMMUNICATION'
  },
  {
    id: 2,
    type: 'warning',
    message: 'Using MPD while drilling 6-1/8" section',
    timestamp: '10 Oct 00:30',
    status: 'warning',
    details: 'USING MPD WHILE DRILLING 6-1/8" SECTION'
  }
]);

const ReportingSuite = ({ defaultTab = 'daily' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('/daily')) return 'daily';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/notifications')) return 'notifications';
    return defaultTab;
  });

  const [dailyReport, setDailyReport] = useState(generateDailyReport());
  const [analytics, setAnalytics] = useState(generateAnalytics());
  const [notifications, setNotifications] = useState(generateNotifications());

  const handleTabChange = (value) => {
    setActiveTab(value);
    const basePath = '/reporting';
    const paths = {
      'daily': '/daily',
      'analytics': '/analytics',
      'notifications': '/notifications'
    };
    navigate(`${basePath}${paths[value]}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reporting Suite</h1>
        <div className="flex space-x-4">
          <Input type="date" className="w-[180px]" />
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Daily Reports Tab */}
        <TabsContent value="daily" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Well Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Well Name</p>
                  <p className="text-lg">{dailyReport.reportInfo.wellName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Rig</p>
                  <p className="text-lg">{dailyReport.reportInfo.rig}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-lg">{dailyReport.reportInfo.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operations Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Phase</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Depth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyReport.operations.map((op, index) => (
                    <TableRow key={index}>
                      <TableCell>{op.time}</TableCell>
                      <TableCell>{op.hours}</TableCell>
                      <TableCell>{op.phase}</TableCell>
                      <TableCell>{op.action}</TableCell>
                      <TableCell>{op.details}</TableCell>
                      <TableCell>{op.depth}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Survey Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">MD</p>
                    <p className="text-lg">{dailyReport.surveys.md}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">TVD</p>
                    <p className="text-lg">{dailyReport.surveys.tvd}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Inclination</p>
                    <p className="text-lg">{dailyReport.surveys.inclination}°</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Azimuth</p>
                    <p className="text-lg">{dailyReport.surveys.azimuth}°</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mud Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Weight</p>
                    <p className="text-lg">{dailyReport.mudData.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Funnel</p>
                    <p className="text-lg">{dailyReport.mudData.funnel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">PH</p>
                    <p className="text-lg">{dailyReport.mudData.ph}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Solids</p>
                    <p className="text-lg">{dailyReport.mudData.solids}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">ROP Average</p>
                    <p className="text-2xl font-bold">{analytics.performanceMetrics.ropAverage}</p>
                    <p className="text-xs text-gray-500">ft/hr</p>
                  </div>
                  <BarChart2 className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Connection Time</p>
                    <p className="text-2xl font-bold">{analytics.performanceMetrics.connectionTime}</p>
                    <p className="text-xs text-gray-500">minutes</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Trip Speed</p>
                    <p className="text-2xl font-bold">{analytics.performanceMetrics.tripSpeed}</p>
                    <p className="text-xs text-gray-500">ft/hr</p>
                  </div>
                  <BarChart2 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">NPT</p>
                    <p className="text-2xl font-bold">{analytics.performanceMetrics.nptPercentage}%</p>
                    <p className="text-xs text-gray-500">of total time</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.timeAnalysis.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{item.category}</span>
                      <span className="font-medium">{item.hours} hrs</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ 
                          width: `${(item.hours / analytics.timeAnalysis.reduce((acc, curr) => acc + curr.hours, 0)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Depth Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Depth (ft)</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.depthProgression.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.depth}</TableCell>
                      <TableCell>
                        {index > 0 ? 
                          `+${item.depth - analytics.depthProgression[index-1].depth} ft` : 
                          '-'
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      notification.status === 'critical' ? 'bg-red-100' :
                      notification.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <AlertTriangle className={`h-6 w-6 ${
                        notification.status === 'critical' ? 'text-red-500' :
                        notification.status === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{notification.message}</h4>
                        <span className="text-sm text-gray-500">{notification.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportingSuite;
