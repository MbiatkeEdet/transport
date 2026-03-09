// app/notifications/page.js
'use client'
import { useState } from 'react'
import { useNotifications } from '../context/NotificationContext'
import { Bell, CheckCircle, AlertTriangle, Info, X, Settings, Trash2 } from 'lucide-react'

export default function Notifications() {
  const { 
    notifications, 
    permission, 
    pushEnabled, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearAll,
    requestPermission,
    setPushEnabled
  } = useNotifications()

  const [filter, setFilter] = useState('all')

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    return notification.type === filter
  })

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'rider':
        return <Bell className="h-5 w-5 text-blue-500" />
      case 'payment':
        return <CheckCircle className="h-5 w-5 text-purple-500" />
      case 'system':
        return <Info className="h-5 w-5 text-gray-500" />
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'order': return 'bg-green-100 text-green-800'
      case 'rider': return 'bg-blue-100 text-blue-800'
      case 'payment': return 'bg-purple-100 text-purple-800'
      case 'system': return 'bg-gray-100 text-gray-800'
      case 'alert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - new Date(timestamp)
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Manage your notification preferences</p>
        </div>
        <div className="flex space-x-3 mt-4 lg:mt-0">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Mark all as read
            </button>
          )}
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            <p className="text-gray-600">Configure how you receive notifications</p>
          </div>
          <Settings className="h-6 w-6 text-gray-400" />
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive browser notifications</p>
            </div>
            <div className="flex items-center space-x-3">
              {permission === 'default' && (
                <button
                  onClick={requestPermission}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Enable
                </button>
              )}
              {permission === 'granted' && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600">Enabled</span>
                  <button
                    onClick={() => setPushEnabled(!pushEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      pushEnabled ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        pushEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              )}
              {permission === 'denied' && (
                <span className="text-sm text-red-600">Blocked by browser</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex space-x-4">
          {['all', 'unread', 'order', 'rider', 'payment', 'system'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              {filterType === 'unread' && unreadCount > 0 && (
                <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border transition-all duration-200 ${
                notification.read 
                  ? 'border-gray-200' 
                  : 'border-primary-200 bg-primary-50'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                        {!notification.read && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-sm text-gray-500">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Dismiss"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You're all caught up! New notifications will appear here."
                : `No ${filter} notifications found.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}