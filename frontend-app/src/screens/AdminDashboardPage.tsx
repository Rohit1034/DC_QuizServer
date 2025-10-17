// =======================================
// ADMIN DASHBOARD
// Online Quiz System - Admin Overview & KPIs
// =======================================

import React from 'react';
import { Header } from '../components/Header';
import { Card, KPICard, ServerTile, QuizCard } from '../components/Card';
import { Button } from '../components/Button';
import { Timer } from '../components/Timer';

export const AdminDashboardPage: React.FC = () => {
  const [currentUser] = React.useState({
    id: 'admin-1',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@university.edu',
    role: 'admin' as const,
    avatar: '',
    createdAt: '2024-01-01',
  });

  const [timeRange, setTimeRange] = React.useState<'today' | 'week' | 'month' | 'year'>('week');
  const [refreshing, setRefreshing] = React.useState(false);

  // Sample dashboard data
  const dashboardData = {
    overview: {
      totalStudents: 1247,
      activeQuizzes: 8,
      completedAttempts: 2856,
      averageScore: 78.5,
      systemUptime: 99.97,
      serverLoad: 42
    },
    recentActivity: [
      {
        id: '1',
        type: 'quiz_completed',
        user: 'Alex Johnson',
        action: 'completed "JavaScript Fundamentals"',
        score: 84,
        timestamp: '2024-10-15T14:32:00Z'
      },
      {
        id: '2',
        type: 'quiz_started',
        user: 'Maria Garcia',
        action: 'started "React Advanced Patterns"',
        timestamp: '2024-10-15T14:28:00Z'
      },
      {
        id: '3',
        type: 'user_registered',
        user: 'John Smith',
        action: 'registered as student',
        timestamp: '2024-10-15T14:15:00Z'
      },
      {
        id: '4',
        type: 'quiz_created',
        user: 'Dr. Sarah Chen',
        action: 'created "Database Optimization"',
        timestamp: '2024-10-15T13:45:00Z'
      }
    ],
    topQuizzes: [
      {
        id: '1',
        title: 'JavaScript Fundamentals',
        attempts: 456,
        avgScore: 76.2,
        difficulty: 'Beginner',
        status: 'active',
        lastAttempt: '2024-10-15T14:32:00Z'
      },
      {
        id: '2',
        title: 'React Advanced Patterns',
        attempts: 234,
        avgScore: 68.9,
        difficulty: 'Advanced',
        status: 'active',
        lastAttempt: '2024-10-15T14:28:00Z'
      },
      {
        id: '3',
        title: 'Database Design',
        attempts: 189,
        avgScore: 82.1,
        difficulty: 'Intermediate',
        status: 'active',
        lastAttempt: '2024-10-15T13:55:00Z'
      }
    ],
    systemHealth: {
      servers: [
        {
          id: 'web-01',
          name: 'Web Server 01',
          region: 'us-east-1',
          status: 'UP' as 'UP',
          cpu: 45,
          memory: 62,
          activeConnections: 120,
          avgLatencyMs: 32,
          lastHeartbeat: '2024-10-15T14:30:00Z',
          uptime: '15d 4h 23m'
        },
        {
          id: 'web-02',
          name: 'Web Server 02',
          region: 'us-east-1',
          status: 'UP' as 'UP',
          cpu: 38,
          memory: 58,
          activeConnections: 110,
          avgLatencyMs: 29,
          lastHeartbeat: '2024-10-15T14:30:00Z',
          uptime: '15d 4h 23m'
        },
        {
          id: 'db-01',
          name: 'Database Server',
          region: 'us-east-1',
          status: 'DEGRADED' as 'DEGRADED',
          cpu: 78,
          memory: 84,
          activeConnections: 80,
          avgLatencyMs: 54,
          lastHeartbeat: '2024-10-15T14:30:00Z',
          uptime: '32d 12h 5m'
        },
        {
          id: 'cache-01',
          name: 'Cache Server',
          region: 'us-east-1',
          status: 'UP' as 'UP',
          cpu: 23,
          memory: 41,
          activeConnections: 45,
          avgLatencyMs: 18,
          lastHeartbeat: '2024-10-15T14:30:00Z',
          uptime: '8d 16h 42m'
        }
      ],
      alerts: [
        {
          id: '1',
          type: 'warning',
          message: 'Database server memory usage above 80%',
          timestamp: '2024-10-15T14:20:00Z',
          acknowledged: false
        },
        {
          id: '2',
          type: 'info',
          message: 'Scheduled maintenance completed successfully',
          timestamp: '2024-10-15T10:00:00Z',
          acknowledged: true
        }
      ]
    },
    analytics: {
      weeklyStats: {
        quizAttempts: [120, 145, 98, 167, 134, 189, 156],
        newUsers: [12, 8, 15, 22, 18, 25, 19],
        systemLoad: [35, 42, 38, 51, 45, 48, 42]
      },
      topPerformers: [
        { name: 'Emily Chen', score: 94.5, quizzes: 8 },
        { name: 'Michael Brown', score: 92.1, quizzes: 12 },
        { name: 'Sarah Wilson', score: 89.7, quizzes: 6 }
      ],
      strugglingTopics: [
        { topic: 'Advanced JavaScript', avgScore: 62.3, attempts: 145 },
        { topic: 'Database Optimization', avgScore: 58.7, attempts: 89 },
        { topic: 'System Architecture', avgScore: 65.1, attempts: 67 }
      ]
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-success-600';
      case 'warning': return 'text-accent-600';
      case 'critical': return 'text-danger-600';
      default: return 'text-gray-600';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={currentUser} 
        currentRole="admin"
        notificationCount={5}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              System overview and key performance metrics
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Time Range Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['today', 'week', 'month', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 capitalize ${
                    timeRange === range
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshIcon className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Students"
            value={dashboardData.overview.totalStudents.toLocaleString()}
            change={{ value: "+12.5%", trend: "up" }}
            icon={<UsersIcon />}
            color="primary"
          />
          
          <KPICard
            title="Active Quizzes"
            value={dashboardData.overview.activeQuizzes.toString()}
            change={{ value: "+2", trend: "up" }}
            icon={<QuizIcon />}
            color="accent"
          />
          
          <KPICard
            title="Completed Attempts"
            value={dashboardData.overview.completedAttempts.toLocaleString()}
            change={{ value: "+8.3%", trend: "up" }}
            icon={<CheckIcon />}
            color="success"
          />
          
          <KPICard
            title="Average Score"
            value={`${dashboardData.overview.averageScore}%`}
            change={{ value: "+2.1%", trend: "up" }}
            icon={<TrendingUpIcon />}
            color="primary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Health Overview */}
          <div className="lg:col-span-2">
            <Card variant="elevated" padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span className="text-sm text-success-600 font-medium">All Systems Operational</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {dashboardData.systemHealth.servers.map((server) => (
                  <ServerTile
                    key={server.id}
                    server={server}
                  />
                ))}
              </div>

              {/* System Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-success-600">
                    {dashboardData.overview.systemUptime}%
                  </div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">
                    {dashboardData.overview.serverLoad}%
                  </div>
                  <div className="text-sm text-gray-600">Server Load</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-600">
                    {dashboardData.systemHealth.alerts.filter(a => !a.acknowledged).length}
                  </div>
                  <div className="text-sm text-gray-600">Active Alerts</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card variant="elevated" padding="lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    activity.type === 'quiz_completed' ? 'bg-success-500' :
                    activity.type === 'quiz_started' ? 'bg-primary-500' :
                    activity.type === 'user_registered' ? 'bg-accent-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                      {activity.score && (
                        <span className="ml-1 text-success-600 font-medium">
                          ({activity.score}%)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" size="sm">
              View All Activity
            </Button>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Performing Quizzes */}
          <Card variant="elevated" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Quizzes</h3>
              <Button variant="ghost" size="sm">
                <SettingsIcon />
              </Button>
            </div>
            
            <div className="space-y-4">
              {dashboardData.topQuizzes.map((quiz, index) => (
                <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{quiz.title}</p>
                      <p className="text-sm text-gray-600">
                        {quiz.attempts} attempts • {quiz.avgScore}% avg score
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    quiz.difficulty === 'Beginner' ? 'bg-success-100 text-success-800' :
                    quiz.difficulty === 'Intermediate' ? 'bg-accent-100 text-accent-800' :
                    'bg-danger-100 text-danger-800'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Analytics & Insights */}
          <Card variant="elevated" padding="lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics & Insights</h3>
            
            <div className="space-y-6">
              {/* Top Performers */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Top Performers This Week</h4>
                <div className="space-y-2">
                  {dashboardData.analytics.topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{performer.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-success-600">{performer.score}%</div>
                        <div className="text-xs text-gray-500">{performer.quizzes} quizzes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Struggling Topics */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Topics Needing Attention</h4>
                <div className="space-y-3">
                  {dashboardData.analytics.strugglingTopics.map((topic, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-900">{topic.topic}</span>
                        <span className="text-sm font-medium text-danger-600">{topic.avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-danger-500 h-2 rounded-full"
                          style={{ width: `${topic.avgScore}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{topic.attempts} attempts</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* System Alerts */}
        {dashboardData.systemHealth.alerts.some(alert => !alert.acknowledged) && (
          <Card variant="default" padding="lg" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
              <Button variant="ghost" size="sm">
                Acknowledge All
              </Button>
            </div>
            
            <div className="space-y-3">
              {dashboardData.systemHealth.alerts
                .filter(alert => !alert.acknowledged)
                .map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        <AlertIcon />
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm opacity-75 mt-1">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <Card variant="default" padding="lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="primary" size="md">
              <span className="justify-start flex items-center w-full">
                <PlusIcon />
                Create New Quiz
              </span>
            </Button>
            
            <Button variant="secondary" size="md">
              <span className="justify-start flex items-center w-full">
                <MonitorIcon />
                Server Monitor
              </span>
            </Button>
            
            <Button variant="secondary" size="md">
              <span className="justify-start flex items-center w-full">
                <ChartIcon />
                View Analytics
              </span>
            </Button>
            
            <Button variant="secondary" size="md">
              <span className="justify-start flex items-center w-full">
                <SimulationIcon />
                Run Simulation
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Icon Components
const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const QuizIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const MonitorIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SimulationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);