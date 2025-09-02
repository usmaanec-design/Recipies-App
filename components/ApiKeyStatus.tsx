import React from 'react';

interface ApiKeyStatusProps {
  apiKey?: string;
}

const ApiKeyStatus: React.FC<ApiKeyStatusProps> = ({ apiKey }) => {
  const isSet = apiKey && apiKey.length > 0;
  const statusText = isSet 
    ? `API Key is set (showing first 5 chars: ${apiKey.substring(0, 5)}...)`
    : 'API Key is not set. Please check your .env file.';

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-slate-200 text-sm">
      <h4 className="font-bold text-slate-700 mb-2">API Key Status</h4>
      <p className={`flex items-center ${isSet ? 'text-green-600' : 'text-red-600'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          {isSet ? (
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          )}
        </svg>
        {statusText}
      </p>
      <p className="text-slate-500 mt-1 text-xs">Check the browser console for more details.</p>
    </div>
  );
};

export default ApiKeyStatus;
