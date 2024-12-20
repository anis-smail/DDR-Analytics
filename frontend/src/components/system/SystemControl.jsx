import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Settings,
  Database,
  Activity,
  Save,
  RefreshCw,
  Shield,
  Server
} from 'lucide-react';

const SystemControl = ({ defaultTab = 'settings' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('/settings')) return 'settings';
    if (path.includes('/monitoring')) return 'monitoring';
    if (path.includes('/database')) return 'database';
    return defaultTab;
  });

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/settings')) setActiveTab('settings');
    if (path.includes('/monitoring')) setActiveTab('monitoring');
    if (path.includes('/database')) setActiveTab('database');
  }, [location.pathname]);

  // Database Configuration State
  const [dbConfig, setDbConfig] = useState({
    connectionMode: 'SQL Authentication',
    server: '',
    port: '',
    database: '',
    username: '',
    password: ''
  });

  // SMTP Configuration State
  const [smtpConfig, setSmtpConfig] = useState({
    server: '',
    port: '',
    username: '',
    password: '',
    security: 'TLS'
  });

  // File Storage Configuration State
  const [fileConfig, setFileConfig] = useState({
    location: ''
  });

  // System Monitoring State
  const [systemStatus, setSystemStatus] = useState({
    dbConnection: 'Connected',
    etlService: 'Running',
    fileStorage: 'Available',
    lastBackup: '2024-12-20 09:00 AM',
    activeUsers: 45,
    cpuUsage: 35,
    memoryUsage: 60,
    diskSpace: 75
  });

  const handleTabChange = (value) => {
    setActiveTab(value);
    navigate(`/system/${value}`);
  };

  const handleDatabaseSave = () => {
    console.log('Saving database configuration:', dbConfig);
    // Add API call to save configuration
  };

  const handleSMTPSave = () => {
    console.log('Saving SMTP configuration:', smtpConfig);
    // Add API call to save configuration
  };

  const handleFileConfigSave = () => {
    console.log('Saving file configuration:', fileConfig);
    // Add API call to save configuration
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Control</h1>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                MSSQL Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Connection Mode</label>
                  <Select 
                    value={dbConfig.connectionMode}
                    onValueChange={(value) => setDbConfig({...dbConfig, connectionMode: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select authentication mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SQL Authentication">SQL Authentication</SelectItem>
                      <SelectItem value="Windows Authentication">Windows Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Server</label>
                  <Input 
                    placeholder="Enter SQL server name"
                    value={dbConfig.server}
                    onChange={(e) => setDbConfig({...dbConfig, server: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Port</label>
                  <Input 
                    placeholder="Enter TCP/IP port"
                    value={dbConfig.port}
                    onChange={(e) => setDbConfig({...dbConfig, port: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Database</label>
                  <Input 
                    placeholder="Enter database name"
                    value={dbConfig.database}
                    onChange={(e) => setDbConfig({...dbConfig, database: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input 
                    placeholder="Enter username"
                    value={dbConfig.username}
                    onChange={(e) => setDbConfig({...dbConfig, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input 
                    type="password"
                    placeholder="Enter password"
                    value={dbConfig.password}
                    onChange={(e) => setDbConfig({...dbConfig, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Test</Button>
                <Button onClick={handleDatabaseSave}>Save</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                SMTP Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">SMTP Server</label>
                  <Input 
                    placeholder="Enter SMTP server name"
                    value={smtpConfig.server}
                    onChange={(e) => setSmtpConfig({...smtpConfig, server: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Port</label>
                  <Input 
                    placeholder="Enter TCP/IP port"
                    value={smtpConfig.port}
                    onChange={(e) => setSmtpConfig({...smtpConfig, port: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input 
                    placeholder="Enter username"
                    value={smtpConfig.username}
                    onChange={(e) => setSmtpConfig({...smtpConfig, username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input 
                    type="password"
                    placeholder="Enter password"
                    value={smtpConfig.password}
                    onChange={(e) => setSmtpConfig({...smtpConfig, password: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Security</label>
                  <Select 
                    value={smtpConfig.security}
                    onValueChange={(value) => setSmtpConfig({...smtpConfig, security: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select security type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TLS">TLS</SelectItem>
                      <SelectItem value="SSL">SSL</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Test</Button>
                <Button onClick={handleSMTPSave}>Save</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Save className="mr-2 h-5 w-5" />
                File Saving Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">File Save Directory</label>
                <Input 
                  placeholder="Enter file save directory or URL"
                  value={fileConfig.location}
                  onChange={(e) => setFileConfig({...fileConfig, location: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Test</Button>
                <Button onClick={handleFileConfigSave}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Database</p>
                    <p className="text-lg font-semibold text-green-600">{systemStatus.dbConnection}</p>
                  </div>
                  <Database className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">ETL Service</p>
                    <p className="text-lg font-semibold text-green-600">{systemStatus.etlService}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Users</p>
                    <p className="text-lg font-semibold">{systemStatus.activeUsers}</p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Backup</p>
                    <p className="text-lg font-semibold">{systemStatus.lastBackup}</p>
                  </div>
                  <RefreshCw className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>CPU Usage</span>
                    <span>{systemStatus.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${systemStatus.cpuUsage}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Memory Usage</span>
                    <span>{systemStatus.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${systemStatus.memoryUsage}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Disk Space</span>
                    <span>{systemStatus.diskSpace}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${systemStatus.diskSpace}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Tab */}
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Backup Database
                </Button>
                <Button variant="outline" className="w-full">
                  <Database className="mr-2 h-4 w-4" />
                  Optimize Tables
                </Button>
                <Button variant="outline" className="w-full">
                  <Activity className="mr-2 h-4 w-4" />
                  View Logs
                </Button>
                <Button variant="outline" className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  Manage Permissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemControl;
