import React, { useState } from "react";
import SubNav from "../../components/SubNav";
import { MdAttachFile } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const confirmTranscription = () => {
    console.log("Confirmed message:", message);
    setButtonsDisabled(true);
  };

  const cancelTranscription = () => {
    console.log("Transcription canceled.");
    setButtonsDisabled(true);
  };

  return (
    <div className="flex flex-col h-screen bg-white px-6 py-8">
      <SubNav />

      <div className="max-w-xl w-full mx-auto bg-gray-100 p-6 rounded-lg shadow-md mt-8">
        <div className="p-4 bg-gray-200 rounded-md mb-6 text-gray-800 text-lg leading-relaxed">
          <p>
            "I've not been feeling well since yesterday. I have a headache, body pains.
            I feel feverish. I vomited once this morning after eating and haven't had much appetite.
            No cough or catarrh. I feel weak and tired."
          </p>
        </div>

        <div className="flex justify-between mb-6">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500"
            onClick={cancelTranscription}
            disabled={buttonsDisabled}
          >
            ❌ Cancel
          </button>
          <button
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
            onClick={confirmTranscription}
            disabled={buttonsDisabled}
          >
            ✔️ Confirm
          </button>
        </div>

        {/* Input with icons */}
        <div className="relative">
          {/* Attachment Icon - left */}
          <MdAttachFile className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" size={22} />
          {/* Audio Icon - right */}
          <FaMicrophone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" size={22} />
          
          <input
            type="text"
            className="border border-gray-800 p-4 pl-10 pr-10 rounded-md w-full text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Tell us how you're feeling."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={buttonsDisabled}
          />
        </div>
      </div>

      <div className="flex-1" />
    </div>
  );
};

export default ChatComponent;
