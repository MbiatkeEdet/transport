// app/analytics/page.js
'use client'
import { useState } from 'react'
import { 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign, 
  Clock,
  Download,
  Calendar,
  BarChart3,
  MapPin
} from 'lucide-react'

export default function Analytics() {
  const [dateRange, setDateRange] = useState('7d')
  const [activeChart, setActiveChart] = useState('orders')

  const kpiData = {
    totalOrders: { value: '1,234', change: '+12%', trend: 'up' },
    completionRate: { value: '94.5%', change: '+2.1%', trend: 'up' },
    avgDeliveryTime: { value: '28 min', change: '-5%', trend: 'down' },
    revenue: { value: '$12,456', change: '+8.3%', trend: 'up' },
    activeRiders: { value: '45', change: '+5%', trend: 'up' },
    customerSatisfaction: { value: '4.8/5', change: '+0.2', trend: 'up' }
  }

  const topRiders = [
    { name: 'John Doe', deliveries: 45, rating: 4.9, earnings: '$1,245' },
    { name: 'Jane Smith', deliveries: 38, rating: 4.8, earnings: '$1,120' },
    { name: 'Mike Johnson', deliveries: 42, rating: 4.7, earnings: '$1,180' },
    { name: 'Sarah Wilson', deliveries: 35, rating: 4.9, earnings: '$980' }
  ]

  const areaPerformance = [
    { area: 'Downtown', orders: 345, completion: 96, avgTime: '26 min' },
    { area: 'Brooklyn', orders: 289, completion: 94, avgTime: '29 min' },
    { area: 'Queens', orders: 267, completion: 92, avgTime: '31 min' },
    { area: 'Manhattan', orders: 312, completion: 95, avgTime: '27 min' }
  ]

  const generateChartData = () => {
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
    return Array.from({ length: days }, (_, i) => ({
      day: `Day ${i + 1}`,
      orders: Math.floor(Math.random() * 50) + 100,
      revenue: Math.floor(Math.random() * 1000) + 2000,
      deliveries: Math.floor(Math.random() * 40) + 80
    }))
  }

  const chartData = generateChartData()

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive insights into your logistics operations</p>
        </div>
        <div className="flex space-x-3 mt-4 lg:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(kpiData).map(([key, data], index) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{data.value}</p>
                <p className={`text-sm mt-1 flex items-center ${
                  data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 mr-1 ${data.trend === 'down' ? 'rotate-180' : ''}`} />
                  {data.change} from last period
                </p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                {index === 0 && <Package className="h-6 w-6 text-primary-600" />}
                {index === 1 && <Clock className="h-6 w-6 text-primary-600" />}
                {index === 2 && <Users className="h-6 w-6 text-primary-600" />}
                {index === 3 && <DollarSign className="h-6 w-6 text-primary-600" />}
                {index === 4 && <Users className="h-6 w-6 text-primary-600" />}
                {index === 5 && <TrendingUp className="h-6 w-6 text-primary-600" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            <div className="flex space-x-2">
              {['orders', 'revenue', 'deliveries'].map((chart) => (
                <button
                  key={chart}
                  onClick={() => setActiveChart(chart)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeChart === chart
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {chart.charAt(0).toUpperCase() + chart.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Simplified Chart Visualization */}
          <div className="h-64 bg-gray-50 rounded-lg p-4">
            <div className="flex items-end justify-between h-48">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 mx-1">
                  <div
                    className="w-full bg-primary-500 rounded-t transition-all duration-500"
                    style={{
                      height: `${(data[activeChart] / Math.max(...chartData.map(d => d[activeChart]))) * 100}%`,
                      maxHeight: '90%'
                    }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Riders</h2>
          <div className="space-y-4">
            {topRiders.map((rider, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">
                      {rider.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{rider.name}</p>
                    <p className="text-sm text-gray-600">{rider.deliveries} deliveries</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 justify-end">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium text-gray-900">{rider.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{rider.earnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Area Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Area Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Delivery Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {areaPerformance.map((area, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">{area.area}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {area.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {area.completion}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {area.avgTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${area.completion}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}