import React, { useState, useEffect } from 'react';
import { FaServer, FaExclamationCircle, FaRedoAlt, FaHistory, FaEnvelope, FaHeadset, FaCheckCircle, FaCircleNotch } from 'react-icons/fa';

const ServerDown = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [retryStatus, setRetryStatus] = useState('idle');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRetry = () => {
    setRetryStatus('loading');
    setTimeout(() => {
      setRetryStatus('failed');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full server-down">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                <FaServer className="text-red-500 text-5xl" />
              </div>
            </div>
            <div className="text-center mt-6">
              <h2 className="text-2xl font-bold text-gray-800">Server Unavailable</h2>
              <p className="text-gray-600 mt-3">
                We're experiencing technical difficulties. Our team is working to restore service as quickly as possible.
              </p>
            </div>
            <div className="mt-8 bg-red-50 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationCircle className="text-red-400 mt-1" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">What happened?</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>The server is not responding to requests. This could be due to maintenance, high traffic, or an unexpected issue.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700">Suggested steps:</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <FaRedoAlt className="text-blue-500 mr-2" />
                  <span>Refresh the page in a few moments</span>
                </li>
                <li className="flex items-center">
                  <FaHistory className="text-blue-500 mr-2" />
                  <span>Check our status page for updates</span>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="text-blue-500 mr-2" />
                  <span>Contact support if the problem persists</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 flex space-x-4">
              <button
                onClick={handleRetry}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center ${
                  retryStatus === 'failed'
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {retryStatus === 'loading' ? (
                  <>
                    <FaCircleNotch className="animate-spin mr-2" />
                    Trying...
                  </>
                ) : retryStatus === 'failed' ? (
                  <>
                    <FaCheckCircle className="mr-2" />
                    Still Down
                  </>
                ) : (
                  <>
                    <FaRedoAlt className="mr-2" />
                    Retry Connection
                  </>
                )}
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center">
                <FaHeadset className="mr-2" />
                Support
              </button>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Error Code: 503 Service Unavailable</p>
              <p className="text-xs text-gray-500">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerDown;