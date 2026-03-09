
'use client'
import { useState } from 'react'
import { Search, Filter, Plus, Phone, Mail, MapPin, Clock, Battery, Wifi, Users, Package, Star } from 'lucide-react'

export default function Riders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const riders = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      vehicle: 'Motorcycle - Honda CB150',
      licensePlate: 'ABC-123',
      currentLocation: 'Downtown Manhattan',
      totalOrders: 156,
      rating: 4.8,
      online: true,
      battery: 85,
      signal: 'excellent',
      lastActive: '2 minutes ago',
      earnings: '$1,245.50',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      status: 'active',
      vehicle: 'Scooter - Yamaha NMAX',
      licensePlate: 'XYZ-789',
      currentLocation: 'Brooklyn Heights',
      totalOrders: 89,
      rating: 4.9,
      online: true,
      battery: 45,
      signal: 'good',
      lastActive: '5 minutes ago',
      earnings: '$892.75',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890',
      status: 'inactive',
      vehicle: 'Bicycle',
      licensePlate: 'N/A',
      currentLocation: 'Offline',
      totalOrders: 203,
      rating: 4.7,
      online: false,
      battery: 0,
      signal: 'offline',
      lastActive: '2 hours ago',
      earnings: '$2,134.25',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      vehicle: 'Motorcycle - Suzuki GSX150',
      licensePlate: 'DEF-456',
      currentLocation: 'Queens Center',
      totalOrders: 67,
      rating: 4.6,
      online: true,
      battery: 92,
      signal: 'excellent',
      lastActive: 'Just now',
      earnings: '$567.80',
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert.brown@example.com',
      phone: '+1 (555) 345-6789',
      status: 'on_break',
      vehicle: 'Scooter - Honda PCX',
      licensePlate: 'GHI-789',
      currentLocation: 'Central Park',
      totalOrders: 134,
      rating: 4.5,
      online: false,
      battery: 78,
      signal: 'fair',
      lastActive: '30 minutes ago',
      earnings: '$1,123.40',
    },
  ]

  const statusOptions = [
    { value: 'all', label: 'All Riders' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on_break', label: 'On Break' },
  ]

  const filteredRiders = riders.filter(rider => {
    const matchesSearch = rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rider.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || rider.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'on_break': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'active': return 'Active'
      case 'inactive': return 'Inactive'
      case 'on_break': return 'On Break'
      default: return status
    }
  }

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'excellent': return 'text-green-500'
      case 'good': return 'text-blue-500'
      case 'fair': return 'text-yellow-500'
      case 'poor': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getBatteryColor = (level) => {
    if (level >= 70) return 'text-green-500'
    if (level >= 30) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rider Management</h1>
          <p className="text-gray-600">Manage and track your delivery riders</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add New Rider</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Riders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{riders.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Now</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {riders.filter(r => r.online).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Wifi className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Delivery</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4.7</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search riders by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Riders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRiders.map((rider) => (
          <div key={rider.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Rider Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-primary-600">
                      {rider.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{rider.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(rider.status)}`}>
                        {getStatusDisplay(rider.status)}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${rider.online ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-xs text-gray-500">
                        {rider.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 justify-end">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{rider.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{rider.totalOrders} orders</p>
                </div>
              </div>
            </div>

            {/* Rider Details */}
            <div className="p-6 space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{rider.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{rider.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{rider.currentLocation}</span>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{rider.vehicle}</p>
                <p className="text-xs text-gray-600 mt-1">Plate: {rider.licensePlate}</p>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Battery className={`h-4 w-4 ${getBatteryColor(rider.battery)}`} />
                  <span className="text-gray-600">{rider.battery}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className={`h-4 w-4 ${getSignalColor(rider.signal)}`} />
                  <span className="text-gray-600 capitalize">{rider.signal}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{rider.lastActive}</span>
                </div>
              </div>

              {/* Earnings */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Total Earnings</span>
                  <span className="text-lg font-bold text-primary-600">{rider.earnings}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                  View Details
                </button>
                <button className="flex-1 bg-white text-gray-700 py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRiders.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No riders found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by adding your first rider'
            }
          </p>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            Add New Rider
          </button>
        </div>
      )}
    </div>
  )
}