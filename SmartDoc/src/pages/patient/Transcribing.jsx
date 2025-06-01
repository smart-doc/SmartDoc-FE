import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNav from '../../components/SubNav';
import { FaMicrophone } from 'react-icons/fa';
import { MdTranslate } from 'react-icons/md';
import { BiSolidStopwatch } from 'react-icons/bi';

export default function Transcribing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate patient starting to speak after 2 seconds
    // const timer = setTimeout(() => {
    //   navigate('/confirm');
    // }, 2000); // Change to real speech detection when ready

    // return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Sub Navigation */}
      <SubNav />

      <div className="flex-1" />

      {/* Bottom Section */}
      <div className="px-3 pb-20">
        {/* Transcribing label with loading spinner */}
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin mr-2" />
          <MdTranslate className="mr-1 text-base" />
          <span>Transcribing recording...</span>
        </div>

        {/* Compact Recording UI */}
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm border">
          <div className="flex items-center space-x-2">
            <FaMicrophone className="text-black text-sm" />
            <BiSolidStopwatch className="text-gray-500 text-sm" />
            <p className="text-xs text-gray-500">0:43</p>
          </div>

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
