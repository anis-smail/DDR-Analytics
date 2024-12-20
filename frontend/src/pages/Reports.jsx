import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Download, Filter, Calendar, Printer, Share2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample report data
const recentReports = [
  {
    id: 1,
    title: 'Daily Drilling Progress Report',
    date: '2024-12-20',
    type: 'Operations',
    status: 'Generated'
  },
  {
    id: 2,
    title: 'Well Performance Analysis',
    date: '2024-12-19',
    type: 'Analytics',
    status: 'Generated'
  },
  {
    id: 3,
    title: 'Equipment Maintenance Log',
    date: '2024-12-18',
    type: 'Maintenance',
    status: 'Generated'
  },
  {
    id: 4,
    title: 'Formation Evaluation Summary',
    date: '2024-12-17',
    type: 'Geology',
    status: 'Generated'
  }
];

const scheduledReports = [
  {
    id: 5,
    title: 'Weekly Performance Summary',
    schedule: 'Every Monday',
    type: 'Analytics',
    nextRun: '2024-12-23'
  },
  {
    id: 6,
    title: 'Monthly Cost Analysis',
    schedule: 'First of Month',
    type: 'Financial',
    nextRun: '2025-01-01'
  }
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('recent');
  const [timeRange, setTimeRange] = useState('7d');
  const [reportType, setReportType] = useState('all');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="analytics">Analytics</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="geology">Geology</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-semibold">Generate Report</div>
                <div className="text-sm text-gray-500">Create custom report</div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-semibold">Schedule Report</div>
                <div className="text-sm text-gray-500">Set up automated reports</div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-semibold">Download All</div>
                <div className="text-sm text-gray-500">Export selected reports</div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Printer className="w-5 h-5 text-orange-500" />
              <div>
                <div className="font-semibold">Print Reports</div>
                <div className="text-sm text-gray-500">Print selected reports</div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {recentReports.map(report => (
            <Card key={report.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-semibold">{report.title}</div>
                    <div className="text-sm text-gray-500">
                      Generated on {report.date} • {report.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledReports.map(report => (
            <Card key={report.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-semibold">{report.title}</div>
                    <div className="text-sm text-gray-500">
                      {report.schedule} • Next run: {report.nextRun}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Edit Schedule
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}