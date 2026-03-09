
'use client'
import StatsCards from '../components/StatsCards'
import RiderMap from '../components/RiderMap'
import RecentOrders from '../components/RecentOrders'

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your logistics dashboard</p>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RiderMap />
        <RecentOrders />
      </div>
    </div>
  )
}