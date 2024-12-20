import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  Calendar,
  Users,
  Gauge,
  BarChart3
} from 'lucide-react';

// Sample data generators
const generateEquipmentStatus = () => ({
  totalEquipment: 42,
  activeEquipment: 35,
  maintenanceRequired: 4,
  criticalAlerts: 2,
  equipmentList: [
    {
      id: 1,
      name: 'Top Drive System',
      status: 'Operational',
      health: 92,
      lastMaintenance: '2024-11-15',
      nextMaintenance: '2024-12-25',
      alerts: []
    },
    {
      id: 2,
      name: 'Mud Pumps',
      status: 'Warning',
      health: 78,
      lastMaintenance: '2024-11-20',
      nextMaintenance: '2024-12-20',
      alerts: ['Pressure fluctuation detected']
    },
    {
      id: 3,
      name: 'Drawworks',
      status: 'Critical',
      health: 45,
      lastMaintenance: '2024-10-30',
      nextMaintenance: '2024-12-15',
      alerts: ['Brake wear critical', 'Motor temperature high']
    }
  ]
});

const generateMaintenanceSchedule = () => ({
  upcomingMaintenance: [
    {
      id: 1,
      equipment: 'Top Drive System',
      type: 'Preventive',
      date: '2024-12-25',
      duration: '4 hours',
      technician: 'John Smith',
      priority: 'Medium'
    },
    {
      id: 2,
      equipment: 'Mud Pumps',
      type: 'Corrective',
      date: '2024-12-20',
      duration: '6 hours',
      technician: 'Mike Johnson',
      priority: 'High'
    }
  ],
  maintenanceHistory: [
    {
      id: 3,
      equipment: 'Drawworks',
      type: 'Emergency',
      date: '2024-12-10',
      duration: '8 hours',
      technician: 'Sarah Wilson',
      status: 'Completed'
    }
  ]
});

const generateResourcePlanning = () => ({
  personnel: {
    total: 45,
    available: 38,
    onLeave: 4,
    training: 3
  },
  upcomingShifts: [
    {
      id: 1,
      shift: 'Morning',
      date: '2024-12-21',
      personnel: 15,
      supervisor: 'Robert Chen'
    },
    {
      id: 2,
      shift: 'Evening',
      date: '2024-12-21',
      personnel: 12,
      supervisor: 'Lisa Anderson'
    }
  ],
  resourceUtilization: {
    drilling: 85,
    maintenance: 65,
    logistics: 70
  }
});

const EquipmentResources = ({ defaultTab = 'status' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('/status')) return 'status';
    if (path.includes('/maintenance')) return 'maintenance';
    if (path.includes('/planning')) return 'planning';
    return defaultTab;
  });
  const [equipmentStatus, setEquipmentStatus] = useState(generateEquipmentStatus());
  const [maintenanceSchedule, setMaintenanceSchedule] = useState(generateMaintenanceSchedule());
  const [resourcePlanning, setResourcePlanning] = useState(generateResourcePlanning());

  const handleTabChange = (value) => {
    setActiveTab(value);
    const basePath = '/equipment';
    const paths = {
      'status': '/status',
      'maintenance': '/maintenance',
      'planning': '/planning'
    };
    navigate(`${basePath}${paths[value]}`);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/status')) setActiveTab('status');
    if (path.includes('/maintenance')) setActiveTab('maintenance');
    if (path.includes('/planning')) setActiveTab('planning');
  }, [location.pathname]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Equipment & Resources</h1>
        <div className="flex space-x-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Equipment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Equipment</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="maintenance">Under Maintenance</SelectItem>
              <SelectItem value="critical">Critical Status</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="status">Equipment Status</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="planning">Resource Planning</TabsTrigger>
        </TabsList>

        {/* Equipment Status Tab */}
        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Equipment</p>
                    <p className="text-2xl font-bold">{equipmentStatus.totalEquipment}</p>
                  </div>
                  <Gauge className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Equipment</p>
                    <p className="text-2xl font-bold text-green-600">{equipmentStatus.activeEquipment}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Maintenance Required</p>
                    <p className="text-2xl font-bold text-yellow-600">{equipmentStatus.maintenanceRequired}</p>
                  </div>
                  <Wrench className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Critical Alerts</p>
                    <p className="text-2xl font-bold text-red-600">{equipmentStatus.criticalAlerts}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {equipmentStatus.equipmentList.map((equipment) => (
              <Card key={equipment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">{equipment.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          equipment.status === 'Operational' ? 'bg-green-100 text-green-800' :
                          equipment.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {equipment.status}
                        </span>
                        <span className="text-sm text-gray-500">Health: {equipment.health}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Next Maintenance: {equipment.nextMaintenance}</p>
                      {equipment.alerts.length > 0 && (
                        <div className="mt-1">
                          {equipment.alerts.map((alert, index) => (
                            <p key={index} className="text-sm text-red-600">{alert}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceSchedule.upcomingMaintenance.map((maintenance) => (
                    <div key={maintenance.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{maintenance.equipment}</h4>
                        <p className="text-sm text-gray-500">{maintenance.type} • {maintenance.duration}</p>
                        <p className="text-sm text-gray-500">Technician: {maintenance.technician}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{maintenance.date}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          maintenance.priority === 'High' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {maintenance.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceSchedule.maintenanceHistory.map((maintenance) => (
                    <div key={maintenance.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{maintenance.equipment}</h4>
                        <p className="text-sm text-gray-500">{maintenance.type} • {maintenance.duration}</p>
                        <p className="text-sm text-gray-500">Technician: {maintenance.technician}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{maintenance.date}</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {maintenance.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resource Planning Tab */}
        <TabsContent value="planning" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Personnel</p>
                    <p className="text-2xl font-bold">{resourcePlanning.personnel.total}</p>
                    <p className="text-sm text-gray-500">Available: {resourcePlanning.personnel.available}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">On Leave</p>
                    <p className="text-2xl font-bold">{resourcePlanning.personnel.onLeave}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">In Training</p>
                    <p className="text-2xl font-bold">{resourcePlanning.personnel.training}</p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Shifts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resourcePlanning.upcomingShifts.map((shift) => (
                  <div key={shift.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{shift.shift} Shift</h4>
                      <p className="text-sm text-gray-500">Date: {shift.date}</p>
                      <p className="text-sm text-gray-500">Supervisor: {shift.supervisor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{shift.personnel}</p>
                      <p className="text-sm text-gray-500">Personnel</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Drilling Operations</span>
                    <span className="font-medium">{resourcePlanning.resourceUtilization.drilling}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${resourcePlanning.resourceUtilization.drilling}%` }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Maintenance Tasks</span>
                    <span className="font-medium">{resourcePlanning.resourceUtilization.maintenance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${resourcePlanning.resourceUtilization.maintenance}%` }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Logistics Support</span>
                    <span className="font-medium">{resourcePlanning.resourceUtilization.logistics}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${resourcePlanning.resourceUtilization.logistics}%` }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipmentResources;
