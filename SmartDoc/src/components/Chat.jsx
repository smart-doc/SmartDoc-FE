// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // Adjust path
// import { toast } from 'react-toastify';
// import TextBox from './TextBox';
// import { IoClose } from 'react-icons/io5';

// const Chat = () => {
//   const { state } = useAuth();
//   const { token } = state;
//   const [sessionId, setSessionId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when new messages are added
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Create a new chat session
//   const createSession = async () => {
//     if (!token) {
//       toast.error('Please sign in to start a chat.');
//       return null;
//     }
//     try {
//       const response = await axios.post(
//         'https://smartdoc-p1ca.onrender.com/api/v1/chat/sessions',
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       return response.data.session.sessionId;
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Failed to create chat session.');
//       return null;
//     }
//   };

//   // Handle sending a text message
//   const handleSendMessage = async (message) => {
//     if (message.type !== 'text') return; // Handle only text for now
//     setIsLoading(true);

//     // Create session if none exists
//     let currentSessionId = sessionId;
//     if (!currentSessionId) {
//       currentSessionId = await createSession();
//       if (!currentSessionId) {
//         setIsLoading(false);
//         return;
//       }
//       setSessionId(currentSessionId);
//     }

//     // Add user message to UI
//     const userMessage = {
//       id: `temp-${Date.now()}`,
//       sender: 'user',
//       messageType: 'text',
//       content: { text: message.content },
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const response = await axios.post(
//         'https://smartdoc-p1ca.onrender.com/api/v1/chat/messages',
//         {
//           sessionId: currentSessionId,
//           messageType: 'text',
//           content: { text: message.content },
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const { userMessage: savedUserMessage, aiMessage } = response.data;

//       // Update user message with backend ID
//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === userMessage.id ? { ...savedUserMessage, id: savedUserMessage.messageId } : msg
//         )
//       );

//       // Add AI response
//       setMessages((prev) => [
//         ...prev,
//         { ...aiMessage, id: aiMessage.messageId },
//       ]);
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Failed to send message.');
//       // Remove temporary user message on error
//       setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle session deletion
//   const handleEndSession = async () => {
//     if (!sessionId) return;
//     try {
//       await axios.delete(
//         `https://smartdoc-p1ca.onrender.com/api/v1/chat/delete/sessions/${sessionId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSessionId(null);
//       setMessages([]);
//       toast.success('Chat session ended.');
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Failed to end session.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white px-4 py-8" style={{ fontFamily: 'PP Neue Montreal' }}>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Medical Consultation</h2>
//         {sessionId && (
//           <button
//             onClick={handleEndSession}
//             className="flex items-center gap-2 text-red-500 hover:text-red-700"
//           >
//             <IoClose className="text-xl" />
//             End Session
//           </button>
//         )}
//       </div>

//       <div className="flex-1 bg-[#fbfbfb] p-4 rounded-md overflow-y-auto mb-4">
//         {messages.length === 0 && (
//           <p className="text-gray-500 text-center">Start typing to begin your consultation.</p>
//         )}
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-[70%] p-3 rounded-lg ${
//                 message.sender === 'user'
//                   ? 'bg-black text-white'
//                   : 'bg-gray-200 text-gray-900'
//               }`}
//             >
//               <p>{message.content.text}</p>
//               <p className="text-xs mt-1 opacity-70">
//                 {new Date(message.timestamp).toLocaleTimeString()}
//               </p>
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start mb-4">
//             <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-900">
//               <p className="animate-pulse">AI is typing...</p>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <TextBox onSend={handleSendMessage} onVoiceStart={() => {}} />
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Adjust path
import { toast } from 'react-toastify';
import TextBox from './TextBox';
import { IoClose } from 'react-icons/io5';

const Chat = () => {
  const { state } = useAuth();
  const { token } = state;
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Create a new chat session
  const createSession = async () => {
    if (!token) {
      toast.error('Please sign in to start a chat.');
      return null;
    }
    try {
      const response = await axios.post(
        'https://smartdoc-p1ca.onrender.com/api/v1/chat/sessions',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.session.sessionId;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create chat session.');
      return null;
    }
  };

  // Handle sending a message (text or audio)
  const handleSendMessage = async (message) => {
    setIsLoading(true);

    // Create session if none exists
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      currentSessionId = await createSession();
      if (!currentSessionId) {
        setIsLoading(false);
        return;
      }
      setSessionId(currentSessionId);
    }

    // Add user message to UI
    const userMessage = {
      id: `temp-${Date.now()}`,
      sender: 'user',
      messageType: message.type,
      content: message.content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      let response;
      if (message.type === 'text') {
        response = await axios.post(
          'https://smartdoc-p1ca.onrender.com/api/v1/chat/messages',
          {
            sessionId: currentSessionId,
            messageType: 'text',
            content: { text: message.content },
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (message.type === 'audio') {
        // Audio already uploaded via TextBox; use response from upload
        response = {
          data: {
            userMessage: {
              messageId: userMessage.id,
              sender: 'user',
              messageType: 'audio',
              content: message.content,
              timestamp: new Date(),
            },
            aiMessage: {
              messageId: `ai-${Date.now()}`,
              sender: 'ai',
              messageType: 'text', // Assume AI responds with text (adjust if audio)
              content: { text: '[AI response to audio]' }, // Placeholder
              timestamp: new Date(),
            },
          },
        };
      }

      const { userMessage: savedUserMessage, aiMessage } = response.data;

      // Update user message with backend ID
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMessage.id ? { ...savedUserMessage, id: savedUserMessage.messageId } : msg
        )
      );

      // Add AI response
      setMessages((prev) => [
        ...prev,
        { ...aiMessage, id: aiMessage.messageId },
      ]);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send message.');
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle session deletion
  const handleEndSession = async () => {
    if (!sessionId) return;
    try {
      await axios.delete(
        `https://smartdoc-p1ca.onrender.com/api/v1/chat/delete/sessions/${sessionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSessionId(null);
      setMessages([]);
      toast.success('Chat session ended.');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to end session.');
    }
  };

  // Render message content
  const renderMessageContent = (message) => {
    if (message.messageType === 'text') {
      return <p>{message.content.text}</p>;
    } else if (message.messageType === 'audio') {
      return (
        <div>
          <audio controls className="w-full max-w-xs">
            <source src={message.content.audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          {message.content.audioTranscript && (
            <p className="text-sm mt-2">Transcript: {message.content.audioTranscript}</p>
          )}
        </div>
      );
    }
    return <p>[Unsupported message type]</p>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-4 py-8" style={{ fontFamily: 'PP Neue Montreal' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Medical Consultation</h2>
        {sessionId && (
          <button
            onClick={handleEndSession}
            className="flex items-center gap-2 text-red-500 hover:text-red-700"
          >
            <IoClose className="text-xl" />
            End Session
          </button>
        )}
      </div>

      <div className="flex-1 bg-[#fbfbfb] p-4 rounded-md overflow-y-auto mb-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">Start typing or record audio to begin your consultation.</p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              {renderMessageContent(message)}
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-900">
              <p className="animate-pulse">AI is processing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <TextBox
        onSend={handleSendMessage}
        onVoiceStart={(recording) => console.log('Recording:', recording)}
        setSessionId={setSessionId}
      />
    </div>
  );
};

export default Chat;