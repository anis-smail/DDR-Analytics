import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { ChevronUp, ChevronDown, Timer, ArrowRight, Target, Calendar, Ruler, HardDrive, Zap, Settings, AlertCircle } from 'lucide-react';

// Utility function to generate future timestamps
const generateTimestamps = (startHours = 0, count = 24) => {
  const timestamps = [];
  for (let i = startHours; i < startHours + count; i++) {
    timestamps.push(`T+${i}h`);
  }
  return timestamps;
};

// Generate sample ROP prediction data
const generateROPPredictions = (count = 24) => {
  const baseROP = 75;
  return generateTimestamps(0, count).map((time) => ({
    time,
    predicted: baseROP + Math.random() * 20 - 10,
    upperBound: baseROP + 15 + Math.random() * 5,
    lowerBound: baseROP - 15 - Math.random() * 5,
    confidence: 85 + Math.random() * 10,
  }));
};

// Generate sample formation prediction data
const generateFormationPredictions = () => {
  const formations = [
    { name: 'Sandstone', probability: 0.75, expectedDepth: 14250 },
    { name: 'Limestone', probability: 0.15, expectedDepth: 14500 },
    { name: 'Shale', probability: 0.10, expectedDepth: 14750 }
  ];
  
  return formations.map(formation => ({
    ...formation,
    estimatedTVD: formation.expectedDepth + Math.random() * 100 - 50,
    confidence: formation.probability * 100,
    predictedProperties: {
      porosity: 0.15 + Math.random() * 0.1,
      permeability: 100 + Math.random() * 50,
      density: 2.5 + Math.random() * 0.3
    }
  }));
};

// Generate sample parameter optimization data
const generateParameterOptimizations = () => {
  return {
    wob: {
      current: 22,
      recommended: 24,
      range: [20, 26],
      impact: { rop: +8.5, cost: -5.2 }
    },
    rpm: {
      current: 165,
      recommended: 175,
      range: [160, 180],
      impact: { rop: +5.2, cost: -3.1 }
    },
    flowRate: {
      current: 265,
      recommended: 285,
      range: [250, 300],
      impact: { rop: +4.1, cost: -2.8 }
    },
    torque: {
      current: 13200,
      recommended: 13800,
      range: [12000, 14000],
      impact: { rop: +6.3, cost: -4.5 }
    }
  };
};

// Generate completion predictions
const generateCompletionPredictions = () => {
  return {
    timeToTarget: {
      hours: 168,
      confidence: 85,
      range: [156, 180]
    },
    costProjection: {
      baseline: 1250000,
      optimized: 1150000,
      savings: 100000,
      confidence: 82
    },
    milestones: [
      { depth: 14250, description: 'Formation Change', eta: 48 },
      { depth: 14500, description: 'Casing Point', eta: 96 },
      { depth: 14750, description: 'Target Depth', eta: 168 }
    ]
  };
};

// Generate sample risk analysis data
const generateRiskAnalysis = () => {
  return {
    overallRiskScore: 68,
    riskTrend: -5,
    riskCategories: [
      {
        category: 'Mechanical',
        probability: 0.35,
        impact: 0.7,
        subFactors: [
          { name: 'Equipment Failure', score: 65, trend: 2 },
          { name: 'Tool Wear', score: 45, trend: -3 },
          { name: 'BHA Integrity', score: 72, trend: 0 }
        ]
      },
      {
        category: 'Geological',
        probability: 0.25,
        impact: 0.8,
        subFactors: [
          { name: 'Formation Uncertainty', score: 58, trend: -2 },
          { name: 'Pressure Regime', score: 62, trend: 1 },
          { name: 'Rock Properties', score: 55, trend: -1 }
        ]
      },
      {
        category: 'Operational',
        probability: 0.4,
        impact: 0.6,
        subFactors: [
          { name: 'Parameter Control', score: 75, trend: -4 },
          { name: 'Connection Time', score: 42, trend: 2 },
          { name: 'Crew Performance', score: 82, trend: 1 }
        ]
      }
    ],
    timeBasedRisk: [
      { time: 'T+0', mechanical: 65, geological: 58, operational: 75 },
      { time: 'T+4', mechanical: 68, geological: 56, operational: 72 },
      { time: 'T+8', mechanical: 70, geological: 59, operational: 69 },
      { time: 'T+12', mechanical: 67, geological: 61, operational: 71 },
      { time: 'T+16', mechanical: 65, geological: 60, operational: 73 },
      { time: 'T+20', mechanical: 69, geological: 57, operational: 74 },
      { time: 'T+24', mechanical: 66, geological: 58, operational: 70 }
    ]
  };
};

const PredictiveAnalytics = ({ defaultTab = 'overview' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [predictionHorizon, setPredictionHorizon] = useState('24');
  const [confidenceThreshold, setConfidenceThreshold] = useState('80');
  const [riskAnalysis, setRiskAnalysis] = useState(generateRiskAnalysis());

  // Sample data states
  const [ropPredictions, setRopPredictions] = useState(generateROPPredictions());
  const [formationPredictions, setFormationPredictions] = useState(generateFormationPredictions());
  const [parameterOptimizations, setParameterOptimizations] = useState(generateParameterOptimizations());
  const [completionPredictions, setCompletionPredictions] = useState(generateCompletionPredictions());

  // Effect to update predictions when horizon changes
  useEffect(() => {
    setRopPredictions(generateROPPredictions(parseInt(predictionHorizon)));
  }, [predictionHorizon]);

  // Effect to set initial tab based on route
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Handle tab changes
  const handleTabChange = (value) => {
    setActiveTab(value);
    const basePath = '/drilling-intelligence/predictive-analytics';
    const paths = {
      'overview': '/dashboard',
      'parameters': '/parameters',
      'formations': '/formations',
      'completion': '/completion',
      'risk': '/risk'
    };
    navigate(`${basePath}${paths[value]}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Drilling Predictive Analytics</h2>
        <div className="flex space-x-4">
          <Select value={predictionHorizon} onValueChange={setPredictionHorizon}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Prediction Horizon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">Next 12 Hours</SelectItem>
              <SelectItem value="24">Next 24 Hours</SelectItem>
              <SelectItem value="48">Next 48 Hours</SelectItem>
              <SelectItem value="72">Next 72 Hours</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={confidenceThreshold} onValueChange={setConfidenceThreshold}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Confidence Threshold" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="70">70% Confidence</SelectItem>
              <SelectItem value="80">80% Confidence</SelectItem>
              <SelectItem value="90">90% Confidence</SelectItem>
              <SelectItem value="95">95% Confidence</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="parameters">Parameter Optimization</TabsTrigger>
          <TabsTrigger value="formations">Formation Predictions</TabsTrigger>
          <TabsTrigger value="completion">Completion Forecasts</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Predicted ROP"
              value={ropPredictions[0]?.predicted.toFixed(1)}
              unit="ft/hr"
              trend={5.2}
              icon={<Timer className="w-5 h-5" />}
            />
            <MetricCard
              title="Next Formation"
              value={formationPredictions[0]?.name}
              unit={`${formationPredictions[0]?.confidence.toFixed(1)}% conf.`}
              depth={`${formationPredictions[0]?.expectedDepth} ft`}
              icon={<Ruler className="w-5 h-5" />}
            />
            <MetricCard
              title="Time to Target"
              value={completionPredictions.timeToTarget.hours}
              unit="hours"
              range={`${completionPredictions.timeToTarget.range[0]}-${completionPredictions.timeToTarget.range[1]}`}
              icon={<Target className="w-5 h-5" />}
            />
            <MetricCard
              title="Potential Savings"
              value={completionPredictions.costProjection.savings.toLocaleString()}
              unit="USD"
              confidence={completionPredictions.costProjection.confidence}
              icon={<Zap className="w-5 h-5" />}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>ROP Prediction Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ropPredictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="upperBound"
                      stroke="transparent"
                      fill="#4F46E5"
                      fillOpacity={0.1}
                    />
                    <Area
                      type="monotone"
                      dataKey="lowerBound"
                      stroke="transparent"
                      fill="#4F46E5"
                      fillOpacity={0.1}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parameter Optimization Tab */}
        <TabsContent value="parameters" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Parameter Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ParameterOptimizationCard
                    title="Weight on Bit"
                    current={parameterOptimizations.wob.current}
                    recommended={parameterOptimizations.wob.recommended}
                    unit="klbs"
                    range={parameterOptimizations.wob.range}
                    impact={parameterOptimizations.wob.impact}
                  />
                  <ParameterOptimizationCard
                    title="RPM"
                    current={parameterOptimizations.rpm.current}
                    recommended={parameterOptimizations.rpm.recommended}
                    unit="rpm"
                    range={parameterOptimizations.rpm.range}
                    impact={parameterOptimizations.rpm.impact}
                  />
                  <ParameterOptimizationCard
                    title="Flow Rate"
                    current={parameterOptimizations.flowRate.current}
                    recommended={parameterOptimizations.flowRate.recommended}
                    unit="gpm"
                    range={parameterOptimizations.flowRate.range}
                    impact={parameterOptimizations.flowRate.impact}
                  />
                  <ParameterOptimizationCard
                    title="Torque"
                    current={parameterOptimizations.torque.current}
                    recommended={parameterOptimizations.torque.recommended}
                    unit="ft-lbs"
                    range={parameterOptimizations.torque.range}
                    impact={parameterOptimizations.torque.impact}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expected Performance Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={[
                      { parameter: 'WOB', rop: 8.5, cost: 5.2 },
                      { parameter: 'RPM', rop: 5.2, cost: 3.1 },
                      { parameter: 'Flow', rop: 4.1, cost: 2.8 },
                      { parameter: 'Torque', rop: 6.3, cost: 4.5 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="parameter" />
                      <YAxis yAxisId="left" orientation="left" label={{ value: 'ROP Improvement %', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'Cost Reduction %', angle: 90, position: 'insideRight' }} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="rop" fill="#4F46E5" name="ROP Improvement" />
                      <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#10B981" name="Cost Reduction" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Formation Predictions Tab */}
        <TabsContent value="formations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Predicted Formation Sequence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formationPredictions.map((formation, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{formation.name}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {formation.confidence.toFixed(1)}% confidence
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Expected Depth</p>
                          <p className="font-medium">{formation.expectedDepth} ft MD</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Estimated TVD</p>
                          <p className="font-medium">{formation.estimatedTVD.toFixed(1)} ft</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formation Properties Prediction</CardTitle>
              </CardHeader>
              <CardContent><div className="space-y-4">
                  {formationPredictions.map((formation, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-3">{formation.name} Properties</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Porosity</p>
                          <p className="font-medium">
                            {(formation.predictedProperties.porosity * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Permeability</p>
                          <p className="font-medium">
                            {formation.predictedProperties.permeability.toFixed(1)} mD
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Density</p>
                          <p className="font-medium">
                            {formation.predictedProperties.density.toFixed(2)} g/cc
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Formation Transition Probability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { depth: 14000, sandstone: 0.8, limestone: 0.15, shale: 0.05 },
                      { depth: 14250, sandstone: 0.6, limestone: 0.3, shale: 0.1 },
                      { depth: 14500, sandstone: 0.3, limestone: 0.5, shale: 0.2 },
                      { depth: 14750, sandstone: 0.1, limestone: 0.3, shale: 0.6 },
                      { depth: 15000, sandstone: 0.05, limestone: 0.15, shale: 0.8 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="depth" label={{ value: 'Depth (ft)', position: 'bottom' }} />
                    <YAxis label={{ value: 'Probability', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="sandstone"
                      stackId="1"
                      stroke="#FCD34D"
                      fill="#FCD34D"
                      name="Sandstone"
                    />
                    <Area
                      type="monotone"
                      dataKey="limestone"
                      stackId="1"
                      stroke="#60A5FA"
                      fill="#60A5FA"
                      name="Limestone"
                    />
                    <Area
                      type="monotone"
                      dataKey="shale"
                      stackId="1"
                      stroke="#4B5563"
                      fill="#4B5563"
                      name="Shale"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completion Forecasts Tab */}
        <TabsContent value="completion" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Time to Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Expected Duration</p>
                      <p className="text-2xl font-bold">
                        {completionPredictions.timeToTarget.hours} hrs
                      </p>
                    </div>
                    <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center">
                      <Timer className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Confidence Range</p>
                    <div className="bg-gray-100 rounded-lg p-2">
                      <p className="text-sm">
                        {completionPredictions.timeToTarget.range[0]} - {completionPredictions.timeToTarget.range[1]} hours
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Optimized Cost</p>
                      <p className="text-2xl font-bold">
                        ${completionPredictions.costProjection.optimized.toLocaleString()}
                      </p>
                    </div>
                    <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center">
                      <Zap className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Baseline Cost</span>
                      <span>${completionPredictions.costProjection.baseline.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Potential Savings</span>
                      <span className="text-green-600">
                        ${completionPredictions.costProjection.savings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Confidence Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Time Prediction', value: completionPredictions.timeToTarget.confidence },
                    { label: 'Cost Projection', value: completionPredictions.costProjection.confidence },
                    { label: 'Formation Prediction', value: formationPredictions[0].confidence }
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{metric.label}</span>
                        <span className="text-sm font-medium">{metric.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Milestone Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {completionPredictions.milestones.map((milestone, index) => (
                    <div key={index} className="relative flex items-center">
                      <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600" />
                      <div className="ml-16 bg-white p-4 rounded-lg shadow-sm border w-full">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{milestone.description}</h4>
                            <p className="text-sm text-gray-600">Depth: {milestone.depth} ft</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">ETA</p>
                            <p className="text-sm text-gray-600">T+{milestone.eta} hrs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Overall Risk Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">{riskAnalysis.overallRiskScore}</p>
                    <p className="text-sm text-gray-600">Risk Level</p>
                  </div>
                  <div className={`flex items-center ${
                    riskAnalysis.riskTrend < 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {riskAnalysis.riskTrend < 0 ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronUp className="w-4 h-4" />
                    }
                    <span>{Math.abs(riskAnalysis.riskTrend)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {riskAnalysis.riskCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.category} Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Probability</p>
                        <p className="font-medium">{(category.probability * 100).toFixed(0)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Impact</p>
                        <p className="font-medium">{(category.impact * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {category.subFactors.map((factor, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-sm">{factor.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{factor.score}</span>
                            <span className={`text-sm ${
                              factor.trend < 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {factor.trend > 0 ? '+' : ''}{factor.trend}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskAnalysis.timeBasedRisk}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="mechanical" 
                      stroke="#EF4444" 
                      name="Mechanical Risk"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="geological" 
                      stroke="#F59E0B" 
                      name="Geological Risk"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="operational" 
                      stroke="#3B82F6" 
                      name="Operational Risk"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Utility Components
const MetricCard = ({ title, value, unit, trend, icon, depth, range, confidence }) => (
  <Card className="p-4">
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-lg bg-blue-50">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-bold">{value}</p>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend > 0 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {Math.abs(trend)}%
          </div>
        )}
        {depth && <p className="text-sm text-gray-600">At {depth}</p>}
        {range && <p className="text-sm text-gray-600">Range: {range}</p>}
        {confidence && <p className="text-sm text-gray-600">{confidence}% confidence</p>}
      </div>
    </div>
  </Card>
);

const ParameterOptimizationCard = ({ title, current, recommended, unit, range, impact }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex justify-between items-center mb-3">
      <h4 className="font-medium">{title}</h4>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Current:</span>
        <span className="font-medium">{current} {unit}</span>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Recommended</p>
          <p className="font-medium">{recommended} {unit}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Range</p>
          <p className="text-sm">{range[0]} - {range[1]} {unit}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-green-50 rounded">
          <p className="text-xs text-green-600">ROP Impact</p>
          <p className="font-medium text-green-700">+{impact.rop}%</p>
        </div>
        <div className="p-2 bg-blue-50 rounded">
          <p className="text-xs text-blue-600">Cost Impact</p>
          <p className="font-medium text-blue-700">{impact.cost}%</p>
        </div>
      </div>
    </div>
  </div>
);

export default PredictiveAnalytics;