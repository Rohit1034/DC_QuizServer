// =======================================
// QUIZ TAKING PAGE
// Online Quiz System - Active Quiz Interface
// =======================================

import React from 'react';
import { QuizProgress } from '../components/Timer';
import { Timer } from '../components/Timer';
// import { ProgressIndicator } from '../components/ProgressIndicator';
// TODO: Uncomment and fix the path below if ProgressIndicator exists elsewhere
// import { ProgressIndicator } from '../components/YourCorrectPath/ProgressIndicator';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

export const QuizTakingPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, string[]>>({});
  const [timeRemaining, setTimeRemaining] = React.useState(2700); // 45 minutes in seconds
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState(false);
  const [isFlagged, setIsFlagged] = React.useState<Record<number, boolean>>({});
  const [showReview, setShowReview] = React.useState(false);

  // Sample quiz data
  const quizData = {
    id: '1',
    title: 'JavaScript Fundamentals',
    timeLimit: 45,
    totalQuestions: 25,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the correct way to declare a variable in JavaScript?',
        options: [
          'var myVariable = "value";',
          'variable myVariable = "value";',
          'v myVariable = "value";',
          'declare myVariable = "value";'
        ],
        correctAnswer: ['var myVariable = "value";'],
        points: 2,
        explanation: 'Variables in JavaScript can be declared using var, let, or const keywords.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Which of the following is NOT a JavaScript data type?',
        options: [
          'String',
          'Boolean',
          'Integer',
          'Object'
        ],
        correctAnswer: ['Integer'],
        points: 2,
        explanation: 'JavaScript has Number type, not specifically Integer. All numbers are of type Number.'
      },
      {
        id: 3,
        type: 'multiple-select',
        question: 'Which of the following are valid ways to create an array in JavaScript? (Select all that apply)',
        options: [
          'let arr = [];',
          'let arr = new Array();',
          'let arr = Array();',
          'let arr = createArray();'
        ],
        correctAnswer: ['let arr = [];', 'let arr = new Array();', 'let arr = Array();'],
        points: 3,
        explanation: 'Arrays can be created using literal notation [], Array constructor, or Array() function.'
      },
      {
        id: 4,
        type: 'true-false',
        question: 'JavaScript is a statically typed language.',
        options: ['True', 'False'],
        correctAnswer: ['False'],
        points: 1,
        explanation: 'JavaScript is a dynamically typed language, not statically typed.'
      },
      {
        id: 5,
        type: 'fill-blank',
        question: 'Complete the code: function greet(name) { return "Hello, " + _____ + "!"; }',
        options: [],
        correctAnswer: ['name'],
        points: 2,
        explanation: 'The parameter name should be concatenated to form the greeting string.'
      }
    ]
  };

  const currentQuestionData = quizData.questions[currentQuestion];
  const totalQuestions = quizData.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number, option: string) => {
    const questionId = currentQuestion;
    const isMultiSelect = currentQuestionData.type === 'multiple-select';
    
    if (isMultiSelect) {
      const currentAnswers = selectedAnswers[questionId] || [];
      const isSelected = currentAnswers.includes(option);
      
      if (isSelected) {
        // Remove the option
        setSelectedAnswers(prev => ({
          ...prev,
          [questionId]: currentAnswers.filter(answer => answer !== option)
        }));
      } else {
        // Add the option
        setSelectedAnswers(prev => ({
          ...prev,
          [questionId]: [...currentAnswers, option]
        }));
      }
    } else {
      // Single select
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: [option]
      }));
    }
  };

  // Handle text input for fill-in-the-blank
  const handleTextInput = (value: string) => {
    const questionId = currentQuestion;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: [value]
    }));
  };

  // Navigation functions
  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  // Flag question
  const toggleFlag = () => {
    setIsFlagged(prev => ({
      ...prev,
      [currentQuestion]: !prev[currentQuestion]
    }));
  };

  // Get question status
  const getQuestionStatus = (index: number) => {
    const hasAnswer = selectedAnswers[index] && selectedAnswers[index].length > 0;
    const flagged = isFlagged[index];
    
    if (flagged && hasAnswer) return 'flagged-answered';
    if (flagged) return 'flagged';
    if (hasAnswer) return 'answered';
    return 'unanswered';
  };

  // Submit quiz
  const handleSubmit = () => {
    setIsSubmitModalOpen(true);
  };

  const confirmSubmit = () => {
    console.log('Submitting quiz with answers:', selectedAnswers);
    // Navigate to results page
  };

  // Format time remaining
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate answered questions
  const answeredCount = Object.keys(selectedAnswers).length;
  const flaggedCount = Object.values(isFlagged).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Quiz Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{quizData.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Timer */}
              <div className="flex items-center space-x-2">
                <ClockIcon />
                <div className="text-right">
                  <div className={`text-lg font-bold ${timeRemaining <= 300 ? 'text-danger-600' : 'text-gray-900'}`}>
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="text-xs text-gray-500">Time Left</div>
                </div>
              </div>

              {/* Progress */}
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {answeredCount}/{totalQuestions}
                  </div>
                  <div className="text-xs text-gray-500">Answered</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <QuizProgress
              currentQuestion={currentQuestion + 1}
              totalQuestions={totalQuestions}
              answeredQuestions={answeredCount}
              markedForReview={flaggedCount}
              variant="default"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Question Navigation Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card variant="elevated" padding="md" className="sticky top-24">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Questions</h3>
                
                {/* Question Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {quizData.questions.map((_, index) => {
                    const status = getQuestionStatus(index);
                    const isCurrentQuestion = index === currentQuestion;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => goToQuestion(index)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isCurrentQuestion
                            ? 'bg-primary-600 text-white ring-2 ring-primary-300'
                            : status === 'answered'
                            ? 'bg-success-100 text-success-700 hover:bg-success-200'
                            : status === 'flagged'
                            ? 'bg-accent-100 text-accent-700 hover:bg-accent-200'
                            : status === 'flagged-answered'
                            ? 'bg-accent-500 text-white hover:bg-accent-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success-100 rounded"></div>
                    <span className="text-gray-600">Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent-100 rounded"></div>
                    <span className="text-gray-600">Flagged</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-100 rounded"></div>
                    <span className="text-gray-600">Not Answered</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-gray-200 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Answered:</span>
                    <span className="font-medium">{answeredCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flagged:</span>
                    <span className="font-medium">{flaggedCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-medium">{totalQuestions - answeredCount}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReview(true)}
                  >
                    <ReviewIcon />
                    Review All
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleSubmit}
                  >
                    Submit Quiz
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Question Area */}
          <div className="flex-1">
            <Card variant="elevated" padding="lg">
              <div className="space-y-6">
                {/* Question Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-medium">
                        Question {currentQuestion + 1}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                        {currentQuestionData.points} {currentQuestionData.points === 1 ? 'point' : 'points'}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm capitalize">
                        {currentQuestionData.type.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFlag}
                  >
                    <span className={isFlagged[currentQuestion] ? 'text-accent-600' : 'text-gray-400'}>
                      <FlagIcon />
                      {isFlagged[currentQuestion] ? 'Flagged' : 'Flag'}
                    </span>
                  </Button>
                </div>

                {/* Question */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
                    {currentQuestionData.question}
                  </h2>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestionData.type === 'fill-blank' ? (
                    <div>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Type your answer here..."
                        value={selectedAnswers[currentQuestion]?.[0] || ''}
                        onChange={(e) => handleTextInput(e.target.value)}
                      />
                    </div>
                  ) : (
                    currentQuestionData.options.map((option, index) => {
                      const isSelected = selectedAnswers[currentQuestion]?.includes(option);
                      const isMultiSelect = currentQuestionData.type === 'multiple-select';
                      
                      return (
                        <label
                          key={index}
                          className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type={isMultiSelect ? 'checkbox' : 'radio'}
                            name={`question-${currentQuestion}`}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(index, option)}
                            className="mt-0.5 h-4 w-4 text-primary-600"
                          />
                          <span className="text-gray-900 leading-relaxed">{option}</span>
                        </label>
                      );
                    })
                  )}
                </div>

                {/* Instructions for multi-select */}
                {currentQuestionData.type === 'multiple-select' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <InfoIcon className="inline w-4 h-4 mr-1" />
                      Select all answers that apply to this question.
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="secondary"
                size="md"
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeftIcon />
                Previous
              </Button>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFlag}
                >
                  <span className={isFlagged[currentQuestion] ? 'text-accent-600' : ''}>
                    <FlagIcon />
                    {isFlagged[currentQuestion] ? 'Unflag' : 'Flag for Review'}
                  </span>
                </Button>
                
                <span className="text-sm text-gray-500">
                  {currentQuestion + 1} of {totalQuestions}
                </span>
              </div>

              {currentQuestion === totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSubmit}
                >
                  Submit Quiz
                  <CheckIcon />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={goToNext}
                >
                  Next
                  <ArrowRightIcon />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Quiz"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to submit your quiz? You won't be able to make changes after submission.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Questions:</span>
              <span className="font-medium">{totalQuestions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Answered:</span>
              <span className="font-medium text-success-600">{answeredCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Unanswered:</span>
              <span className="font-medium text-danger-600">{totalQuestions - answeredCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Flagged for Review:</span>
              <span className="font-medium text-accent-600">{flaggedCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Time Remaining:</span>
              <span className="font-medium">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          {totalQuestions - answeredCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                <WarningIcon className="inline w-4 h-4 mr-1" />
                You have {totalQuestions - answeredCount} unanswered questions. They will be marked as incorrect.
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Continue Quiz
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={confirmSubmit}
            >
              Submit Final Answers
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Icon Components
const ClockIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FlagIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 2H21l-3 6 3 6h-8.5l-1-2H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ReviewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className ?? "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);