// src/pages/Transcribing.jsx
import { FaMicrophone } from 'react-icons/fa';
import { MdTranslate } from 'react-icons/md';

export default function Transcribing() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1" />

      {/* Bottom Section */}
      <div className="px-3 pb-3">
        {/* Transcribing label */}
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <MdTranslate className="mr-1 text-base" />
          <span>Transcribing recording...</span>
        </div>

        {/* Compact Recording UI */}
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm border">
          {/* Mic Icon and Duration */}
          <div className="flex items-center space-x-2">
            <FaMicrophone className="text-black text-sm" />
            <p className="text-xs text-gray-500">0:43</p>
          </div>

          {/* Waveform */}
          <div className="flex items-end space-x-1 h-5 flex-1 mx-2">
            {[4, 8, 12, 6, 10, 14, 7, 11].map((height, index) => (
              <div
                key={index}
                className="w-0.5 bg-gray-600 rounded"
                style={{ height: `${height * 1.5}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
