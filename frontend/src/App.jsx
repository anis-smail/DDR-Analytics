import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Analysis from './pages/Analysis';
import Settings from './pages/Settings';
import WellAnalytics from './pages/WellAnalytics';
import OperationsHub from './pages/OperationsHub';
import PredictiveAnalytics from './components/intelligence/PredictiveAnalytics';
import RealTimeMonitoring from './components/monitoring/RealTimeMonitoring';
import PerformanceAnalysis from './components/analytics/PerformanceAnalysis';
import EquipmentResources from '@/components/equipment/EquipmentResources';
import ReportingSuite from '@/components/reporting/ReportingSuite';
import SystemControl from '@/components/system/SystemControl';
import UserProfile from '@/components/user/UserProfile';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/well-analytics">
              <Route path="monitoring" element={<RealTimeMonitoring />} />
              <Route path="performance" element={<PerformanceAnalysis />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            <Route path="/operations-hub" element={<OperationsHub />} />
            <Route path="/drilling-intelligence">
              <Route path="predictive-analytics">
                <Route index element={<PredictiveAnalytics defaultTab="overview" />} />
                <Route path="dashboard" element={<PredictiveAnalytics defaultTab="overview" />} />
                <Route path="parameters" element={<PredictiveAnalytics defaultTab="parameters" />} />
                <Route path="formations" element={<PredictiveAnalytics defaultTab="formations" />} />
                <Route path="completion" element={<PredictiveAnalytics defaultTab="completion" />} />
                <Route path="risk" element={<PredictiveAnalytics defaultTab="risk" />} />
              </Route>
            </Route>
            <Route path="/equipment">
              <Route index element={<Navigate to="/equipment/status" replace />} />
              <Route path="status" element={<EquipmentResources defaultTab="status" />} />
              <Route path="maintenance" element={<EquipmentResources defaultTab="maintenance" />} />
              <Route path="planning" element={<EquipmentResources defaultTab="planning" />} />
            </Route>
            <Route path="/reporting">
              <Route index element={<Navigate to="/reporting/daily" replace />} />
              <Route path="daily" element={<ReportingSuite defaultTab="daily" />} />
              <Route path="analytics" element={<ReportingSuite defaultTab="analytics" />} />
              <Route path="notifications" element={<ReportingSuite defaultTab="notifications" />} />
            </Route>
            <Route path="/system">
              <Route index element={<Navigate to="/system/settings" replace />} />
              <Route path="settings" element={<SystemControl defaultTab="settings" />} />
              <Route path="monitoring" element={<SystemControl defaultTab="monitoring" />} />
              <Route path="database" element={<SystemControl defaultTab="database" />} />
            </Route>
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}