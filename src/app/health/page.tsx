// Simple health check page for monitoring
export default function HealthCheck() {
  const timestamp = new Date().toISOString();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Healthy</h1>
        <p className="text-gray-600 mb-4">
          Skincare Event Queue Manager is running properly.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <p><strong>Status:</strong> Operational</p>
          <p><strong>Timestamp:</strong> {timestamp}</p>
          <p><strong>Version:</strong> 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
