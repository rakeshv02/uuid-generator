import React, { useState } from 'react';
export default function App() {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(null);

  const generateUUID = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      newUuids.push(uuid);
    }
    setUuids(newUuids);
  };

  const copyToClipboard = (uuid, idx) => {
    navigator.clipboard.writeText(uuid);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-4">
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">UUID Generator</h1>
        <p className="text-gray-400 mb-8">Generate unique UUIDs (v4) instantly. Perfect for database IDs and API keys.</p>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">How many UUIDs?</label>
          <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded focus:outline-none focus:border-blue-500" />
        </div>

        <button onClick={generateUUID} className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded mb-6">Generate {count} UUID{count > 1 ? 's' : ''}</button>

        {uuids.length > 0 && (
          <div className="space-y-2 mb-6">
            {uuids.map((uuid, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 border border-slate-700 rounded">
                <code className="text-blue-400 font-mono text-sm">{uuid}</code>
                <button onClick={() => copyToClipboard(uuid, idx)} className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded">
                  {copied === idx ? '✓' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}

        {uuids.length > 1 && (
          <button onClick={copyAll} className="w-full px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded">
            {copied === 'all' ? '✓ Copied All' : 'Copy All'}
          </button>
        )}
      </div>
    </div>
  );
}
