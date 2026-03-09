// context/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('logistics_user')
    const token = localStorage.getItem('logistics_token')
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const users = [
        {
          id: 1,
          email: 'admin@logistics.com',
          password: 'admin123',
          name: 'System Administrator',
          role: 'admin',
          avatar: 'SA'
        },
        {
          id: 2,
          email: 'manager@logistics.com',
          password: 'manager123',
          name: 'Operations Manager',
          role: 'manager',
          avatar: 'OM'
        },
        {
          id: 3,
          email: 'dispatcher@logistics.com',
          password: 'dispatcher123',
          name: 'Dispatch Coordinator',
          role: 'dispatcher',
          avatar: 'DC'
        }
      ]

      const foundUser = users.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        const token = btoa(JSON.stringify(userWithoutPassword))
        
        setUser(userWithoutPassword)
        localStorage.setItem('logistics_user', JSON.stringify(userWithoutPassword))
        localStorage.setItem('logistics_token', token)
        
        return { success: true, user: userWithoutPassword }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('logistics_user')
    localStorage.removeItem('logistics_token')
  }

  const hasPermission = (requiredRole) => {
    if (!user) return false
    
    const roleHierarchy = {
      admin: ['admin', 'manager', 'dispatcher', 'rider'],
      manager: ['manager', 'dispatcher', 'rider'],
      dispatcher: ['dispatcher', 'rider'],
      rider: ['rider']
    }

    return roleHierarchy[user.role]?.includes(requiredRole) || false
  }

  const value = {
    user,
    login,
    logout,
    loading,
    hasPermission
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}