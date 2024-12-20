import React from 'react';

export default function Analysis() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Average ROP</h3>
              <p className="text-2xl font-bold text-blue-600">82.5 ft/hr</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Depth</h3>
              <p className="text-2xl font-bold text-green-600">15,750 ft</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p className="text-sm text-gray-600">Drilling operation completed at section A</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <p className="text-sm text-gray-600">New drilling phase started at section B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
