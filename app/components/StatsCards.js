// components/StatsCards.js
'use client'
import { Package, Users, CreditCard, TrendingUp } from 'lucide-react'

const stats = [
  {
    name: 'Total Orders',
    value: '1,234',
    change: '+12%',
    changeType: 'positive',
    icon: Package,
  },
  {
    name: 'Active Riders',
    value: '45',
    change: '+5%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Revenue',
    value: '$12,456',
    change: '+8%',
    changeType: 'positive',
    icon: CreditCard,
  },
  {
    name: 'Completion Rate',
    value: '94%',
    change: '+2%',
    changeType: 'positive',
    icon: TrendingUp,
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 flex items-center ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 mr-1 ${stat.changeType === 'negative' ? 'rotate-180' : ''}`} />
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <Icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}