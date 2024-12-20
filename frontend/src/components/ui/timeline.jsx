import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Activity, AlertCircle } from 'lucide-react';

const Timeline = ({ data }) => {
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      inProgress: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.inProgress;
  };

  const getTimelineIcon = (activity) => {
    const icons = {
      'Drilling Operations': Activity,
      'Tripping': Clock,
      'Connections': AlertCircle,
      'Maintenance': AlertCircle
    };
    return icons[activity] || Activity;
  };

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([category, details], index) => (
        <Card key={index} className="p-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {React.createElement(getTimelineIcon(category), {
                className: 'w-5 h-5 text-blue-600'
              })}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{category}</h4>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  details.trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {details.trend > 0 ? '+' : ''}{details.trend}%
                </span>
              </div>
              <div className="mt-1 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Duration</p>
                  <p className="font-medium">{details.duration} hrs</p>
                </div>
                <div>
                  <p className="text-gray-600">Cost Impact</p>
                  <p className="font-medium">${details.costImpact.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Percentage</p>
                  <p className="font-medium">{details.percentage}%</p>
                </div>
              </div>
              {details.subActivities && details.subActivities.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium text-gray-600">Sub Activities</p>
                  <div className="space-y-1">
                    {details.subActivities.map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span>{activity.name}</span>
                        <span className="font-medium">{activity.duration} hrs</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Timeline;
