import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowUp, ArrowDown, Clock, Users, Activity, Droplet, Gauge, Wrench } from 'lucide-react';
import StatsCards from '../components/dashboard/StatsCards';
import DepthChart from '../components/dashboard/DepthChart';
import OperationsTable from '../components/dashboard/OperationsTable';

const Dashboard = () => {
  // Utility function for number formatting
  const formatNumber = (value) => {
    return Number(value).toFixed(2);
  };

  // This would come from your API/backend
  const dashboardData = {
    currentDepth: {
      value: 13267,
      unit: 'ft',
      change: 301.88, // From run footage
    },
    tvd: {
      value: 6981,
      unit: 'ft',
    },
    rop: {
      value: 76,
      unit: 'ft/hr',
      trend: 'up',
    },
    activeCrews: {
      value: 99,
      categories: {
        rig: 50,
        contractors: 49,
      },
    },
    mudProperties: {
      weight: 81.45,
      funnelVis: 53.23,
      pv: 23,
      yp: 28,
      ph: 9.6,
    },
    drillingParams: {
      wob: 24.22,
      rpm: 167.33,
      pressure: 3300,
      torque: 13200,
    },
    formations: [
      { name: 'SDCSC', depth: 4444, comment: "4444' MD (44' SHALLOWER)" }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Alert Section */}
      <Alert className="bg-yellow-50 border-yellow-200">
        <Activity className="h-4 w-4" />
        <AlertDescription>
          Current Operation: Drilling - {dashboardData.currentDepth.value}ft MD / {dashboardData.tvd.value}ft TVD
        </AlertDescription>
      </Alert>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Current Depth</p>
                <h3 className="text-2xl font-bold text-blue-600">
                  {formatNumber(dashboardData.currentDepth.value)} ft
                </h3>
                <p className="text-sm text-gray-600">TVD: {formatNumber(dashboardData.tvd.value)} ft</p>
              </div>
              {dashboardData.currentDepth.change > 0 ? (
                <ArrowUp className="h-8 w-8 text-green-500" />
              ) : (
                <ArrowDown className="h-8 w-8 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rate of Penetration</p>
                <h3 className="text-2xl font-bold text-green-600">
                  {formatNumber(dashboardData.rop.value)} ft/hr
                </h3>
                <p className="text-sm text-gray-600">Last 24hrs</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Crews</p>
                <h3 className="text-2xl font-bold text-purple-600">
                  {dashboardData.activeCrews.value}
                </h3>
                <p className="text-sm text-gray-600">
                  Rig: {dashboardData.activeCrews.categories.rig} | 
                  Contractors: {dashboardData.activeCrews.categories.contractors}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Time Analysis</p>
                <h3 className="text-2xl font-bold text-orange-600">24 hrs</h3>
                <p className="text-sm text-gray-600">Operating Time</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="drilling" className="w-full">
        <TabsList>
          <TabsTrigger value="drilling">Drilling Parameters</TabsTrigger>
          <TabsTrigger value="mud">Mud Properties</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="drilling" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Weight on Bit</p>
                    <p className="text-2xl font-semibold">
                      {formatNumber(dashboardData.drillingParams.wob)} klbs
                    </p>
                  </div>
                  <Gauge className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">RPM</p>
                    <p className="text-2xl font-semibold">
                      {formatNumber(dashboardData.drillingParams.rpm)}
                    </p>
                  </div>
                  <Wrench className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Pressure</p>
                    <p className="text-2xl font-semibold">
                      {formatNumber(dashboardData.drillingParams.pressure)} psi
                    </p>
                  </div>
                  <Gauge className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Torque</p>
                    <p className="text-2xl font-semibold">
                      {formatNumber(dashboardData.drillingParams.torque)} ft-lbs
                    </p>
                  </div>
                  <Wrench className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Depth vs Time Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <DepthChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mud" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Mud Weight</p>
                    <p className="text-2xl font-semibold">
                      {formatNumber(dashboardData.mudProperties.weight)} pcf
                    </p>
                  </div>
                  <Droplet className="h-6 w-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Funnel Viscosity</p>
                    <p className="text-2xl font-semibold">
                      {formatNumber(dashboardData.mudProperties.funnelVis)} sec
                    </p>
                  </div>
                  <Droplet className="h-6 w-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">PV</p>
                    <p className="text-2xl font-semibold">
                      {formatNumber(dashboardData.mudProperties.pv)}
                    </p>
                  </div>
                  <Droplet className="h-6 w-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">YP</p>
                    <p className="text-2xl font-semibold">
                      {formatNumber(dashboardData.mudProperties.yp)}
                    </p>
                  </div>
                  <Droplet className="h-6 w-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">pH</p>
                    <p className="text-2xl font-semibold">
                      {formatNumber(dashboardData.mudProperties.ph)}
                    </p>
                  </div>
                  <Droplet className="h-6 w-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations">
          <Card>
            <CardHeader>
              <CardTitle>Current Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <OperationsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;