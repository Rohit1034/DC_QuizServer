// =======================================
// MODAL COMPONENT
// Online Quiz System - Modal Dialog
// =======================================

import React from 'react';
import type { ModalProps } from '../types';
import { Button } from './Button';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  children
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-modal overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
        
        {/* Modal Panel */}
        <div className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} transform transition-all duration-300 animate-slide-up`}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <XIcon />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
export const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info'
}) => {
  const variantIcons = {
    danger: <ExclamationTriangleIcon className="w-6 h-6 text-danger-600" />,
    warning: <ExclamationTriangleIcon className="w-6 h-6 text-accent-600" />,
    info: <InformationCircleIcon className="w-6 h-6 text-primary-600" />,
  };

  const variantColors = {
    danger: 'danger',
    warning: 'accent',
    info: 'primary',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          {variantIcons[variant]}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-600">{message}</p>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" size="md" onClick={onClose}>
            {cancelText}
          </Button>
          <Button 
            variant={variant === 'danger' ? 'danger' : 'primary'} 
            size="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Submit Quiz Confirmation Modal
export const SubmitQuizModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  timeRemaining: number;
  answeredQuestions: number;
  totalQuestions: number;
  markedForReview: number;
}> = ({
  isOpen,
  onClose,
  onSubmit,
  timeRemaining,
  answeredQuestions,
  totalQuestions,
  markedForReview
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const unansweredQuestions = totalQuestions - answeredQuestions;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Quiz" size="md">
      <div className="space-y-6">
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-accent-600" />
            <h4 className="font-medium text-accent-800">Are you sure you want to submit?</h4>
          </div>
          <p className="text-sm text-accent-700 mt-2">
            Once submitted, you cannot make any changes to your answers.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Time Remaining:</span>
              <span className={`font-medium ${timeRemaining < 120 ? 'text-danger-600' : 'text-gray-900'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Questions Answered:</span>
              <span className="font-medium text-gray-900">{answeredQuestions} / {totalQuestions}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Marked for Review:</span>
              <span className="font-medium text-accent-600">{markedForReview}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Unanswered:</span>
              <span className={`font-medium ${unansweredQuestions > 0 ? 'text-danger-600' : 'text-success-600'}`}>
                {unansweredQuestions}
              </span>
            </div>
          </div>
        </div>

        {unansweredQuestions > 0 && (
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <ExclamationCircleIcon className="w-5 h-5 text-danger-600" />
              <span className="text-sm font-medium text-danger-800">
                You have {unansweredQuestions} unanswered question{unansweredQuestions > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" size="md" onClick={onClose}>
            Review Answers
          </Button>
          <Button 
            variant="primary"
            size="md"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Submit Quiz
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Icon Components
const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const InformationCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

const ExclamationCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);