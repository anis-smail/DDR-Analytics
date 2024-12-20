import React, { useState, useEffect } from 'react';
import OperationalMetrics from '@/components/dashboard/OperationalMetrics';
import DrillingParameters from '@/components/dashboard/DrillingParameters';
import DepthTimeChart from '@/components/dashboard/DepthTimeChart';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function OperationsHub() {
  const [currentOperation, setCurrentOperation] = useState({
    wellName: '132476 MD',
    rigName: '$98 H-T/G',
    status: 'Drilling',
    lastUpdate: new Date(),
  });

  const [metrics, setMetrics] = useState({
    currentDepth: 13267,
    rop: 76,
    activeCrew: 99,
    timeAnalysis: 24,
  });

  const [parameters, setParameters] = useState({
    wob: 22,
    rpm: 165,
    pressure: 3300,
    torque: 13200,
  });

  // Simulated depth-time data
  const [depthTimeData, setDepthTimeData] = useState([
    { time: '00:00', depth: 13250, rop: 45, formationTop: 13125 },
    { time: '02:00', depth: 13255, rop: 52, formationTop: 13125 },
    { time: '04:00', depth: 13258, rop: 48, formationTop: 13125 },
    { time: '06:00', depth: 13260, rop: 76, formationTop: 13125 },
    { time: '08:00', depth: 13262, rop: 65, formationTop: 13125 },
    { time: '10:00', depth: 13264, rop: 72, formationTop: 13125 },
    { time: '12:00', depth: 13265, rop: 68, formationTop: 13125 },
    { time: '14:00', depth: 13266, rop: 58, formationTop: 13125 },
    { time: '16:00', depth: 13267, rop: 76, formationTop: 13125 },
  ]);

  const [alerts, setAlerts] = useState([
    {
      type: 'success',
      message: 'Target formation reached at 13,125 ft',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      type: 'warning',
      message: 'Approaching maximum WOB limit',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
  ]);

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with small random variations
      setMetrics(prev => ({
        ...prev,
        currentDepth: prev.currentDepth + (Math.random() * 0.1),
        rop: Math.max(45, Math.min(85, prev.rop + (Math.random() - 0.5) * 5)),
      }));

      // Update parameters with small random variations
      setParameters(prev => ({
        ...prev,
        wob: Math.max(18, Math.min(25, prev.wob + (Math.random() - 0.5))),
        rpm: Math.max(150, Math.min(180, prev.rpm + (Math.random() - 0.5) * 2)),
      }));

      // Add new data point to depth-time chart
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                     now.getMinutes().toString().padStart(2, '0');
      
      setDepthTimeData(prev => {
        const newData = [...prev];
        if (newData.length > 50) newData.shift(); // Keep last 50 points
        newData.push({
          time: timeStr,
          depth: metrics.currentDepth,
          rop: metrics.rop,
          formationTop: 13125,
        });
        return newData;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [metrics.currentDepth, metrics.rop]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Current Operation Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Current Operation: {currentOperation.wellName} / {currentOperation.rigName}
            </h2>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {currentOperation.lastUpdate.toLocaleTimeString()}
          </div>
        </div>
        
        {/* Alerts Section */}
        <div className="mt-4 space-y-2">
          {alerts.map((alert, index) => (
            <Alert
              key={index}
              className={`${
                alert.type === 'success' ? 'bg-green-50 border-green-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center">
                {alert.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                )}
                <AlertDescription className="text-sm">
                  {alert.message}
                  <span className="ml-2 text-gray-500">
                    ({new Date(alert.timestamp).toLocaleTimeString()})
                  </span>
                </AlertDescription>
              </div>
            </Alert>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Operational Metrics */}
        <OperationalMetrics metrics={metrics} />

        {/* Drilling Parameters */}
        <DrillingParameters parameters={parameters} />

        {/* Depth vs Time Chart */}
        <DepthTimeChart data={depthTimeData} />
      </div>
    </div>
  );
}
