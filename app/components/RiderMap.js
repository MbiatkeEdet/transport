// components/RiderMap.js
'use client'
import { useState, useEffect } from 'react'
import { MapPin, Navigation, Clock } from 'lucide-react'

const mockRiders = [
  {
    id: 1,
    name: 'John Doe',
    location: { lat: 40.7128, lng: -74.0060 },
    status: 'delivering',
    orderId: 'ORD-001',
    speed: '25 km/h',
    lastUpdate: '2 min ago',
  },
  {
    id: 2,
    name: 'Jane Smith',
    location: { lat: 40.7589, lng: -73.9851 },
    status: 'available',
    orderId: null,
    speed: '0 km/h',
    lastUpdate: '5 min ago',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    location: { lat: 40.7505, lng: -73.9934 },
    status: 'delivering',
    orderId: 'ORD-003',
    speed: '18 km/h',
    lastUpdate: '1 min ago',
  },
]

export default function RiderMap() {
  const [riders, setRiders] = useState(mockRiders)
  const [selectedRider, setSelectedRider] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setRiders(prev => prev.map(rider => ({
        ...rider,
        lastUpdate: 'Just now',
        location: {
          lat: rider.location.lat + (Math.random() - 0.5) * 0.001,
          lng: rider.location.lng + (Math.random() - 0.5) * 0.001,
        }
      })))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivering': return 'bg-yellow-100 text-yellow-800'
      case 'available': return 'bg-green-100 text-green-800'
      case 'offline': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Live Rider Tracking</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Live updates</span>
        </div>
      </div>

      {/* Simplified map visualization */}
      <div className="bg-gray-100 rounded-lg h-64 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          {riders.map((rider) => (
            <button
              key={rider.id}
              onClick={() => setSelectedRider(rider)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                selectedRider?.id === rider.id ? 'z-10' : ''
              }`}
              style={{
                left: `${((rider.location.lng + 180) / 360) * 100}%`,
                top: `${((90 - rider.location.lat) / 180) * 100}%`,
              }}
            >
              <div className={`
                p-2 rounded-full shadow-lg transition-all duration-200
                ${selectedRider?.id === rider.id ? 'scale-125' : ''}
                ${rider.status === 'delivering' ? 'bg-yellow-500' : 'bg-green-500'}
              `}>
                <Navigation className="h-4 w-4 text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Rider list */}
      <div className="space-y-3">
        {riders.map((rider) => (
          <div
            key={rider.id}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedRider?.id === rider.id
                ? 'border-primary-300 bg-primary-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRider(rider)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">
                    {rider.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{rider.name}</p>
                  <p className="text-sm text-gray-600">{rider.orderId || 'No active order'}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rider.status)}`}>
                  {rider.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">{rider.lastUpdate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}