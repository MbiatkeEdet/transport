
'use client'
import Link from 'next/link'
import { Package, Clock, CheckCircle, Truck } from 'lucide-react'

const orders = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    address: '123 Main St, New York, NY',
    items: 3,
    amount: '$45.99',
    status: 'delivered',
    rider: 'John Doe',
    timestamp: '2024-01-15 14:30',
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    address: '456 Oak Ave, Brooklyn, NY',
    items: 2,
    amount: '$29.50',
    status: 'in_transit',
    rider: 'Mike Johnson',
    timestamp: '2024-01-15 13:15',
  },
  {
    id: 'ORD-003',
    customer: 'Robert Brown',
    address: '789 Pine St, Queens, NY',
    items: 1,
    amount: '$15.75',
    status: 'pending',
    rider: null,
    timestamp: '2024-01-15 12:45',
  },
]

export default function RecentOrders() {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in_transit': return <Truck className="h-4 w-4 text-yellow-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'in_transit': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        <Link href="/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-50 rounded-lg">
                <Package className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{order.id}</p>
                <p className="text-sm text-gray-600">{order.customer}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2 justify-end">
                {getStatusIcon(order.status)}
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{order.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}