import React from 'react';
import { ArrowRight } from 'lucide-react';

const AddVisualization = () => {
  return (
    <div className="mt-4 bg-black/40 p-4 rounded-lg border border-gray-800">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="mb-2 text-sm text-gray-400">Working Directory</div>
          <div className="p-2 border border-gray-700 rounded-md bg-black/60">
            <div className="text-yellow-300">index.html (modified)</div>
            <div className="text-red-400">style.css (untracked)</div>
          </div>
        </div>
        <div className="flex items-center justify-center p-2">
          <ArrowRight className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="mb-2 text-sm text-gray-400">Staging Area</div>
          <div className="p-2 border border-gray-700 rounded-md bg-black/60">
            <div className="text-green-400">index.html (staged)</div>
            <div className="text-green-400">style.css (staged)</div>
          </div>
        </div>
      </div>
      <div className="mt-3 p-2 border-t border-gray-700 pt-3 font-mono text-xs">
        <div className="text-white">$ git add .</div>
        <div className="text-gray-400 mt-1"># Files staged and ready to be committed</div>
      </div>
    </div>
  );
};

export default AddVisualization;
