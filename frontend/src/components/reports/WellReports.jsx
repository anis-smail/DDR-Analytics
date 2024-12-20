import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  FileText,
  Download,
  Share2,
  Calendar,
  Clock,
  Filter,
  Search,
  Plus,
  MoreVertical,
  File,
  Table,
  Database,
  Eye,
  CheckCircle,
  AlertTriangle,
  BarChart
} from 'lucide-react';

const ReportCard = ({ report }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-50';
      case 'In Progress':
        return 'text-blue-600 bg-blue-50';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'Excel':
        return <Table className="w-5 h-5 text-green-500" />;
      case 'JSON':
        return <Database className="w-5 h-5 text-blue-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {getFormatIcon(report.format)}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{report.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Eye className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Download className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{report.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{report.time}</span>
          </div>
        </div>
        <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(report.status)}`}>
          {report.status}
        </span>
      </div>

      {report.metrics && (
        <div className="mt-4 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          {report.metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default function WellReports() {
  const [reports] = useState([
    {
      title: 'Daily Drilling Report',
      description: 'Comprehensive daily operations summary including key performance metrics',
      format: 'PDF',
      date: '2024-12-19',
      time: '11:30 AM',
      status: 'Completed',
      metrics: [
        { label: 'Depth Drilled', value: '450 ft' },
        { label: 'Avg ROP', value: '75.2 ft/hr' },
        { label: 'NPT', value: '15%' }
      ]
    },
    {
      title: 'Formation Analysis',
      description: 'Detailed analysis of formation characteristics and drilling parameters',
      format: 'Excel',
      date: '2024-12-19',
      time: '10:45 AM',
      status: 'In Progress',
      metrics: [
        { label: 'Formations', value: '6' },
        { label: 'Samples', value: '24' },
        { label: 'Depth', value: '12,450 ft' }
      ]
    },
    {
      title: 'Real-Time Data Export',
      description: 'Raw sensor data export for external analysis',
      format: 'JSON',
      date: '2024-12-19',
      time: '11:00 AM',
      status: 'Pending',
      metrics: [
        { label: 'Data Points', value: '15,420' },
        { label: 'Sensors', value: '42' },
        { label: 'Time Range', value: '24h' }
      ]
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Filter className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          <span>New Report</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Reports', value: '156', icon: FileText, trend: '+12%' },
          { label: 'Generated Today', value: '8', icon: Calendar, trend: '+3' },
          { label: 'Pending Review', value: '3', icon: AlertTriangle, trend: '-2' },
          { label: 'Automated Reports', value: '85%', icon: BarChart, trend: '+5%' }
        ].map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-full">
                <stat.icon className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600">
              {stat.trend}
            </div>
          </Card>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {reports.map((report, index) => (
          <ReportCard key={index} report={report} />
        ))}
      </div>
    </div>
  );
}
