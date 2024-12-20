import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Activity,
  TrendingUp,
  Settings,
  FileText,
  Users,
  AlertTriangle,
  Database,
  BarChart2,
  Layers,
  Wrench,
  Clock,
  Brain,
  ChevronRight,
  ChevronDown,
  Gauge,
  Droplet,
  Target,
  Cpu,
  LineChart,
  Shield,
  PieChart,
  ClipboardList,
  Bell,
  Cog
} from 'lucide-react';

const SubNavLink = ({ to, icon: Icon, children, badge, metric }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-0.5 rounded-md text-xs ${
          isActive ? 'bg-gray-800 text-blue-400' : 'text-gray-400 hover:text-gray-300'
        }`
      }
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Icon className="w-3 h-3 mr-2" />
          <span>{children}</span>
        </div>
        {badge && <span className={`px-1 ${badge.className}`}>{badge.text}</span>}
        {metric && <span className="text-[10px] text-gray-500">{metric}</span>}
      </div>
    </NavLink>
  );
};

export default function Sidebar() {
  const location = useLocation();
  const [openSections, setOpenSections] = useState(['wellAnalytics']);

  const toggleSection = (section) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const sections = {
    wellAnalytics: {
      title: 'Well Analytics',
      icon: Activity,
      items: [
        {
          name: 'Real-Time Monitoring',
          to: '/well-analytics/monitoring',
          icon: Droplet,
          badge: { text: 'Live', className: 'bg-green-500/20 text-green-400' },
          metric: '42'
        },
        {
          name: 'Performance Analysis',
          to: '/well-analytics/performance',
          icon: TrendingUp
        },
        {
          name: 'Reports',
          to: '/well-analytics/reports',
          icon: FileText
        }
      ]
    },
    drillingIntelligence: {
      title: 'Drilling Intelligence',
      icon: Brain,
      items: [
        {
          name: 'Overview',
          to: '/drilling-intelligence/predictive-analytics/dashboard',
          icon: Gauge
        },
        {
          name: 'Parameter Optimization',
          to: '/drilling-intelligence/predictive-analytics/parameters',
          icon: Settings,
          badge: { text: 'Beta', className: 'bg-purple-500/20 text-purple-400' }
        },
        {
          name: 'Formation Predictions',
          to: '/drilling-intelligence/predictive-analytics/formations',
          icon: Layers
        },
        {
          name: 'Completion Forecasts',
          to: '/drilling-intelligence/predictive-analytics/completion',
          icon: Target
        },
        {
          name: 'Risk Analysis',
          to: '/drilling-intelligence/predictive-analytics/risk',
          icon: AlertTriangle
        }
      ]
    },
    equipment: {
      title: 'Equipment & Resources',
      icon: Wrench,
      items: [
        {
          name: 'Equipment Status',
          to: '/equipment/status',
          icon: Gauge
        },
        {
          name: 'Maintenance',
          to: '/equipment/maintenance',
          icon: Wrench
        },
        {
          name: 'Resource Planning',
          to: '/equipment/planning',
          icon: PieChart
        }
      ]
    },
    reporting: {
      title: 'Reporting Suite',
      icon: FileText,
      items: [
        {
          name: 'Daily Reports',
          to: '/reporting/daily',
          icon: ClipboardList
        },
        {
          name: 'Analytics',
          to: '/reporting/analytics',
          icon: BarChart2
        },
        {
          name: 'Notifications',
          to: '/reporting/notifications',
          icon: Bell
        }
      ]
    },
    system: {
      title: 'System Control',
      icon: Settings,
      items: [
        {
          name: 'Settings',
          to: '/system/settings',
          icon: Cog
        },
        {
          name: 'Monitoring',
          to: '/system/monitoring',
          icon: Activity
        },
        {
          name: 'Database',
          to: '/system/database',
          icon: Database
        }
      ]
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Brand */}
      <div className="p-2 bg-blue-900">
        <h1 className="text-lg font-bold">DrillFlow Pro</h1>
        <p className="text-xs text-blue-300">Advanced Well Analytics</p>
      </div>

      {/* System Status */}
      <div className="bg-gray-800/50 p-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">System Operational</span>
          </div>
          <span className="text-xs text-gray-400">1:31:04 PM</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Active: 29</span>
          </div>
          <div className="flex items-center space-x-1">
            <Gauge className="w-3 h-3" />
            <span className="text-green-400">98.8%</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
        {/* Operations Hub */}
        <NavLink
          to="/operations-hub"
          className={({ isActive }) =>
            `flex items-center px-3 py-1 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <Home className="w-3.5 h-3.5 mr-2" />
          <div className="flex-1">Operations Hub</div>
          {location.pathname === '/operations-hub' && (
            <span className="text-xs bg-green-500/20 text-green-400 px-1 rounded">Live</span>
          )}
        </NavLink>

        {/* Sections */}
        {Object.entries(sections).map(([key, section]) => (
          <div key={key} className="space-y-0.5">
            <button
              onClick={() => toggleSection(key)}
              className={`w-full flex items-center justify-between px-3 py-1 rounded-lg transition-colors ${
                location.pathname.includes(key) ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center">
                <section.icon className="w-3.5 h-3.5 mr-2" />
                <span>{section.title}</span>
              </div>
              {openSections.includes(key) ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
            
            {openSections.includes(key) && (
              <div className="pl-4 space-y-0.5">
                {section.items.map((item) => (
                  <SubNavLink
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    badge={item.badge}
                    metric={item.metric}
                  >
                    {item.name}
                  </SubNavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer Status */}
      <div className="p-2 bg-gray-800/50 text-xs">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Uptime: 99.9%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Database className="w-3 h-3" />
            <span>DB: Healthy</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-yellow-400">
          <AlertTriangle className="w-3 h-3" />
          <span>2 Active Alerts</span>
        </div>
      </div>
    </div>
  );
}
