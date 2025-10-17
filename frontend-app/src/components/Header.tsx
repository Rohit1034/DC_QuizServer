// =======================================
// HEADER & NAVIGATION COMPONENTS
// Online Quiz System - Top Navigation
// =======================================

import React from 'react';
import type { User } from '../types';

export const Header: React.FC<{
  user: User;
  currentRole: 'admin' | 'student';
  onRoleSwitch?: (role: 'admin' | 'student') => void;
  onLogout?: () => void;
  notificationCount?: number;
}> = ({ user, currentRole, onRoleSwitch, onLogout, notificationCount = 0 }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-fixed">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">QuizSystem</h1>
            </div>
            
            {/* Role Indicator */}
            <div className="hidden md:flex items-center">
              <span className="text-sm text-gray-500 mr-2">Mode:</span>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentRole === 'admin' 
                  ? 'bg-accent-100 text-accent-800' 
                  : 'bg-primary-100 text-primary-800'
              }`}>
                {currentRole === 'admin' ? '👨‍💼 Admin' : '🎓 Student'}
              </div>
            </div>
          </div>

          {/* Search Bar (Admin only) */}
          {currentRole === 'admin' && (
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search quizzes, users, or servers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Connection Status (Student only) */}
            {currentRole === 'student' && (
              <ConnectionIndicator status="online" />
            )}

            {/* Role Switcher */}
            {user.role === 'admin' && (
              <RoleSwitcher
                currentRole={currentRole}
                onSwitch={onRoleSwitch}
              />
            )}

            {/* Notifications */}
            <NotificationButton count={notificationCount} />

            {/* User Menu */}
            <UserMenu user={user} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
};

export const Sidebar: React.FC<{
  currentRole: 'admin' | 'student';
  currentPath: string;
  onNavigate?: (path: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}> = ({ currentRole, currentPath, onNavigate, collapsed = false, onToggleCollapse }) => {
  const adminMenuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/admin/dashboard',
      badge: null
    },
    { 
      id: 'servers', 
      label: 'Server Monitor', 
      icon: <ServerIcon />, 
      path: '/admin/servers',
      badge: '3 alerts'
    },
    { 
      id: 'quizzes', 
      label: 'Quiz Management', 
      icon: <QuizIcon />, 
      path: '/admin/quizzes',
      badge: null
    },
    { 
      id: 'results', 
      label: 'Results & Analytics', 
      icon: <ChartIcon />, 
      path: '/admin/results',
      badge: null
    },
    { 
      id: 'simulation', 
      label: 'Simulation Console', 
      icon: <SimulationIcon />, 
      path: '/admin/simulation',
      badge: 'Beta'
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: <UsersIcon />, 
      path: '/admin/users',
      badge: null
    },
  ];

  const studentMenuItems = [
    { 
      id: 'quizzes', 
      label: 'Available Quizzes', 
      icon: <QuizIcon />, 
      path: '/student/quizzes',
      badge: '3 new'
    },
    { 
      id: 'results', 
      label: 'My Results', 
      icon: <ResultsIcon />, 
      path: '/student/results',
      badge: null
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: <ProfileIcon />, 
      path: '/student/profile',
      badge: null
    },
  ];

  const menuItems = currentRole === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <div className={`bg-white border-r border-gray-200 h-full transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="font-semibold text-gray-800">
              {currentRole === 'admin' ? 'Admin Panel' : 'Student Portal'}
            </h2>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <CollapseIcon collapsed={collapsed} />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.path)}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
              currentPath === item.path
                ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className={`flex-shrink-0 ${collapsed ? 'mx-auto' : 'mr-3'}`}>
              {item.icon}
            </span>
            
            {!collapsed && (
              <>
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-1 text-xs font-medium bg-accent-100 text-accent-800 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">System Status: Online</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-components
const ConnectionIndicator: React.FC<{ status: 'online' | 'offline' | 'reconnecting' }> = ({ status }) => {
  const statusConfig = {
    online: { color: 'bg-success-500', text: 'Online', pulse: false },
    offline: { color: 'bg-danger-500', text: 'Offline', pulse: false },
    reconnecting: { color: 'bg-accent-500', text: 'Reconnecting...', pulse: true },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-full">
      <div className={`w-2 h-2 rounded-full ${config.color} ${config.pulse ? 'animate-pulse' : ''}`} />
      <span className="text-sm font-medium text-gray-700">{config.text}</span>
    </div>
  );
};

const RoleSwitcher: React.FC<{
  currentRole: 'admin' | 'student';
  onSwitch?: (role: 'admin' | 'student') => void;
}> = ({ currentRole, onSwitch }) => {
  return (
    <div className="relative">
      <select
        value={currentRole}
        onChange={(e) => onSwitch?.(e.target.value as 'admin' | 'student')}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500"
      >
        <option value="admin">Admin View</option>
        <option value="student">Student View</option>
      </select>
      <ChevronDownIcon />
    </div>
  );
};

const NotificationButton: React.FC<{ count: number }> = ({ count }) => {
  return (
    <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
      <BellIcon />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-danger-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
};

const UserMenu: React.FC<{
  user: User;
  onLogout?: () => void;
}> = ({ user, onLogout }) => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
        <ChevronDownIcon />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-dropdown">
        <div className="p-4 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
          <div className="text-xs text-accent-600 mt-1 capitalize">{user.role}</div>
        </div>
        <nav className="p-2">
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            Profile Settings
          </a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            Preferences
          </a>
          <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
            Help & Support
          </a>
          <hr className="my-2" />
          <button
            onClick={onLogout}
            className="block w-full text-left px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 rounded-md"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </div>
  );
};

// Icon Components
const SearchIcon = () => (
  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const ServerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
  </svg>
);

const QuizIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SimulationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const ResultsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const ProfileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CollapseIcon = ({ collapsed }: { collapsed: boolean }) => (
  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
      collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"
    } />
  </svg>
);