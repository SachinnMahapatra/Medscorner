import toast from 'react-hot-toast';
import { AlertCircle, Check, Info, AlertTriangle } from 'lucide-react';
import React from 'react';

// Add custom animations for toast notifications
const toastStyles = {
  enter: 'transform transition ease-out duration-300 transform-gpu',
  enterFrom: 'opacity-0 translate-y-2 scale-95',
  enterTo: 'opacity-100 translate-y-0 scale-100',
  leave: 'transform transition ease-in duration-200 transform-gpu',
  leaveFrom: 'opacity-100 translate-y-0 scale-100',
  leaveTo: 'opacity-0 translate-y-1 scale-95',
};

// Success toast notification
export const showSuccess = (message) => {
  toast.custom((t) => (
    <div 
      className={`${
        t.visible ? `${toastStyles.enter} ${toastStyles.enterTo}` : `${toastStyles.leave} ${toastStyles.leaveTo}`
      } flex items-center bg-white px-4 py-3 rounded-lg shadow-lg max-w-md border-l-4 border-green-500`}
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-500 mr-4">
        <Check size={18} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">Success</h3>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  ), { duration: 1000, position: 'top-center' });
};

// Error toast notification
export const showError = (message) => {
  toast.custom((t) => (
    <div 
      className={`${
        t.visible ? `${toastStyles.enter} ${toastStyles.enterTo}` : `${toastStyles.leave} ${toastStyles.leaveTo}`
      } flex items-center bg-white px-4 py-3 rounded-lg shadow-lg max-w-md border-l-4 border-red-500`}
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-500 mr-4">
        <AlertCircle size={18} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">Error</h3>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  ), { duration: 1000, position: 'top-center' });
};

// Warning toast notification
export const showWarning = (message) => {
  toast.custom((t) => (
    <div 
      className={`${
        t.visible ? `${toastStyles.enter} ${toastStyles.enterTo}` : `${toastStyles.leave} ${toastStyles.leaveTo}`
      } flex items-center bg-white px-4 py-3 rounded-lg shadow-lg max-w-md border-l-4 border-yellow-500`}
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 text-yellow-500 mr-4">
        <AlertTriangle size={18} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">Warning</h3>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  ), { duration: 1000, position: 'top-center' });
};

// Info toast notification
export const showInfo = (message) => {
  toast.custom((t) => (
    <div 
      className={`${
        t.visible ? `${toastStyles.enter} ${toastStyles.enterTo}` : `${toastStyles.leave} ${toastStyles.leaveTo}`
      } flex items-center bg-white px-4 py-3 rounded-lg shadow-lg max-w-md border-l-4 border-blue-500`}
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-500 mr-4">
        <Info size={18} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">Information</h3>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  ), { duration: 1000, position: 'top-center' });
};

// Login required notification
export const showLoginRequired = () => {
  toast.custom((t) => (
    <div 
      className={`${
        t.visible ? `${toastStyles.enter} ${toastStyles.enterTo}` : `${toastStyles.leave} ${toastStyles.leaveTo}`
      } flex items-center bg-white px-4 py-3 rounded-lg shadow-lg max-w-md border-l-4 border-red-500`}
    >
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-500 mr-4">
        <AlertCircle size={18} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">Login Required</h3>
        <p className="text-sm text-gray-600">Please login to use this feature</p>
      </div>
    </div>
  ), { duration: 1000, position: 'top-center' });
};

// Add any other specialized notifications you need here 