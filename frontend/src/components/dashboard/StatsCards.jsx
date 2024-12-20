import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Drill,
  Timer,
  Users,
  Activity,
  Droplet,
  Gauge,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Check,
  Clock,
  Ruler,
  Container,
  Thermometer,
  ArrowRight
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, subtitle, color = "blue", progress }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-center space-x-2">
            <h3 className={`text-2xl font-bold text-${color}-600`}>
              {value}
            </h3>
            {trend && (
              <span className={`flex items-center text-sm ${
                trend > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {trend > 0 ? 
                  <ArrowUp className="h-4 w-4" /> : 
                  <ArrowDown className="h-4 w-4" />
                }
                {Math.abs(trend)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
          {progress !== undefined && (
            <div className="mt-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">{progress}% of target</p>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`h-6 w-6 text-${color}-500`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatsCards = () => {
  // This would come from your API/context
  const stats = {
    drilling: {
      currentDepth: 13267,
      lastDepth: 13000,
      tvd: 6981,
      rop: 76.2,
      wob: 22,
      rpm: 165,
      pressure: 3300,
      torque: 13200,
      drillingHours: 18.5,
    },
    mud: {
      weight: 81,
      funnelVis: 53,
      pv: 23,
      yp: 28,
      ph: 9.6,
      chlorides: 79000,
      solidsContent: 21,
    },
    crews: {
      total: 99,
      rigCrew: 50,
      contractors: 49,
      activeShift: 'Day',
    },
    equipment: {
      bitLife: 85,
      lastInspection: '2 days ago',
      topDrive: 'Operational',
      drawworks: 'Operational',
    },
    hse: {
      lastIncident: '452 days',
      tripsTaken: 24,
      permitsClosed: 12,
      activeSafetyAlerts: 2,
    }
  };

  return (
    <div className="space-y-6">
      {/* Drilling Metrics Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Drilling Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Current Depth"
            value={`${stats.drilling.currentDepth.toLocaleString()} ft`}
            icon={Ruler}
            subtitle={`TVD: ${stats.drilling.tvd.toLocaleString()} ft`}
            color="blue"
            trend={((stats.drilling.currentDepth - stats.drilling.lastDepth) / stats.drilling.lastDepth * 100).toFixed(1)}
          />
          <StatCard
            title="Rate of Penetration"
            value={`${stats.drilling.rop} ft/hr`}
            icon={Activity}
            color="green"
            progress={75}
          />
          <StatCard
            title="Drilling Hours"
            value={`${stats.drilling.drillingHours}hrs`}
            icon={Clock}
            color="orange"
            subtitle="Last 24 hours"
            progress={(stats.drilling.drillingHours/24*100).toFixed(0)}
          />
          <StatCard
            title="Weight on Bit"
            value={`${stats.drilling.wob} klbs`}
            icon={Gauge}
            color="purple"
            progress={65}
          />
        </div>
      </div>

      {/* Mud Properties Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Mud Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Mud Weight"
            value={`${stats.mud.weight} pcf`}
            icon={Container}
            color="cyan"
            progress={90}
          />
          <StatCard
            title="Funnel Viscosity"
            value={`${stats.mud.funnelVis} sec`}
            icon={Timer}
            color="teal"
          />
          <StatCard
            title="Chlorides"
            value={`${stats.mud.chlorides} ppm`}
            icon={Droplet}
            color="blue"
            progress={85}
          />
          <StatCard
            title="Solids Content"
            value={`${stats.mud.solidsContent}%`}
            icon={Container}
            color="indigo"
            progress={stats.mud.solidsContent}
          />
        </div>
      </div>

      {/* Personnel & Safety Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Personnel & Safety</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Crews"
            value={stats.crews.total}
            icon={Users}
            subtitle={`Rig: ${stats.crews.rigCrew} | Contractors: ${stats.crews.contractors}`}
            color="violet"
          />
          <StatCard
            title="Days Since LTI"
            value={stats.hse.lastIncident}
            icon={AlertTriangle}
            color="emerald"
            progress={90}
          />
          <StatCard
            title="Active Permits"
            value={stats.hse.permitsClosed}
            icon={Check}
            color="rose"
            progress={75}
          />
          <StatCard
            title="Safety Alerts"
            value={stats.hse.activeSafetyAlerts}
            icon={AlertTriangle}
            color="red"
            subtitle="Active Alerts"
          />
        </div>
      </div>

      {/* Equipment Status Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Equipment Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Bit Life"
            value={`${stats.equipment.bitLife}%`}
            icon={Drill}
            color="amber"
            progress={stats.equipment.bitLife}
          />
          <StatCard
            title="Top Drive"
            value={stats.equipment.topDrive}
            icon={ArrowRight}
            color="lime"
            subtitle={`Last Check: ${stats.equipment.lastInspection}`}
          />
          <StatCard
            title="Drawworks"
            value={stats.equipment.drawworks}
            icon={Activity}
            color="green"
            subtitle={`Last Check: ${stats.equipment.lastInspection}`}
          />
          <StatCard
            title="Temperature"
            value="185°F"
            icon={Thermometer}
            color="orange"
            progress={70}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;