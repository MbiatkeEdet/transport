
'use client'
import { useState } from 'react'
import { CreditCard, Wallet, TrendingUp, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

export default function Payments() {
  const [activeTab, setActiveTab] = useState('transactions')

  const transactions = [
    {
      id: 'TXN-001',
      type: 'credit',
      amount: '$45.99',
      description: 'Order ORD-001 Payment',
      date: '2024-01-15',
      status: 'completed',
      customer: 'John Smith',
    },
    {
      id: 'TXN-002',
      type: 'debit',
      amount: '$10.00',
      description: 'Rider Payout - John Doe',
      date: '2024-01-14',
      status: 'completed',
      customer: 'System',
    },
    {
      id: 'TXN-003',
      type: 'credit',
      amount: '$29.50',
      description: 'Order ORD-002 Payment',
      date: '2024-01-14',
      status: 'pending',
      customer: 'Sarah Johnson',
    },
    {
      id: 'TXN-004',
      type: 'credit',
      amount: '$67.80',
      description: 'Order ORD-004 Payment',
      date: '2024-01-13',
      status: 'completed',
      customer: 'Emily Davis',
    },
    {
      id: 'TXN-005',
      type: 'debit',
      amount: '$15.00',
      description: 'Rider Payout - Jane Smith',
      date: '2024-01-13',
      status: 'completed',
      customer: 'System',
    },
  ]

  const wallets = [
    {
      rider: 'John Doe',
      balance: '$245.50',
      pending: '$45.99',
      lastPayout: '2024-01-14',
      totalEarnings: '$12,456.75',
    },
    {
      rider: 'Jane Smith',
      balance: '$189.75',
      pending: '$29.50',
      lastPayout: '2024-01-14',
      totalEarnings: '$8,912.30',
    },
    {
      rider: 'Mike Johnson',
      balance: '$312.25',
      pending: '$67.80',
      lastPayout: '2024-01-13',
      totalEarnings: '$15,234.60',
    },
    {
      rider: 'Sarah Wilson',
      balance: '$156.80',
      pending: '$34.25',
      lastPayout: '2024-01-13',
      totalEarnings: '$6,789.45',
    },
  ]

  const payoutRequests = [
    {
      id: 'PR-001',
      rider: 'John Doe',
      amount: '$200.00',
      requestedAt: '2024-01-15 14:30',
      status: 'pending',
    },
    {
      id: 'PR-002',
      rider: 'Jane Smith',
      amount: '$150.00',
      requestedAt: '2024-01-15 13:15',
      status: 'approved',
    },
    {
      id: 'PR-003',
      rider: 'Mike Johnson',
      amount: '$300.00',
      requestedAt: '2024-01-14 16:45',
      status: 'completed',
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments & Wallets</h1>
        <p className="text-gray-600">Manage payments and rider wallets</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$12,456</p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.3% from last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$1,234</p>
              <p className="text-sm text-yellow-600 mt-1">12 requests</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Payouts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$8,912</p>
              <p className="text-sm text-blue-600 mt-1">45 processed</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wallet Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$2,345</p>
              <p className="text-sm text-gray-600 mt-1">Across all riders</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Wallet className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {['transactions', 'wallets', 'payouts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-6 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.id} • {transaction.date} • {transaction.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium text-lg ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wallets' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Rider Wallets</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wallets.map((wallet, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{wallet.rider}</h4>
                      <Wallet className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Available Balance:</span>
                        <span className="font-semibold text-gray-900">{wallet.balance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Pending Amount:</span>
                        <span className="font-semibold text-yellow-600">{wallet.pending}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Earnings:</span>
                        <span className="font-semibold text-green-600">{wallet.totalEarnings}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Payout:</span>
                        <span className="text-gray-900">{wallet.lastPayout}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                      Process Payout
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payouts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Payout Requests</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Filter
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rider
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requested At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payoutRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {request.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.rider}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.requestedAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === 'completed' ? 'bg-green-100 text-green-800' :
                            request.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-700">
                              View
                            </button>
                            {request.status === 'pending' && (
                              <>
                                <button className="text-green-600 hover:text-green-700">
                                  Approve
                                </button>
                                <button className="text-red-600 hover:text-red-700">
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}