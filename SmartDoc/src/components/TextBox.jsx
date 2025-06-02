import { useState } from 'react';
import { CgAttachment } from 'react-icons/cg';
import { FiMic } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';

const TextBox = ({ onNext }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [voiceText, setVoiceText] = useState('');

  const showSend = text.trim() || file || voiceText.trim();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = () => {
    console.log({ text, file, voiceText });
    // Handle sending logic here

    // Reset
    setText('');
    setFile(null);
    setVoiceText('');
  };

  return (
    <div className="flex items-center border border-[#ccc] rounded-md px-2 py-3 bg-[#fff]">
      {/* Hidden file input */}
      <label className="cursor-pointer m-2">
        <CgAttachment />
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      <input
        type="text"
        placeholder="Tell us how you're feeling"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-none outline-none flex-1"
      />

      {/* Microphone - Assume clicking triggers voice recording and sets voiceText */}
      <button onClick={() => setVoiceText('Simulated voice text')}>
        <FiMic className="cursor-pointer m-2" />
      </button>

      {/* Conditional Send Button */}
      {showSend && (
        <button onClick={handleSend}>
          <IoMdSend className="text-black text-xl m-2 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default TextBox;
