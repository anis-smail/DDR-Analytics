import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Users, Clock, Target } from 'lucide-react';

const MetricCard = ({ title, value, unit, trend, trendValue, icon: Icon, color }) => (
  <Card className="relative overflow-hidden">
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-end mt-1">
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
          </div>
          {trend && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm ml-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
    {/* Decorative gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 pointer-events-none" />
  </Card>
);

export default function OperationalMetrics({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard
        title="Current Depth"
        value={metrics.currentDepth.toLocaleString()}
        unit="ft"
        trend="down"
        trendValue="Last: 13,255 ft"
        icon={Target}
        color="bg-blue-600"
      />
      <MetricCard
        title="Rate of Penetration"
        value={metrics.rop}
        unit="ft/hr"
        trend="up"
        trendValue="↑ 12% from avg"
        icon={ArrowUp}
        color="bg-green-600"
      />
      <MetricCard
        title="Active Crew"
        value={metrics.activeCrew}
        unit="personnel"
        icon={Users}
        color="bg-purple-600"
      />
      <MetricCard
        title="Time Analysis"
        value={metrics.timeAnalysis}
        unit="hrs"
        icon={Clock}
        color="bg-orange-600"
      />
    </div>
  );
}
