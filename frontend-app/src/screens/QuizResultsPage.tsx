// =======================================
// QUIZ RESULTS PAGE
// Online Quiz System - Detailed Results & Analysis
// =======================================

import React from 'react';
import { Header } from '../components/Header';
import { Card, KPICard } from '../components/Card';
import { Button } from '../components/Button';
// TODO: Replace with correct import if ProgressIndicator is available elsewhere

/**
 * QuizResultsPage Component
 * Displays comprehensive quiz results including score breakdown, performance analytics,
 * question-by-question review, and personalized recommendations.
 */
export const QuizResultsPage: React.FC = () => {
  const [currentUser] = React.useState({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'student' as const,
    avatar: '',
    createdAt: '2024-01-01',
  });

  const [showDetailedReview, setShowDetailedReview] = React.useState(false);
  // State for toggling detailed review and selecting questions
  const [selectedQuestion, setSelectedQuestion] = React.useState<number | null>(null);

  // Sample quiz results data containing quiz info, attempt details, and analytics
  const quizResults = {
    quiz: {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and control structures.',
      timeLimit: 45,
      totalQuestions: 25,
      passingScore: 70,
      maxScore: 50, // Total points possible
    },
    attempt: {
      id: 'attempt-1',
      startedAt: '2024-10-15T14:00:00Z',
      completedAt: '2024-10-15T14:32:15Z',
      duration: 1935, // seconds
      score: 42,
      percentage: 84,
      passed: true,
      answers: [
        {
          questionId: 1,
          question: 'What is the correct way to declare a variable in JavaScript?',
          type: 'multiple-choice',
          points: 2,
          userAnswer: ['var myVariable = "value";'],
          correctAnswer: ['var myVariable = "value";'],
          isCorrect: true,
          explanation: 'Variables in JavaScript can be declared using var, let, or const keywords.',
          timeSpent: 45
        },
        {
          questionId: 2,
          question: 'Which of the following is NOT a JavaScript data type?',
          type: 'multiple-choice',
          points: 2,
          userAnswer: ['Integer'],
          correctAnswer: ['Integer'],
          isCorrect: true,
          explanation: 'JavaScript has Number type, not specifically Integer. All numbers are of type Number.',
          timeSpent: 32
        },
        {
          questionId: 3,
          question: 'Which of the following are valid ways to create an array in JavaScript? (Select all that apply)',
          type: 'multiple-select',
          points: 3,
          userAnswer: ['let arr = [];', 'let arr = new Array();'],
          correctAnswer: ['let arr = [];', 'let arr = new Array();', 'let arr = Array();'],
          isCorrect: false,
          explanation: 'Arrays can be created using literal notation [], Array constructor, or Array() function.',
          timeSpent: 78
        },
        {
          questionId: 4,
          question: 'JavaScript is a statically typed language.',
          type: 'true-false',
          points: 1,
          userAnswer: ['False'],
          correctAnswer: ['False'],
          isCorrect: true,
          explanation: 'JavaScript is a dynamically typed language, not statically typed.',
          timeSpent: 15
        },
        {
          questionId: 5,
          question: 'Complete the code: function greet(name) { return "Hello, " + _____ + "!"; }',
          type: 'fill-blank',
          points: 2,
          userAnswer: ['name'],
          correctAnswer: ['name'],
          isCorrect: true,
          explanation: 'The parameter name should be concatenated to form the greeting string.',
          timeSpent: 28
        }
      ]
    },
    analytics: {
      correctAnswers: 4,
      incorrectAnswers: 1,
      averageTimePerQuestion: 39.6,
      fastestQuestion: 15,
      slowestQuestion: 78,
      strongTopics: ['Variables', 'Data Types', 'Functions'],
      weakTopics: ['Arrays', 'Advanced Concepts'],
      rank: 12,
      totalParticipants: 45,
      percentile: 73
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 70) return { level: 'Satisfactory', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 60) return { level: 'Needs Improvement', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const performance = getPerformanceLevel(quizResults.attempt.percentage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={currentUser} 
        currentRole="student"
        notificationCount={3}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full mb-4 ${performance.bg}`}>
            {quizResults.attempt.passed ? (
              <CheckCircleIcon className={`w-5 h-5 mr-2 ${performance.color}`} />
            ) : (
              <XCircleIcon className="w-5 h-5 mr-2 text-red-500" />
            )}
            <span className={`font-semibold ${performance.color}`}>
              {quizResults.attempt.passed ? 'Passed' : 'Failed'} - {performance.level}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quiz Results
          </h1>
          <h2 className="text-xl text-gray-600 mb-2">
            {quizResults.quiz.title}
          </h2>
          <p className="text-gray-500">
            Completed on {new Date(quizResults.attempt.completedAt).toLocaleDateString()} at {new Date(quizResults.attempt.completedAt).toLocaleTimeString()}
          </p>
        </div>

        {/* Score Overview */}
        <div className="mb-8">
          <Card variant="elevated" padding="lg">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-primary-600 mb-2">
                {quizResults.attempt.percentage}%
              </div>
              <div className="text-lg text-gray-600">
                {quizResults.attempt.score} out of {quizResults.quiz.maxScore} points
              </div>
            </div>

            <div className="mb-6">
              {/* TODO: Add a progress bar component here */}
              {/* <ProgressIndicator ... /> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600">
                  {quizResults.analytics.correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-danger-600">
                  {quizResults.analytics.incorrectAnswers}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {formatDuration(quizResults.attempt.duration)}
                </div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {quizResults.analytics.rank}
                </div>
                <div className="text-sm text-gray-600">Rank</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Breakdown */}
          <Card variant="elevated" padding="lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analysis</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Time per Question</span>
                <span className="font-medium">{formatTime(Math.round(quizResults.analytics.averageTimePerQuestion))}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fastest Question</span>
                <span className="font-medium text-success-600">{formatTime(quizResults.analytics.fastestQuestion)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Slowest Question</span>
                <span className="font-medium text-accent-600">{formatTime(quizResults.analytics.slowestQuestion)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Class Rank</span>
                <span className="font-medium">{quizResults.analytics.rank} of {quizResults.analytics.totalParticipants}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Percentile</span>
                <span className="font-medium text-primary-600">{quizResults.analytics.percentile}th</span>
              </div>
            </div>
          </Card>

          {/* Topic Performance */}
          <Card variant="elevated" padding="lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Performance</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-success-600 mb-2">Strong Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {quizResults.analytics.strongTopics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-success-100 text-success-800 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-danger-600 mb-2">Areas for Improvement</h4>
                <div className="flex flex-wrap gap-2">
                  {quizResults.analytics.weakTopics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-danger-100 text-danger-800 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Question Review */}
        <Card variant="elevated" padding="lg" className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Question Review</h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowDetailedReview(!showDetailedReview)}
            >
              {showDetailedReview ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>

          <div className="space-y-4">
            {quizResults.attempt.answers.map((answer, index) => (
              <div
                key={answer.questionId}
                className={`border rounded-lg p-4 ${
                  answer.isCorrect ? 'border-success-200 bg-success-50' : 'border-danger-200 bg-danger-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-white rounded text-sm font-medium">
                      Q{index + 1}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      answer.isCorrect ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'
                    }`}>
                      {answer.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {answer.points} pts
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTime(answer.timeSpent)}
                  </span>
                </div>

                <h4 className="font-medium text-gray-900 mb-2">
                  {answer.question}
                </h4>

                {showDetailedReview && (
                  <div className="space-y-3 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Your Answer:</p>
                      <div className="flex flex-wrap gap-2">
                        {answer.userAnswer.map((ans, idx) => (
                          <span key={idx} className={`px-2 py-1 rounded text-sm ${
                            answer.isCorrect ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'
                          }`}>
                            {ans}
                          </span>
                        ))}
                      </div>
                    </div>

                    {!answer.isCorrect && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Correct Answer:</p>
                        <div className="flex flex-wrap gap-2">
                          {answer.correctAnswer.map((ans, idx) => (
                            <span key={idx} className="px-2 py-1 bg-success-100 text-success-800 rounded text-sm">
                              {ans}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-white border border-gray-200 rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Explanation:</p>
                      <p className="text-sm text-gray-600">{answer.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="md">
            <RefreshIcon />
            Retake Quiz
          </Button>
          
          <Button variant="secondary" size="md">
            <DownloadIcon />
            Download Certificate
          </Button>
          
          <Button variant="ghost" size="md">
            <ShareIcon />
            Share Results
          </Button>
          
          <Button variant="ghost" size="md">
            Back to Quizzes
          </Button>
        </div>

        {/* Recommendations */}
        <Card variant="default" padding="lg" className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          
          <div className="space-y-4">
            {quizResults.attempt.passed ? (
              <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                <h4 className="font-medium text-success-800 mb-2">Congratulations!</h4>
                <p className="text-success-700 text-sm">
                  You've successfully passed this quiz with a {performance.level.toLowerCase()} performance. 
                  Consider taking more advanced topics or helping others in the discussion forums.
                </p>
              </div>
            ) : (
              <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
                <h4 className="font-medium text-danger-800 mb-2">Keep Learning!</h4>
                <p className="text-danger-700 text-sm">
                  Don't worry! Review the questions you missed and study the weak topics. 
                  You can retake this quiz to improve your score.
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Study Suggestions</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Review {quizResults.analytics.weakTopics.join(', ')} concepts</li>
                <li>• Practice more multiple-choice and fill-in-the-blank questions</li>
                <li>• Spend more time on complex topics</li>
                <li>• Join study groups for collaborative learning</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Icon Components
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);