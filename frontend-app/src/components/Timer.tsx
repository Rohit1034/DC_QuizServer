// =======================================
// TIMER COMPONENT
// Online Quiz System - Quiz Timer
// =======================================

import React, { useEffect, useState } from 'react';
/* import type { TimerState } from '../../../frontend-ui-design/types'; */

export const Timer: React.FC<{
  timeRemaining: number; // in seconds
  warningThreshold?: number; // seconds
  criticalThreshold?: number; // seconds
  serverTimeOffset?: number; // difference between local and server time
  onTimeUp?: () => void;
  onWarning?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showMilliseconds?: boolean;
}> = ({
  timeRemaining,
  warningThreshold = 120, // 2 minutes
  criticalThreshold = 30, // 30 seconds
  serverTimeOffset = 0,
  onTimeUp,
  onWarning,
  size = 'md',
  showMilliseconds = false
}) => {
  const [displayTime, setDisplayTime] = useState(timeRemaining);
  const [isBlinking, setIsBlinking] = useState(false);

  // Update display time accounting for server offset
  useEffect(() => {
    const adjustedTime = Math.max(0, timeRemaining + serverTimeOffset);
    setDisplayTime(adjustedTime);
    
    if (adjustedTime <= criticalThreshold && adjustedTime > 0) {
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }
    
    if (adjustedTime === warningThreshold) {
      onWarning?.();
    }
    
    if (adjustedTime === 0) {
      onTimeUp?.();
    }
  }, [timeRemaining, serverTimeOffset, criticalThreshold, warningThreshold, onTimeUp, onWarning]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else if (showMilliseconds && seconds < 60) {
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };

  const getTimerColor = (): string => {
    if (displayTime <= criticalThreshold) return 'text-danger-600';
    if (displayTime <= warningThreshold) return 'text-accent-600';
    return 'text-primary-600';
  };

  const getBackgroundColor = (): string => {
    if (displayTime <= criticalThreshold) return 'bg-danger-50 border-danger-200';
    if (displayTime <= warningThreshold) return 'bg-accent-50 border-accent-200';
    return 'bg-primary-50 border-primary-200';
  };

  const sizeClasses = {
    sm: 'text-lg px-3 py-1',
    md: 'text-2xl px-4 py-2',
    lg: 'text-4xl px-6 py-3',
  };

  return (
    <div className={`inline-flex items-center space-x-2 rounded-lg border-2 font-mono font-bold transition-all duration-200 ${getBackgroundColor()} ${sizeClasses[size]} ${isBlinking ? 'animate-pulse' : ''}`}>
      <ClockIcon className={`w-5 h-5 ${getTimerColor()}`} />
      <span className={getTimerColor()}>
        {formatTime(displayTime)}
      </span>
      {serverTimeOffset !== 0 && (
        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <span className="text-xs text-gray-500">
            {serverTimeOffset > 0 ? '+' : ''}{Math.round(serverTimeOffset)}s
          </span>
        </div>
      )}
    </div>
  );
};

export const QuizProgress: React.FC<{
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
  markedForReview: number;
  variant?: 'default' | 'compact';
}> = ({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  markedForReview,
  variant = 'default'
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const answeredPercentage = (answeredQuestions / totalQuestions) * 100;

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">
          {currentQuestion} / {totalQuestions}
        </span>
        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-32">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Progress</h3>
        <span className="text-sm text-gray-600">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>Answered: {answeredQuestions}</span>
          <span>Review: {markedForReview}</span>
          <span>Remaining: {totalQuestions - answeredQuestions}</span>
        </div>
      </div>
    </div>
  );
};

export const QuestionNavigator: React.FC<{
  questions: Array<{
    id: string;
    number: number;
    answered: boolean;
    markedForReview: boolean;
  }>;
  currentQuestionId: string;
  onNavigate: (questionId: string) => void;
}> = ({ questions, currentQuestionId, onNavigate }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Question Navigator</h3>
      
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question) => {
          const isCurrent = question.id === currentQuestionId;
          const isAnswered = question.answered;
          const isMarked = question.markedForReview;
          
          let buttonClasses = 'w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all duration-200 ';
          
          if (isCurrent) {
            buttonClasses += 'bg-primary-600 border-primary-600 text-white ';
          } else if (isAnswered && isMarked) {
            buttonClasses += 'bg-accent-100 border-accent-300 text-accent-800 ';
          } else if (isAnswered) {
            buttonClasses += 'bg-success-100 border-success-300 text-success-800 ';
          } else if (isMarked) {
            buttonClasses += 'bg-gray-100 border-gray-300 text-gray-600 border-dashed ';
          } else {
            buttonClasses += 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 ';
          }
          
          return (
            <button
              key={question.id}
              onClick={() => onNavigate(question.id)}
              className={buttonClasses}
              title={`Question ${question.number}${isAnswered ? ' (Answered)' : ''}${isMarked ? ' (Marked for Review)' : ''}`}
            >
              {question.number}
            </button>
          );
        })}
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary-600 rounded border"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-success-100 border-success-300 border-2 rounded"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-accent-100 border-accent-300 border-2 rounded"></div>
          <span>Answered + Review</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 border-gray-300 border-2 border-dashed rounded"></div>
          <span>Marked for Review</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border-gray-300 border-2 rounded"></div>
          <span>Not Visited</span>
        </div>
      </div>
    </div>
  );
};

export const ConnectionStatus: React.FC<{
  isOnline: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'offline';
  lastSyncTime?: string;
  autoSaveStatus: 'saved' | 'saving' | 'failed' | 'pending';
}> = ({ isOnline, connectionQuality, lastSyncTime, autoSaveStatus }) => {
  const getStatusColor = () => {
    if (!isOnline) return 'bg-danger-500';
    switch (connectionQuality) {
      case 'excellent': return 'bg-success-500';
      case 'good': return 'bg-success-400';
      case 'poor': return 'bg-accent-500';
      default: return 'bg-danger-500';
    }
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    switch (connectionQuality) {
      case 'excellent': return 'Excellent Connection';
      case 'good': return 'Good Connection';
      case 'poor': return 'Poor Connection';
      default: return 'Offline';
    }
  };

  const getSaveStatusIcon = () => {
    switch (autoSaveStatus) {
      case 'saved':
        return <CheckIcon className="w-3 h-3 text-success-600" />;
      case 'saving':
        return <SpinnerIcon className="w-3 h-3 text-accent-600" />;
      case 'failed':
        return <ExclamationIcon className="w-3 h-3 text-danger-600" />;
      case 'pending':
        return <ClockIcon className="w-3 h-3 text-gray-600" />;
    }
  };

  return (
    <div className="flex items-center space-x-3 px-3 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${!isOnline ? 'animate-pulse' : ''}`} />
        <span className="text-sm font-medium text-gray-700">{getStatusText()}</span>
      </div>
      
      {/* Separator */}
      <div className="w-px h-4 bg-gray-300" />
      
      {/* Auto-save Status */}
      <div className="flex items-center space-x-2">
        {getSaveStatusIcon()}
        <span className="text-xs text-gray-600">
          {autoSaveStatus === 'saved' && 'Saved'}
          {autoSaveStatus === 'saving' && 'Saving...'}
          {autoSaveStatus === 'failed' && 'Save Failed'}
          {autoSaveStatus === 'pending' && 'Pending'}
        </span>
      </div>
      
      {/* Last Sync Time */}
      {lastSyncTime && (
        <>
          <div className="w-px h-4 bg-gray-300" />
          <span className="text-xs text-gray-500">
            {new Date(lastSyncTime).toLocaleTimeString()}
          </span>
        </>
      )}
    </div>
  );
};

// Icon Components
const ClockIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const SpinnerIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ExclamationIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);