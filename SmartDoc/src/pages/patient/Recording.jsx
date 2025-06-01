import { useNavigate } from 'react-router-dom';
import { FaMicrophone } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { MdTranslate } from 'react-icons/md';
import SubNav from '../../components/SubNav';

export default function Recording() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/transcribing');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <SubNav />
      <div className="flex-1"></div>

      <div className="px-4 pb-20">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <MdTranslate className="mr-1 text-sm" />
           <span>Language detected:</span>
            <span className="text-orange-500 font-medium ml-1">Igbo</span>
        </div>

        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md border border-gray-300">
          <FaMicrophone className="text-black text-base mr-2" />
          <div className="flex-1">
            <div className="flex items-end space-x-1 h-6">
              {[4, 8, 12, 6, 10, 14, 7, 11].map((height, index) => (
                <div
                  key={index}
                  className="w-0.5 bg-gray-700 rounded"
                  style={{ height: `${height * 1.5}px` }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">0:43</p>
          </div>

          <button
            onClick={handleNext}
            className="ml-2 p-1 rounded hover:bg-gray-200 transition"
          >
            <FiCheck className="text-black text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}