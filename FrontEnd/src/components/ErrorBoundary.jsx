import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-red-600" size={32} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {error.status === 404 ? "Page Not Found" : "Unexpected Application Error!"}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {error.status === 404 
            ? "The page you're looking for doesn't exist or has been moved."
            : "We're sorry, something went wrong. Please try again later or contact support if the problem persists."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Home size={18} className="mr-2" />
            Return Home
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
          >
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Error details: {error.statusText || error.message}</p>
      </div>
    </div>
  );
};

export default ErrorBoundary; 