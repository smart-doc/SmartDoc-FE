import { FaMicrophone } from 'react-icons/fa';
import { MdTranslate } from 'react-icons/md';
import { BiSolidStopwatch } from 'react-icons/bi';

export default function Transcribing({ duration = 0, bars = [], isLoading = true }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = ('0' + (seconds % 60)).slice(-2);
    return `${mins}:${secs}`;
  };

  return (
    <div className="px-3 pb-4">
      <div className="flex items-center text-xs text-gray-500 mb-1">
        {isLoading && (
          <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin mr-2" />
        )}
        <MdTranslate className="mr-1 text-base" />
        <span>Transcribing recording...</span>
      </div>

      <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm border">
        <div className="flex items-center space-x-2">
          <FaMicrophone className="text-black text-sm" />
          <BiSolidStopwatch className="text-gray-500 text-sm" />
          <p className="text-xs text-gray-500">{formatTime(duration)}</p>
        </div>

        <div className="flex items-center space-x-1 h-5 flex-1 mx-2">
          {(bars.length > 0 ? bars : Array(14).fill(6)).map((height, index) => (
            <div
              key={index}
              className="w-0.5 bg-gray-600 rounded"
              style={{ height: `${height * 1.5}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
