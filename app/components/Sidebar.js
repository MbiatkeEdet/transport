
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { 
  Home, 
  Package, 
  Users, 
  CreditCard, 
  Bell,
  BarChart3,
  Menu,
  X,
  LogOut
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, roles: ['admin', 'manager', 'dispatcher'] },
  { name: 'Orders', href: '/orders', icon: Package, roles: ['admin', 'manager', 'dispatcher'] },
  { name: 'Riders', href: '/riders', icon: Users, roles: ['admin', 'manager'] },
  { name: 'Payments', href: '/payments', icon: CreditCard, roles: ['admin', 'manager'] },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['admin', 'manager'] },
  { name: 'Notifications', href: '/notifications', icon: Bell, roles: ['admin', 'manager', 'dispatcher'] },
]

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname()
  const { user, logout, hasPermission } = useAuth()

  const filteredNavigation = navigation.filter(item => 
    item.roles.some(role => hasPermission(role))
  )

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-500 opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-yellow-500 shadow-lg transform transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-primary-600 text-white">
          <h1 className="text-xl font-bold">Logistics App</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          {filteredNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200
                  ${isActive 
                    ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign out
          </button>
        </div>
      </div>

      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 bg-white rounded-md shadow-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </>
  )
}