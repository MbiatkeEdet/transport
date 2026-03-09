
// 'use client'
// import { useState } from 'react'
// import { Search, Filter, Plus, Package, Clock, CheckCircle, Truck } from 'lucide-react'

// export default function Orders() {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState('all')

//   const orders = [
//     {
//       id: 'ORD-001',
//       customer: 'John Smith',
//       address: '123 Main St, New York, NY',
//       items: 3,
//       amount: '$45.99',
//       status: 'delivered',
//       rider: 'John Doe',
//       timestamp: '2024-01-15 14:30',
//     },
//     {
//       id: 'ORD-002',
//       customer: 'Sarah Johnson',
//       address: '456 Oak Ave, Brooklyn, NY',
//       items: 2,
//       amount: '$29.50',
//       status: 'in_transit',
//       rider: 'Mike Johnson',
//       timestamp: '2024-01-15 13:15',
//     },
//     {
//       id: 'ORD-003',
//       customer: 'Robert Brown',
//       address: '789 Pine St, Queens, NY',
//       items: 1,
//       amount: '$15.75',
//       status: 'pending',
//       rider: null,
//       timestamp: '2024-01-15 12:45',
//     },
    
    
//   ]

//   const statusOptions = [
//     { value: 'all', label: 'All Status' },
//     { value: 'pending', label: 'Pending' },
//     { value: 'in_transit', label: 'In Transit' },
//     { value: 'delivered', label: 'Delivered' },
//   ]

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.address.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === 'all' || order.status === statusFilter
//     return matchesSearch && matchesStatus
//   })

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />
//       case 'in_transit': return <Truck className="h-4 w-4 text-yellow-500" />
//       default: return <Clock className="h-4 w-4 text-gray-500" />
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'delivered': return 'bg-green-100 text-green-800'
//       case 'in_transit': return 'bg-yellow-100 text-yellow-800'
//       case 'pending': return 'bg-gray-100 text-gray-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   const getStatusDisplay = (status) => {
//     switch (status) {
//       case 'delivered': return 'Delivered'
//       case 'in_transit': return 'In Transit'
//       case 'pending': return 'Pending'
//       default: return status
//     }
//   }

//   return (
//     <div className="p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
//           <p className="text-gray-600">Manage and track all orders</p>
//         </div>
//         <button className="mt-4 sm:mt-0 bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors">
//           <Plus className="h-4 w-4" />
//           <span>New Order</span>
//         </button>
//       </div>

//       {/* Search and Filter */}
//       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//         <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               placeholder="Search orders by ID, customer, or address..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//           >
//             {statusOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Filter className="h-4 w-4" />
//             <span>More Filters</span>
//           </button>
//         </div>
//       </div>

//       {/* Orders Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//         {filteredOrders.map((order) => (
//           <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-primary-50 rounded-lg">
//                     <Package className="h-4 w-4 text-primary-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
//                     <p className="text-sm text-gray-600">{order.customer}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-lg font-bold text-gray-900">{order.amount}</p>
//                   <p className="text-sm text-gray-600">{order.items} items</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   {getStatusIcon(order.status)}
//                   <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                     {getStatusDisplay(order.status)}
//                   </span>
//                 </div>
//                 <span className="text-sm text-gray-500">{order.timestamp}</span>
//               </div>

//               <div className="text-sm text-gray-600">
//                 <p className="font-medium">Delivery Address:</p>
//                 <p className="mt-1">{order.address}</p>
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-gray-600">
//                   Rider: <span className="font-medium text-gray-900">{order.rider || 'Unassigned'}</span>
//                 </span>
//                 {order.status === 'in_transit' && (
//                   <button className="text-primary-600 hover:text-primary-700 font-medium">
//                     Track Order
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//               <div className="flex space-x-3">
//                 <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
//                   View Details
//                 </button>
//                 <button className="flex-1 bg-white text-gray-700 py-2 px-4 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
//                   {order.rider ? 'Reassign' : 'Assign Rider'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Orders Table View */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Customer
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Rider
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredOrders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {order.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {order.customer}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {order.amount}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                       {getStatusDisplay(order.status)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {order.rider || 'Unassigned'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {order.timestamp}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Empty State */}
//       {filteredOrders.length === 0 && (
//         <div className="text-center py-12">
//           <div className="bg-gray-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Package className="h-8 w-8 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
//           <p className="text-gray-600 mb-4">
//             {searchTerm || statusFilter !== 'all' 
//               ? 'Try adjusting your search or filter criteria'
//               : 'Get started by creating your first order'
//             }
//           </p>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//             Create New Order
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

'use client'
import { useState } from 'react'
import { Search, Filter, Plus, Package, Clock, CheckCircle, Truck, Grid, Table, X } from 'lucide-react'

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    customer: '',
    address: '',
    items: '',
    amount: '',
  })

  const [orders, setOrders] = useState([
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
  ])

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' },
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_transit': return <Truck className="h-4 w-4 text-yellow-600" />
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

  const getStatusDisplay = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.customer || !formData.address || !formData.items || !formData.amount) {
      alert('Please fill in all fields')
      return
    }

    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customer: formData.customer,
      address: formData.address,
      items: parseInt(formData.items),
      amount: `$${parseFloat(formData.amount).toFixed(2)}`,
      status: 'pending',
      rider: null,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
    }

    setOrders([newOrder, ...orders])
    setIsModalOpen(false)
    setFormData({ customer: '', address: '', items: '', amount: '' })
  }

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all customer orders</p>
        </div>

        {/* Search, Filter & Create Button */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by Order ID, customer, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
                aria-label="Table view"
              >
                <Table className="h-5 w-5" />
              </button>
            </div>

            {/* Create New Order Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-medium whitespace-nowrap"
            >
              <Plus className="h-5 w-5" />
              <span>New Order</span>
            </button>
          </div>
        </div>

        {/* Orders Grid or Table */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Get started by creating your first order!'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Create New Order
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{order.amount}</p>
                      <p className="text-sm text-gray-600">{order.items} items</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusDisplay(order.status)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{order.timestamp}</span>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Delivery Address:</p>
                    <p className="mt-1">{order.address}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Rider: <span className="font-medium text-gray-900">{order.rider || 'Unassigned'}</span>
                    </span>
                    {order.status === 'in_transit' && (
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Track Order
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                      View Details
                    </button>
                    <button className="flex-1 bg-white text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition">
                      {order.rider ? 'Reassign' : 'Assign Rider'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View - unchanged */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rider</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusDisplay(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.rider || 'Unassigned'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{order.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Order</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  required
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="123 Main St, City, State"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Items</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.items}
                    onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="49.99"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Create Order
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}