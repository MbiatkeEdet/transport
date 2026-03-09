
// 'use client'
// import { useState } from 'react'
// import { useAuth } from '../context/AuthContext'
// import Sidebar from './Sidebar'
// import Header from './Header'
// import Dashboard from '../dashboard/page'
// import Login from '../login/page'



// export default function AppContent() {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const { user, loading } = useAuth()

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     )
//   }

//   if (!user) {
//     return <Login />
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header setSidebarOpen={setSidebarOpen} />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto">
//           <Dashboard />
         
          
//         </main>
//       </div>
//     </div>

    
//   )
// }

'use client'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from './Sidebar'
import Header from './Header'
import Dashboard from '../dashboard/page'
import Login from '../login/page'
import Riders from '../riders/page'
import Orders from '../orders/page'

export default function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard") 
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) return <Login />

  // Simple page switching
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard />
      case "riders": return <Riders />
      case "orders": return <Orders />
      default: return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
