// =======================================
// CARD COMPONENT
// Online Quiz System - Reusable Card
// =======================================

import React from 'react';
import type { CardProps } from '../types';
import { Button } from './Button';

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  clickable = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = [
    'bg-white',
    'border',
    'border-gray-200',
    'rounded-lg',
    'transition-all',
    'duration-200',
  ];

  const variantClasses = {
    default: ['shadow-sm'],
    elevated: ['shadow-md', 'hover:shadow-lg'],
    outlined: ['border-2', 'border-gray-300'],
    glass: ['glass', 'border-white/20'],
  };

  const paddingClasses = {
    sm: ['p-4'],
    md: ['p-6'],
    lg: ['p-8'],
  };

  const clickableClasses = clickable
    ? ['cursor-pointer', 'hover:shadow-md', 'hover:scale-[1.02]', 'active:scale-[0.98]']
    : [];

  const allClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    ...paddingClasses[padding],
    ...clickableClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={allClasses} {...props}>
      {children}
    </div>
  );
};

// Specialized Card Components

export const KPICard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  color?: 'primary' | 'success' | 'danger' | 'accent';
}> = ({ icon, title, value, change, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary-600',
    success: 'text-success-600',
    danger: 'text-danger-600',
    accent: 'text-accent-600',
  };

  const changeColorClasses = {
    up: 'text-success-600 bg-success-50',
    down: 'text-danger-600 bg-danger-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  return (
    <Card variant="elevated" padding="md" className="relative overflow-hidden">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg bg-opacity-10 ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeColorClasses[change.trend]}`}>
              {change.trend === 'up' && <TrendUpIcon />}
              {change.trend === 'down' && <TrendDownIcon />}
              {change.value}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export const QuizCard: React.FC<{
  quiz: {
    id: string;
    title: string;
    description: string;
    timeLimit: number;
    totalQuestions: number;
    startTime: string;
    endTime: string;
  };
  onStart?: () => void;
  disabled?: boolean;
}> = ({ quiz, onStart, disabled = false }) => {
  const isActive = new Date() >= new Date(quiz.startTime) && new Date() <= new Date(quiz.endTime);
  
  return (
    <Card variant="elevated" clickable={!disabled} className="group">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {quiz.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{quiz.description}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <ClockIcon />
              <span className="ml-1">{quiz.timeLimit} min</span>
            </span>
            <span className="flex items-center">
              <QuestionIcon />
              <span className="ml-1">{quiz.totalQuestions} questions</span>
            </span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            isActive ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <div>Start: {new Date(quiz.startTime).toLocaleDateString()}</div>
            <div>End: {new Date(quiz.endTime).toLocaleDateString()}</div>
          </div>
          
          <Button
            variant={isActive ? 'primary' : 'secondary'}
            size="sm"
            disabled={disabled || !isActive}
            onClick={onStart}
          >
            {isActive ? 'Start Quiz' : 'Not Available'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const ServerTile: React.FC<{
  server: {
    id: string;
    name: string;
    region: string;
    status: 'UP' | 'DEGRADED' | 'DOWN' | 'MAINTENANCE';
    cpu: number;
    memory: number;
    activeConnections: number;
    avgLatencyMs: number;
    lastHeartbeat: string;
  };
  onViewLogs?: () => void;
}> = ({ server, onViewLogs }) => {
  const statusColors = {
    UP: 'bg-success-100 text-success-800 border-success-200',
    DEGRADED: 'bg-accent-100 text-accent-800 border-accent-200',
    DOWN: 'bg-danger-100 text-danger-800 border-danger-200',
    MAINTENANCE: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const statusIcons = {
    UP: <CheckCircleIcon />,
    DEGRADED: <ExclamationTriangleIcon />,
    DOWN: <XCircleIcon />,
    MAINTENANCE: <CogIcon />,
  };

  return (
    <Card variant="outlined" padding="md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{server.name}</h3>
            <p className="text-sm text-gray-500">{server.region}</p>
          </div>
          <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${statusColors[server.status]}`}>
            {statusIcons[server.status]}
            <span className="ml-1">{server.status}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">CPU</span>
            <div className="flex items-center mt-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    server.cpu > 0.8 ? 'bg-danger-500' : 
                    server.cpu > 0.6 ? 'bg-accent-500' : 'bg-success-500'
                  }`}
                  style={{ width: `${server.cpu * 100}%` }}
                />
              </div>
              <span className="ml-2 font-medium">{Math.round(server.cpu * 100)}%</span>
            </div>
          </div>
          
          <div>
            <span className="text-gray-500">Memory</span>
            <div className="flex items-center mt-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    server.memory > 0.8 ? 'bg-danger-500' : 
                    server.memory > 0.6 ? 'bg-accent-500' : 'bg-success-500'
                  }`}
                  style={{ width: `${server.memory * 100}%` }}
                />
              </div>
              <span className="ml-2 font-medium">{Math.round(server.memory * 100)}%</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Connections</span>
            <p className="font-medium">{server.activeConnections.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-gray-500">Latency</span>
            <p className="font-medium">{server.avgLatencyMs}ms</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            Last seen: {new Date(server.lastHeartbeat).toLocaleTimeString()}
          </span>
          {onViewLogs && (
            <Button variant="ghost" size="sm" onClick={onViewLogs}>
              View Logs
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

// Icon Components
const TrendUpIcon = () => (
  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendDownIcon = () => (
  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const ExclamationTriangleIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const XCircleIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
);

const CogIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);