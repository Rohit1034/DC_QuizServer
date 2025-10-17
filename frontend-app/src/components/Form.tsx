// =======================================
// FORM COMPONENTS
// Online Quiz System - Form Elements
// =======================================

import React from 'react';

// Basic Input Component
export const Input: React.FC<{
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  size = 'md',
  leftIcon,
  rightIcon,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'input-height-sm text-sm',
    md: 'input-height-md text-base',
    lg: 'input-height-lg text-lg',
  };

  const baseClasses = [
    'w-full',
    'border',
    'border-gray-300',
    'rounded-lg',
    'px-4',
    'transition-all',
    'duration-200',
    'focus:ring-2',
    'focus:ring-primary-500',
    'focus:border-transparent',
    'disabled:bg-gray-50',
    'disabled:cursor-not-allowed',
    sizeClasses[size]
  ];

  if (error) {
    baseClasses.push('border-danger-500', 'focus:ring-danger-500');
  }

  if (leftIcon) {
    baseClasses.push('pl-10');
  }

  if (rightIcon) {
    baseClasses.push('pr-10');
  }

  const inputClasses = [...baseClasses, className].join(' ');

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          className={inputClasses}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-danger-600 flex items-center">
          <ExclamationCircleIcon />
          <span className="ml-1">{error}</span>
        </p>
      )}
    </div>
  );
};

// Textarea Component
export const Textarea: React.FC<{
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
}> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  className = ''
}) => {
  const baseClasses = [
    'w-full',
    'border',
    'border-gray-300',
    'rounded-lg',
    'px-4',
    'py-3',
    'text-base',
    'transition-all',
    'duration-200',
    'focus:ring-2',
    'focus:ring-primary-500',
    'focus:border-transparent',
    'disabled:bg-gray-50',
    'disabled:cursor-not-allowed',
    'resize-vertical'
  ];

  if (error) {
    baseClasses.push('border-danger-500', 'focus:ring-danger-500');
  }

  const textareaClasses = [...baseClasses, className].join(' ');

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={textareaClasses}
      />
      
      {maxLength && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>
            {value?.length || 0} / {maxLength} characters
          </span>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-danger-600 flex items-center">
          <ExclamationCircleIcon />
          <span className="ml-1">{error}</span>
        </p>
      )}
    </div>
  );
};

// Select Component
export const Select: React.FC<{
  label?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'input-height-sm text-sm',
    md: 'input-height-md text-base',
    lg: 'input-height-lg text-lg',
  };

  const baseClasses = [
    'w-full',
    'border',
    'border-gray-300',
    'rounded-lg',
    'px-4',
    'pr-10',
    'transition-all',
    'duration-200',
    'focus:ring-2',
    'focus:ring-primary-500',
    'focus:border-transparent',
    'disabled:bg-gray-50',
    'disabled:cursor-not-allowed',
    'appearance-none',
    'bg-white',
    sizeClasses[size]
  ];

  if (error) {
    baseClasses.push('border-danger-500', 'focus:ring-danger-500');
  }

  const selectClasses = [...baseClasses, className].join(' ');

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          className={selectClasses}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon />
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-danger-600 flex items-center">
          <ExclamationCircleIcon />
          <span className="ml-1">{error}</span>
        </p>
      )}
    </div>
  );
};

// Checkbox Component
export const Checkbox: React.FC<{
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({
  label,
  checked = false,
  onChange,
  error,
  required = false,
  disabled = false,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const checkboxClasses = [
    sizeClasses[size],
    'text-primary-600',
    'border-gray-300',
    'rounded',
    'focus:ring-2',
    'focus:ring-primary-500',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50'
  ].join(' ');

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          required={required}
          className={checkboxClasses}
        />
        {label && (
          <span className="text-sm font-medium text-gray-700 select-none">
            {label}
            {required && <span className="text-danger-500 ml-1">*</span>}
          </span>
        )}
      </label>
      
      {error && (
        <p className="text-sm text-danger-600 flex items-center ml-8">
          <ExclamationCircleIcon />
          <span className="ml-1">{error}</span>
        </p>
      )}
    </div>
  );
};

// Radio Group Component
export const RadioGroup: React.FC<{
  label?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  direction = 'vertical',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const radioClasses = [
    sizeClasses[size],
    'text-primary-600',
    'border-gray-300',
    'focus:ring-2',
    'focus:ring-primary-500',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50'
  ].join(' ');

  const containerClasses = direction === 'horizontal' 
    ? 'flex flex-wrap gap-4' 
    : 'space-y-3';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={containerClasses}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={disabled || option.disabled}
              required={required}
              className={radioClasses}
            />
            <span className="text-sm font-medium text-gray-700 select-none">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-danger-600 flex items-center">
          <ExclamationCircleIcon />
          <span className="ml-1">{error}</span>
        </p>
      )}
    </div>
  );
};

// File Upload Component
export const FileUpload: React.FC<{
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFileSelect?: (files: FileList | null) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  preview?: boolean;
  className?: string;
}> = ({
  label,
  accept,
  multiple = false,
  maxSize = 10,
  onFileSelect,
  error,
  required = false,
  disabled = false,
  preview = false,
  className = ''
}) => {
  const [dragOver, setDragOver] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      onFileSelect?.(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const dropzoneClasses = [
    'border-2',
    'border-dashed',
    'rounded-lg',
    'p-6',
    'text-center',
    'transition-all',
    'duration-200',
    'cursor-pointer',
    dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300',
    disabled ? 'cursor-not-allowed opacity-50' : 'hover:border-primary-400 hover:bg-gray-50',
    error ? 'border-danger-500' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div
        className={dropzoneClasses}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileChange(e.target.files)}
          disabled={disabled}
          required={required}
          className="hidden"
        />
        
        <div className="space-y-2">
          <UploadIcon />
          <div>
            <p className="text-sm font-medium text-gray-700">
              Drop files here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              {accept && `Accepted formats: ${accept}`}
              {maxSize && ` • Max size: ${maxSize}MB`}
            </p>
          </div>
        </div>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Selected Files:</h4>
          <div className="space-y-1">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-danger-600 flex items-center">
          <ExclamationCircleIcon />
          <span className="ml-1">{error}</span>
        </p>
      )}
    </div>
  );
};

// Form Validation Hook
export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) => {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [touched, setTouched] = React.useState<Set<keyof T>>(new Set());

  const validateField = (field: keyof T, value: any): string | null => {
    const rule = validationRules[field];
    return rule ? rule(value) : null;
  };

  const setFieldValue = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Validate field if it has been touched
    if (touched.has(field)) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error || ''
      }));
    }
  };

  const setFieldTouched = (field: keyof T) => {
    setTouched(prev => new Set(prev).add(field));
    
    // Validate field when touched
    const error = validateField(field, values[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error || ''
    }));
  };

  const validateAll = (): boolean => {
    const allErrors: Record<keyof T, string> = {} as Record<keyof T, string>;
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field as keyof T, values[field as keyof T]);
      if (error) {
        allErrors[field as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(allErrors);
    setTouched(new Set(Object.keys(validationRules) as (keyof T)[]));
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouched(new Set());
  };

  const isValid = Object.values(errors).every(error => !error);

  return {
    values,
    errors,
    touched,
    isValid,
    setFieldValue,
    setFieldTouched,
    validateAll,
    reset
  };
};

// Icon Components
const ExclamationCircleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);