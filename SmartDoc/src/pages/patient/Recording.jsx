import { FaMicrophone } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { MdTranslate } from 'react-icons/md';
import { HiMenu } from 'react-icons/hi';

export default function Recording({ onNext }) {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <HiMenu className="text-2xl text-gray-700" />
        <h1 className="text-base font-medium text-gray-700">New chat ▼</h1>
        <div className="w-6 h-6 rounded-full bg-gray-300" />
      </div>

      {/* Placeholder for chat body */}
      <div className="flex-1" />

      {/* Bottom Section */}
      <div className="px-4 pb-4">
        {/* Language Label */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MdTranslate className="mr-1" />
          <span>Language detected: </span>
          <span className="text-orange-500 font-medium ml-1">Igbo</span>
        </div>

        {/* Compact Recording UI */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
          {/* Mic Icon */}
          <FaMicrophone className="text-black text-base mr-2" />

          {/* Waveform and time */}
          <div className="flex-1">
            <div className="flex items-end space-x-1 h-6">
              {[4, 8, 12, 6, 10, 14, 7, 11].map((height, index) => (
                <div
                  key={index}
                  className="w-0.5 bg-gray-600 rounded"
                  style={{ height: `${height * 2}px` }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">0:43</p>
          </div>

          {/* Clickable Check Button */}
          <button
            onClick={onNext}
            className="ml-3 p-1 border border-gray-300 rounded hover:bg-green-100 transition cursor-pointer"
            aria-label="Confirm recording"
          >
            <FiCheck className="text-green-600 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
