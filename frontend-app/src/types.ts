// =======================================
// TYPESCRIPT INTERFACES & DATA MODELS
// Online Quiz System
// =======================================

import * as React from 'react';

// === USER & AUTHENTICATION ===
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
}

// === QUIZ STRUCTURES ===
export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  startTime: string; // ISO string
  endTime: string; // ISO string
  passingScore: number;
  shuffleQuestions: boolean;
  allowedAttempts: number;
  tags: string[];
  questions: Question[];
  totalQuestions: number;
  isPublished: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  type: 'single-choice' | 'multiple-choice' | 'short-answer' | 'code-input' | 'file-upload';
  question: string;
  options?: QuestionOption[];
  correctAnswers: string[];
  explanation?: string;
  points: number;
  timeLimit?: number; // override quiz time limit
  hasImage?: boolean;
  imageUrl?: string;
  codeBlock?: string;
  orderIndex: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

// === QUIZ ATTEMPTS ===
export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  startedAt: string;
  submittedAt?: string;
  timeSpent: number; // in seconds
  score?: number;
  totalScore: number;
  status: 'in-progress' | 'submitted' | 'abandoned' | 'time-expired';
  answers: AttemptAnswer[];
  serverId: string; // which server handled this attempt
  ipAddress: string;
  region: string;
  connectionLogs: ConnectionLog[];
}

export interface AttemptAnswer {
  questionId: string;
  selectedAnswers: string[];
  isMarkedForReview: boolean;
  timeSpent: number;
  isCorrect?: boolean;
  autoSaved: boolean;
  answeredAt: string;
}

export interface ConnectionLog {
  timestamp: string;
  event: 'connect' | 'disconnect' | 'reconnect' | 'auto-save' | 'submit';
  details?: string;
}

// === QUIZ RESULTS ===
export interface QuizResult {
  id: string;
  attemptId: string;
  quiz: Quiz;
  user: User;
  score: number;
  totalScore: number;
  percentage: number;
  timeSpent: number;
  questionsCorrect: number;
  totalQuestions: number;
  submittedAt: string;
  questionResults: QuestionResult[];
  weakAreas: string[];
  serverId: string;
}

export interface QuestionResult {
  question: Question;
  userAnswer: AttemptAnswer;
  isCorrect: boolean;
  pointsEarned: number;
  timeSpent: number;
}

// === SERVER MONITORING ===
export interface ServerStatus {
  id: string;
  name: string;
  region: string;
  ip: string;
  status: 'UP' | 'DEGRADED' | 'DOWN' | 'MAINTENANCE';
  cpu: number; // 0-1
  memory: number; // 0-1
  activeConnections: number;
  avgLatencyMs: number;
  requestsPerSecond: number;
  errorRate: number; // 0-1
  lastHeartbeat: string;
  uptime: number; // in seconds
  version: string;
}

export interface SystemMetrics {
  timestamp: string;
  totalRPS: number;
  avgLatency: number;
  errorRate: number;
  activeServers: number;
  totalActiveConnections: number;
  cpuUsageAcrossCluster: number;
  memoryUsageAcrossCluster: number;
}

export interface HealthEvent {
  id: string;
  timestamp: string;
  serverId: string;
  type: 'restart' | 'partition' | 'high-latency' | 'error-spike' | 'recovery';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  resolved: boolean;
  resolvedAt?: string;
}

// === SIMULATION & LOAD TESTING ===
export interface LoadTestConfig {
  virtualUsers: number;
  rampUpTimeSeconds: number;
  testDurationSeconds: number;
  targetRPS: number;
  scenario: 'quiz-taking' | 'login-stress' | 'mixed-load';
}

export interface NetworkPartitionConfig {
  affectedServers: string[];
  partitionType: 'latency-increase' | 'packet-drop' | 'full-isolation';
  severity: number; // 0-1
  durationSeconds: number;
}

export interface SimulationResult {
  id: string;
  type: 'load-test' | 'partition' | 'server-restart';
  config: LoadTestConfig | NetworkPartitionConfig;
  startedAt: string;
  completedAt?: string;
  status: 'running' | 'completed' | 'failed';
  metrics: {
    successRate: number;
    avgResponseTime: number;
    maxResponseTime: number;
    errorsCount: number;
    throughput: number;
  };
  events: HealthEvent[];
}

// === ANALYTICS & REPORTING ===
export interface DashboardStats {
  activeServers: number;
  totalQuizzes: number;
  activeAttempts: number;
  avgResponseTime: number;
  dailyAttempts: number;
  systemHealth: 'excellent' | 'good' | 'degraded' | 'critical';
  lastUpdated: string;
}

export interface ActivityFeedItem {
  id: string;
  timestamp: string;
  type: 'quiz-published' | 'attempt-started' | 'attempt-completed' | 'server-alert' | 'system-event';
  title: string;
  description: string;
  severity: 'info' | 'success' | 'warning' | 'danger';
  actionUrl?: string;
  userId?: string;
  quizId?: string;
  serverId?: string;
}

// === WEBSOCKET MESSAGES ===
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: string;
  id: string;
}

export interface QuizPublishedEvent extends WebSocketMessage {
  type: 'quiz.published';
  payload: {
    quizId: string;
    title: string;
    publishedBy: string;
  };
}

export interface AttemptStartedEvent extends WebSocketMessage {
  type: 'attempt.started';
  payload: {
    attemptId: string;
    quizId: string;
    userId: string;
    serverId: string;
  };
}

export interface AttemptProgressEvent extends WebSocketMessage {
  type: 'attempt.progress';
  payload: {
    attemptId: string;
    questionsCompleted: number;
    timeRemaining: number;
    currentQuestionId: string;
  };
}

export interface AttemptSubmittedEvent extends WebSocketMessage {
  type: 'attempt.submitted';
  payload: {
    attemptId: string;
    score: number;
    timeSpent: number;
    submittedAt: string;
  };
}

export interface ServerStatusUpdateEvent extends WebSocketMessage {
  type: 'server.status.update';
  payload: ServerStatus;
}

// === UI STATE INTERFACES ===
export interface QuizTakingState {
  currentQuestionIndex: number;
  answers: Map<string, AttemptAnswer>;
  timeRemaining: number;
  isOnline: boolean;
  lastSyncTime: string;
  markedForReview: Set<string>;
  isSubmitting: boolean;
  showSubmitConfirmation: boolean;
}

export interface TimerState {
  timeRemaining: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  serverTimeOffset: number; // difference between local and server time
  warningThreshold: number; // warn when time left is less than this (in seconds)
  criticalThreshold: number; // critical warning threshold
}

export interface ConnectionState {
  isOnline: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'offline';
  lastPingTime: number;
  reconnectAttempts: number;
  autoSaveStatus: 'saved' | 'saving' | 'failed' | 'pending';
}

// === FORM VALIDATION ===
export interface ValidationError {
  field: string;
  message: string;
  type: 'required' | 'format' | 'min' | 'max' | 'custom';
}

export interface FormState<T> {
  values: T;
  errors: ValidationError[];
  touched: Set<string>;
  isSubmitting: boolean;
  isValid: boolean;
}

// === RESPONSIVE BREAKPOINTS ===
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export interface ResponsiveProps {
  mobile?: any;
  tablet?: any;
  desktop?: any;
  wide?: any;
}

// === COMPONENT PROPS INTERFACES ===
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  children: React.ReactNode;
}

// === CHART DATA INTERFACES ===
export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
}

export interface LineChartData {
  datasets: {
    name: string;
    data: ChartDataPoint[];
    color: string;
  }[];
}

export interface BarChartData {
  categories: string[];
  series: {
    name: string;
    data: number[];
    color: string;
  }[];
}

export interface DonutChartData {
  labels: string[];
  data: number[];
  colors: string[];
}

// === NOTIFICATION INTERFACES ===
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationState {
  toasts: Toast[];
  maxToasts: number;
}

// === TABLE INTERFACES ===
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  sortBy?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  };
  loading?: boolean;
  emptyMessage?: string;
  selectable?: boolean;
  selectedRows?: Set<string>;
  onSelectionChange?: (selectedIds: Set<string>) => void;
}

// All interfaces are already exported above with 'export interface'