import { useState } from 'react';
import { CgAttachment } from 'react-icons/cg';
import { FiMic } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';

const TextBox = ({ onSend, onVoiceStart }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const showSend = text.trim() || file;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onSend({ type: 'file', content: selectedFile.name }); // Or upload it first
    setFile(null);
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend({ type: 'text', content: text });
    }
    setText('');
  };

  return (
    <div className="flex items-center border border-[#ccc] rounded-md px-2 py-3 bg-[#fff]">
      {/* File Upload */}
      <label className="cursor-pointer m-2">
        <CgAttachment />
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Text Input */}
      <input
        type="text"
        placeholder="Tell us how you're feeling"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-none outline-none flex-1"
      />

      {/* Voice Recording */}
      <button onClick={onVoiceStart}>
        <FiMic className="cursor-pointer m-2" />
      </button>

      {/* Send Button */}
      {showSend && (
        <button onClick={handleSend}>
          <IoMdSend className="text-black text-xl m-2 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default TextBox;
