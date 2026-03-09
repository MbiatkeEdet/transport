// context/NotificationContext.js
'use client'
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [permission, setPermission] = useState('default')
  const [pushEnabled, setPushEnabled] = useState(false)

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
      
      if (Notification.permission === 'granted') {
        setPushEnabled(true)
      }
    }

    const storedNotifications = localStorage.getItem('logistics_notifications')
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications')
      return false
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      
      if (result === 'granted') {
        setPushEnabled(true)
        showNotification({
          title: 'Notifications Enabled',
          message: 'You will now receive push notifications for important updates.',
          type: 'system'
        })
        return true
      }
      return false
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return false
    }
  }, [])

  const showNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      read: false,
      ...notification,
    }

    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, 50)
      localStorage.setItem('logistics_notifications', JSON.stringify(updated))
      return updated
    })

    if (pushEnabled && Notification.permission === 'granted') {
      const browserNotification = new Notification(notification.title, {
        body: notification.message,
        icon: '/icon.png',
        badge: '/badge.png',
        tag: notification.type,
        requireInteraction: notification.important || false,
      })

      browserNotification.onclick = () => {
        window.focus()
        browserNotification.close()
      }

      if (!notification.important) {
        setTimeout(() => browserNotification.close(), 5000)
      }
    }
  }, [pushEnabled])

  const markAsRead = useCallback((id) => {
    setNotifications(prev => {
      const updated = prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
      localStorage.setItem('logistics_notifications', JSON.stringify(updated))
      return updated
    })
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(notification => ({ ...notification, read: true }))
      localStorage.setItem('logistics_notifications', JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    localStorage.removeItem('logistics_notifications')
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const intervals = [
      setInterval(() => {
        const types = ['order', 'rider', 'payment', 'system']
        const type = types[Math.floor(Math.random() * types.length)]
        
        const notificationsByType = {
          order: {
            title: 'New Order Received',
            message: `Order ORD-${Math.floor(1000 + Math.random() * 9000)} has been placed`,
            type: 'order'
          },
          rider: {
            title: 'Rider Update',
            message: 'John Doe has completed a delivery',
            type: 'rider'
          },
          payment: {
            title: 'Payment Processed',
            message: `Payment of $${(Math.random() * 100).toFixed(2)} received`,
            type: 'payment'
          },
          system: {
            title: 'System Update',
            message: 'Scheduled maintenance tonight at 2 AM',
            type: 'system'
          }
        }

        if (Math.random() < 0.3) {
          showNotification(notificationsByType[type])
        }
      }, 30000),
    ]

    return () => intervals.forEach(clearInterval)
  }, [showNotification])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        permission,
        pushEnabled,
        unreadCount,
        showNotification,
        markAsRead,
        markAllAsRead,
        clearAll,
        requestPermission,
        setPushEnabled,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}