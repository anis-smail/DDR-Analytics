import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import RealTimeMonitoring from '@/components/monitoring/RealTimeMonitoring';
import PerformanceAnalysis from '@/components/analytics/PerformanceAnalysis';
import WellReports from '@/components/reports/WellReports';
import { Activity, TrendingUp, FileText } from 'lucide-react';

const NavButton = ({ to, icon: Icon, children, isActive }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </button>
  );
};

export default function WellAnalytics() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Well Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Comprehensive well monitoring and performance analysis
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
            <div className="text-sm text-gray-500">
              Last Update: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 mb-6">
        <NavButton
          to="/well-analytics/monitoring"
          icon={Activity}
          isActive={currentPath.includes('/monitoring')}
        >
          Real-Time Monitoring
        </NavButton>
        <NavButton
          to="/well-analytics/performance"
          icon={TrendingUp}
          isActive={currentPath.includes('/performance')}
        >
          Performance Analysis
        </NavButton>
        <NavButton
          to="/well-analytics/reports"
          icon={FileText}
          isActive={currentPath.includes('/reports')}
        >
          Reports
        </NavButton>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        <Routes>
          <Route path="monitoring" element={<RealTimeMonitoring />} />
          <Route path="performance" element={<PerformanceAnalysis />} />
          <Route path="reports" element={<WellReports />} />
          <Route index element={<RealTimeMonitoring />} />
        </Routes>
      </div>
    </div>
  );
}
