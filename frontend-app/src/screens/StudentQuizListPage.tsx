// =======================================
// STUDENT QUIZ LIST PAGE
// Online Quiz System - Available Quizzes
// =======================================

import React from 'react';
import { Header, Sidebar } from '../components/Header';
import { Card, QuizCard } from '../components/Card';
import { Button } from '../components/Button';
import { Input, Select } from '../components/Form';
import { Timer } from '../components/Timer';

interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  totalQuestions: number;
  startTime: string;
  endTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  subject: string;
  status: 'available' | 'completed' | 'in-progress';
  attempts: number;
  maxAttempts: number;
  passingScore: number;
  lastScore?: number;
  completedAt?: string;
}

export const StudentQuizListPage: React.FC = () => {
  const [currentUser] = React.useState({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'student' as const,
    avatar: '',
    createdAt: '2024-01-01',
  });

  const [selectedTab, setSelectedTab] = React.useState<'available' | 'completed' | 'in-progress'>('available');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterSubject, setFilterSubject] = React.useState('');
  const [filterDifficulty, setFilterDifficulty] = React.useState('');

  // Sample quiz data
  const sampleQuizzes: Quiz[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and control structures.',
      timeLimit: 45,
      totalQuestions: 25,
      startTime: '2024-10-01T09:00:00Z',
      endTime: '2024-10-31T23:59:59Z',
      difficulty: 'Beginner',
      subject: 'Programming',
      status: 'available',
      attempts: 0,
      maxAttempts: 3,
      passingScore: 70,
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      description: 'Explore advanced React concepts including hooks, context, and performance optimization.',
      timeLimit: 60,
      totalQuestions: 30,
      startTime: '2024-10-01T09:00:00Z',
      endTime: '2024-10-31T23:59:59Z',
      difficulty: 'Advanced',
      subject: 'Programming',
      status: 'available',
      attempts: 1,
      maxAttempts: 2,
      passingScore: 75,
    },
    {
      id: '3',
      title: 'Database Design Principles',
      description: 'Learn about database normalization, relationships, and query optimization.',
      timeLimit: 90,
      totalQuestions: 35,
      startTime: '2024-09-15T09:00:00Z',
      endTime: '2024-10-15T23:59:59Z',
      difficulty: 'Intermediate',
      subject: 'Database',
      status: 'in-progress',
      attempts: 1,
      maxAttempts: 3,
      passingScore: 80,
      lastScore: 65,
    },
    {
      id: '4',
      title: 'Web Security Best Practices',
      description: 'Understanding common security vulnerabilities and how to prevent them.',
      timeLimit: 75,
      totalQuestions: 40,
      startTime: '2024-09-01T09:00:00Z',
      endTime: '2024-09-30T23:59:59Z',
      difficulty: 'Advanced',
      subject: 'Security',
      status: 'completed',
      attempts: 2,
      maxAttempts: 3,
      passingScore: 85,
      lastScore: 92,
      completedAt: '2024-09-25T14:30:00Z',
    },
  ];

  const filteredQuizzes = sampleQuizzes.filter(quiz => {
    const matchesTab = selectedTab === 'available' ? quiz.status === 'available' :
                     selectedTab === 'completed' ? quiz.status === 'completed' :
                     quiz.status === 'in-progress';
    
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = !filterSubject || quiz.subject === filterSubject;
    const matchesDifficulty = !filterDifficulty || quiz.difficulty === filterDifficulty;
    
    return matchesTab && matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleStartQuiz = (quizId: string) => {
    console.log('Starting quiz:', quizId);
    // Navigate to quiz taking page
  };

  const handleResumeQuiz = (quizId: string) => {
    console.log('Resuming quiz:', quizId);
    // Navigate to quiz taking page with current progress
  };

  const handleViewResults = (quizId: string) => {
    console.log('Viewing results for quiz:', quizId);
    // Navigate to results page
  };

  const getTabCounts = () => {
    return {
      available: sampleQuizzes.filter(q => q.status === 'available').length,
      inProgress: sampleQuizzes.filter(q => q.status === 'in-progress').length,
      completed: sampleQuizzes.filter(q => q.status === 'completed').length,
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={currentUser} 
        currentRole="student"
        notificationCount={3}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Quizzes</h1>
          <p className="text-gray-600">
            Track your progress and access available assessments.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card variant="elevated" padding="md">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {tabCounts.available}
              </div>
              <div className="text-sm text-gray-600">Available Quizzes</div>
            </div>
          </Card>
          
          <Card variant="elevated" padding="md">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600 mb-1">
                {tabCounts.inProgress}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </Card>
          
          <Card variant="elevated" padding="md">
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600 mb-1">
                {tabCounts.completed}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </Card>
          
          <Card variant="elevated" padding="md">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.round(sampleQuizzes.filter(q => q.lastScore).reduce((acc, q) => acc + (q.lastScore || 0), 0) / sampleQuizzes.filter(q => q.lastScore).length) || 0}%
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card variant="default" padding="md" className="mb-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search quizzes by title or description..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  leftIcon={<SearchIcon />}
                />
              </div>
              <div className="flex gap-4">
                <Select
                  options={[
                    { value: '', label: 'All Subjects' },
                    { value: 'Programming', label: 'Programming' },
                    { value: 'Database', label: 'Database' },
                    { value: 'Security', label: 'Security' },
                    { value: 'Design', label: 'Design' },
                  ]}
                  value={filterSubject}
                  onChange={setFilterSubject}
                  placeholder="Subject"
                />
                <Select
                  options={[
                    { value: '', label: 'All Levels' },
                    { value: 'Beginner', label: 'Beginner' },
                    { value: 'Intermediate', label: 'Intermediate' },
                    { value: 'Advanced', label: 'Advanced' },
                  ]}
                  value={filterDifficulty}
                  onChange={setFilterDifficulty}
                  placeholder="Difficulty"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: 'available', label: 'Available', count: tabCounts.available },
              { key: 'in-progress', label: 'In Progress', count: tabCounts.inProgress },
              { key: 'completed', label: 'Completed', count: tabCounts.completed },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedTab === tab.key
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedTab === tab.key
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quiz List */}
        <div className="space-y-6">
          {filteredQuizzes.length === 0 ? (
            <Card variant="default" padding="lg">
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <QuizEmptyIcon />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No quizzes found
                </h3>
                <p className="text-gray-600">
                  {selectedTab === 'available' && 'No quizzes are currently available.'}
                  {selectedTab === 'in-progress' && 'You don\'t have any quizzes in progress.'}
                  {selectedTab === 'completed' && 'You haven\'t completed any quizzes yet.'}
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredQuizzes.map((quiz) => (
                <QuizListCard
                  key={quiz.id}
                  quiz={quiz}
                  onStart={() => handleStartQuiz(quiz.id)}
                  onResume={() => handleResumeQuiz(quiz.id)}
                  onViewResults={() => handleViewResults(quiz.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Quiz Card for List View
const QuizListCard: React.FC<{
  quiz: Quiz;
  onStart: () => void;
  onResume: () => void;
  onViewResults: () => void;
}> = ({ quiz, onStart, onResume, onViewResults }) => {

  const isExpired = new Date() > new Date(quiz.endTime);
  const isActive = new Date() >= new Date(quiz.startTime) && new Date() <= new Date(quiz.endTime);
  
  const difficultyColors = {
    Beginner: 'bg-success-100 text-success-800',
    Intermediate: 'bg-accent-100 text-accent-800',
    Advanced: 'bg-danger-100 text-danger-800',
  };

  return (
    <Card variant="elevated" padding="md" className="hover:shadow-lg transition-all duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {quiz.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {quiz.description}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[quiz.difficulty]}`}>
              {quiz.difficulty}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {quiz.subject}
            </span>
          </div>
        </div>

        {/* Quiz Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <ClockIcon />
            <span className="text-gray-600">{quiz.timeLimit} minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <QuestionIcon />
            <span className="text-gray-600">{quiz.totalQuestions} questions</span>
          </div>
          <div className="flex items-center space-x-2">
            <TargetIcon />
            <span className="text-gray-600">Pass: {quiz.passingScore}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <RefreshIcon />
            <span className="text-gray-600">{quiz.attempts}/{quiz.maxAttempts} attempts</span>
          </div>
        </div>

        {/* Status and Score */}
        {quiz.status === 'completed' && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-success-800">
               Completed on {quiz.completedAt ? new Date(quiz.completedAt).toLocaleDateString() : 'N/A'}

              </span>
              <span className={`text-sm font-medium ${
                (quiz.lastScore ?? 0) >= quiz.passingScore ? 'text-success-600' : 'text-danger-600'
              }`}>
                Score: {quiz.lastScore ?? 0}%
              </span>
            </div>
          </div>
        )}

        {quiz.status === 'in-progress' && (
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-accent-800">
                In Progress
              </span>
              {quiz.lastScore && (
                <span className="text-sm text-accent-600">
                  Current: {quiz.lastScore}%
                </span>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="text-xs text-gray-500">
          <div>Available: {new Date(quiz.startTime).toLocaleDateString()} - {new Date(quiz.endTime).toLocaleDateString()}</div>
          {isExpired && <div className="text-danger-600 font-medium">Expired</div>}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {quiz.status === 'available' && (
            <Button
              variant={isActive ? 'primary' : 'secondary'}
              size="sm"
              disabled={!isActive || quiz.attempts >= quiz.maxAttempts}
              onClick={onStart}
            >
              {!isActive ? 'Not Available' : 
               quiz.attempts >= quiz.maxAttempts ? 'No Attempts Left' : 
               'Start Quiz'}
            </Button>
          )}
          
          {quiz.status === 'in-progress' && (
            <Button
              variant="primary"
              size="sm"
              onClick={onResume}
            >
              Resume Quiz
            </Button>
          )}
          
          {quiz.status === 'completed' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onViewResults}
            >
              View Results
            </Button>
          )}
          
          {quiz.status === 'available' && quiz.attempts < quiz.maxAttempts && (
            <Button variant="ghost" size="sm">
              <InfoIcon />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

// Icon Components
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const QuizEmptyIcon = () => (
  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);