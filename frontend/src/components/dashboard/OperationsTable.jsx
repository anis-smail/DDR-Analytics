
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Clock,
  Activity,
  AlertTriangle,
  Check,
} from 'lucide-react';

const OperationsTable = () => {
  const [sortField, setSortField] = useState('startTime');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterPhase, setFilterPhase] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample operations data - In production, this would come from your API
  const operations = [
    {
      id: 1,
      startTime: '0500',
      endTime: '0900',
      duration: 4,
      phase: '6 1/8',
      activity: 'DRLG',
      subActivity: 'RIG',
      depthFrom: 13000,
      depthTo: 13267,
      company: 'RIG',
      details: 'Drilling ahead with normal parameters',
      status: 'completed',
      wob: 22,
      rpm: 165,
      rop: 76.2,
      mudFlow: 750,
      torque: 13200,
    },
    {
      id: 2,
      startTime: '0900',
      endTime: '1030',
      duration: 1.5,
      phase: '6 1/8',
      activity: 'CIRC',
      subActivity: 'MPMP',
      depthFrom: 13267,
      depthTo: 13267,
      company: 'RIG',
      details: 'Circulating for hole cleaning',
      status: 'completed',
      wob: 0,
      rpm: 0,
      rop: 0,
      mudFlow: 800,
      torque: 0,
    },
    // Add more sample operations...
  ];

  // Sorting function
  const sortOperations = (data) => {
    return [...data].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  };

  // Filtering function
  const filterOperations = (data) => {
    return data.filter(op => {
      const matchesPhase = filterPhase === 'all' || op.phase === filterPhase;
      const matchesSearch = searchQuery === '' || 
        Object.values(op).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesPhase && matchesSearch;
    });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-800',
      ongoing: 'bg-blue-100 text-blue-800',
      planned: 'bg-yellow-100 text-yellow-800',
      delayed: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sorted and filtered data
  const displayData = filterOperations(sortOperations(operations));

  // Calculate summary statistics
  const totalHours = displayData.reduce((sum, op) => sum + op.duration, 0);
  const averageROP = displayData.reduce((sum, op) => sum + op.rop, 0) / displayData.length;
  const totalFootage = displayData.reduce((sum, op) => op.depthTo - op.depthFrom, 0);

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Operations Log</CardTitle>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search operations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
            <Select value={filterPhase} onValueChange={setFilterPhase}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                <SelectItem value="6 1/8">6 1/8"</SelectItem>
                <SelectItem value="8 1/2">8 1/2"</SelectItem>
                <SelectItem value="12 1/4">12 1/4"</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Hours</p>
                  <p className="text-2xl font-bold">{totalHours.toFixed(1)}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Average ROP</p>
                  <p className="text-2xl font-bold">{averageROP.toFixed(1)} ft/hr</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Footage</p>
                  <p className="text-2xl font-bold">{totalFootage.toFixed(1)} ft</p>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operations Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('startTime')}
                >
                  Time
                  <SortIcon field="startTime" />
                </TableHead>
                <TableHead>Duration</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('phase')}
                >
                  Phase
                  <SortIcon field="phase" />
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('activity')}
                >
                  Activity
                  <SortIcon field="activity" />
                </TableHead>
                <TableHead>Depth (ft)</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Parameters</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((operation) => (
                <TableRow key={operation.id}>
                  <TableCell className="font-medium">
                    {operation.startTime} - {operation.endTime}
                  </TableCell>
                  <TableCell>{operation.duration}h</TableCell>
                  <TableCell>{operation.phase}"</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{operation.activity}</span>
                      <span className="text-sm text-gray-500">{operation.subActivity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{operation.depthFrom}</span>
                      <span className="text-sm text-gray-500">to {operation.depthTo}</span>
                    </div>
                  </TableCell>
                  <TableCell>{operation.company}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>WOB: {operation.wob} klbs</div>
                      <div>RPM: {operation.rpm}</div>
                      <div>ROP: {operation.rop} ft/hr</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={operation.status} />
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {operation.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer with legend */}
        <div className="mt-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-1" /> Completed
            </span>
            <span className="flex items-center">
              <Activity className="w-4 h-4 text-blue-500 mr-1" /> Ongoing
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 text-yellow-500 mr-1" /> Planned
            </span>
            <span className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-red-500 mr-1" /> Delayed
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OperationsTable;