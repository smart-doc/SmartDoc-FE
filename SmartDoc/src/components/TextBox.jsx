// // import { useState } from 'react';
// // import { CgAttachment } from 'react-icons/cg';
// // import { FiMic } from 'react-icons/fi';
// // import { IoMdSend } from 'react-icons/io';
// // import axios from 'axios';
// // import { useAuth } from '../context/AuthContext'; // Adjust path
// // import { toast } from 'react-toastify';

// // const TextBox = ({ onSend, onVoiceStart, setSessionId }) => {
// //   const [text, setText] = useState('');
// //   const [file, setFile] = useState(null);
// //   const { state } = useAuth();
// //   const { token } = state;
// //   const [hasStartedTyping, setHasStartedTyping] = useState(false);

// //   // Create session when user starts typing
// //   const handleTyping = async (value) => {
// //     setText(value);
// //     if (!hasStartedTyping && value.trim()) {
// //       setHasStartedTyping(true);
// //       if (!setSessionId) return; // Session ID managed by parent
// //       try {
// //         const response = await axios.post(
// //           'https://smartdoc-p1ca.onrender.com/api/v1/chat/sessions',
// //           {},
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //         setSessionId(response.data.session.sessionId);
// //       } catch (error) {
// //         toast.error(error.response?.data?.error || 'Failed to start chat session.');
// //       }
// //     }
// //   };

// //   const showSend = text.trim() || file;

// //   const handleFileChange = (e) => {
// //     const selectedFile = e.target.files[0];
// //     setFile(selectedFile);
// //     onSend({ type: 'file', content: selectedFile.name }); // Placeholder for file handling
// //     setFile(null);
// //   };

// //   const handleSend = () => {
// //     if (text.trim()) {
// //       onSend({ type: 'text', content: text });
// //     }
// //     setText('');
// //     setHasStartedTyping(false); // Reset for next session
// //   };

// //   return (
// //     <div className="flex items-center border border-[#ccc] rounded-md px-2 py-3 bg-[#fff]">
// //       {/* File Upload */}
// //       <label className="cursor-pointer m-2">
// //         <CgAttachment />
// //         <input type="file" onChange={handleFileChange} className="hidden" />
// //       </label>

// //       {/* Text Input */}
// //       <input
// //         type="text"
// //         placeholder="Tell us how you're feeling"
// //         value={text}
// //         onChange={(e) => handleTyping(e.target.value)}
// //         className="border-none outline-none flex-1"
// //       />

// //       {/* Voice Recording */}
// //       <button onClick={onVoiceStart}>
// //         <FiMic className="cursor-pointer m-2" />
// //       </button>

// //       {/* Send Button */}
// //       {showSend && (
// //         <button onClick={handleSend}>
// //           <IoMdSend className="text-black text-xl m-2 cursor-pointer" />
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default TextBox;

// import { useState, useRef } from 'react';
// import { CgAttachment } from 'react-icons/cg';
// import { FiMic } from 'react-icons/fi';
// import { IoMdSend } from 'react-icons/io';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// const TextBox = ({ onSend, onVoiceStart, setSessionId }) => {
//   const [text, setText] = useState('');
//   const [file, setFile] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [hasStartedTyping, setHasStartedTyping] = useState(false);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const { state } = useAuth();
//   const { token } = state;

//   // Create session when user starts typing
//   const handleTyping = async (value) => {
//     setText(value);
//     if (!hasStartedTyping && value.trim()) {
//       setHasStartedTyping(true);
//       if (!setSessionId) return;
//       try {
//         const response = await axios.post(
//           'https://smartdoc-p1ca.onrender.com/api/v1/chat/sessions',
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setSessionId(response.data.session.sessionId);
//       } catch (error) {
//         toast.error(error.response?.data?.error || 'Failed to start chat session.');
//       }
//     }
//   };

//   // Start/stop audio recording
//   const handleVoiceToggle = async () => {
//     if (!token) {
//       toast.error('Please sign in to record audio.');
//       return;
//     }

//     if (!isRecording) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMicrophone();
//         mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/mp3' });
//         audioChunksRef.current = [];

//         mediaRecorderRef.current.ondataavailable = (e) => {
//           if (e.data.size > 0) audioChunksRef.current.push(e.data);
//         };

//         mediaRecorderRef.current.onstop = async () => {
//           const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
//           const audioFile = new File([audioBlob], `recording-${Date.now()}.mp3`, {
//             type: 'audio/mp3',
//           });

//           // Upload audio to backend
//           await handleAudioUpload(audioFile);

//           // Stop stream
//           stream.getTracks().forEach((track) => track.stop());
//         };

//         mediaRecorderRef.current.start();
//         setIsRecording(true);
//         onVoiceStart(true); // Notify parent (if needed)
//       } catch (error) {
//         toast.error('Failed to access microphone.');
//         console.error('Microphone error:', error);
//       }
//     } else {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//       onVoiceStart(false);
//     }
//   };

//   // Upload audio file to backend
//   const handleAudioUpload = async (audioFile) => {
//     if (!setSessionId && !sessionId) {
//       const newSessionId = await createSession();
//       if (!newSessionId) return;
//       setSessionId(newSessionId);
//     }

//     const formData = new FormData();
//     formData.append('audio', audioFile);
//     formData.append('sessionId', sessionId || (await createSession()));

//     try {
//       const response = await axios.post(
//         'https://smartdoc-p1ca.onrender.com/api/v1/chat/messages/audio',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       const { userMessage, aiMessage } = response.data;
//       onSend({
//         type: 'audio',
//         content: {
//           audioUrl: userMessage.content.audioUrl,
//           audioTranscript: userMessage.content.audioTranscript,
//         },
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Failed to upload audio.');
//       console.error('Audio upload error:', error);
//     }
//   };

//   // Create session (if needed)
//   const createSession = async () => {
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

//   const showSend = text.trim() || file;

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     onSend({ type: 'file', content: selectedFile.name }); // Placeholder
//     setFile(null);
//   };

//   const handleSend = () => {
//     if (text.trim()) {
//       onSend({ type: 'text', content: text });
//     }
//     setText('');
//     setHasStartedTyping(false);
//   };

//   return (
//     <div className="flex items-center border border-[#ccc] rounded-md px-2 py-3 bg-[#fff]">
//       {/* File Upload */}
//       <label className="cursor-pointer m-2">
//         <CgAttachment />
//         <input type="file" onChange={handleFileChange} className="hidden" />
//       </label>

//       {/* Text Input */}
//       <input
//         type="text"
//         placeholder="Tell us how you're feeling"
//         value={text}
//         onChange={(e) => handleTyping(e.target.value)}
//         className="border-none outline-none flex-1"
//       />

//       {/* Voice Recording */}
//       <button onClick={handleVoiceToggle}>
//         <FiMic
//           className={`cursor-pointer m-2 ${isRecording ? 'text-red-500 animate-pulse' : ''}`}
//         />
//       </button>

//       {/* Send Button */}
//       {showSend && (
//         <button onClick={handleSend}>
//           <IoMdSend className="text-black text-xl m-2 cursor-pointer" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default TextBox;

import { useState, useRef } from 'react';
import { CgAttachment } from 'react-icons/cg';
import { FiMic } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const TextBox = ({ onSend, onVoiceStart, setSessionId }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const { state } = useAuth();
  const { token } = state;

  // Create session when user starts typing
  const handleTyping = async (value) => {
    setText(value);
    if (!hasStartedTyping && value.trim()) {
      setHasStartedTyping(true);
      if (!setSessionId) return;
      try {
        const response = await axios.post(
          'https://smartdoc-p1ca.onrender.com/api/v1/chat/sessions',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const sessionId = response.data.session.sessionId;
        setSessionId(sessionId);
        setCurrentSessionId(sessionId);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to start chat session.');
      }
    }
  };

  // Create session helper function
  const createSession = async () => {
    try {
      const response = await axios.post(
        'https://smartdoc-p1ca.onrender.com/api/v1/chat/sessions',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const sessionId = response.data.session.sessionId;
      if (setSessionId) setSessionId(sessionId);
      setCurrentSessionId(sessionId);
      return sessionId;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create chat session.');
      return null;
    }
  };

  // Check microphone permissions
  const checkMicrophonePermission = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone not supported in this browser');
      }
      
      // Check permission status if available
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({ name: 'microphone' });
        if (permission.state === 'denied') {
          throw new Error('Microphone permission denied. Please allow microphone access in your browser settings.');
        }
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  };

  // Start/stop audio recording
  const handleVoiceToggle = async () => {
    if (!token) {
      toast.error('Please sign in to record audio.');
      return;
    }

    if (!isRecording) {
      try {
        // Check microphone permission first
        await checkMicrophonePermission();

        // Request microphone access with proper constraints
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          }
        });

        streamRef.current = stream;

        // Check if MediaRecorder supports the desired format
        let mimeType = 'audio/webm';
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/wav')) {
          mimeType = 'audio/wav';
        }

        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          try {
            const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
            const audioFile = new File([audioBlob], `recording-${Date.now()}.webm`, {
              type: mimeType,
            });

            // Upload audio to backend
            await handleAudioUpload(audioFile);
          } catch (error) {
            toast.error('Failed to process audio recording.');
            console.error('Audio processing error:', error);
          } finally {
            // Stop all tracks
            if (streamRef.current) {
              streamRef.current.getTracks().forEach((track) => track.stop());
              streamRef.current = null;
            }
          }
        };

        mediaRecorderRef.current.onerror = (event) => {
          console.error('MediaRecorder error:', event.error);
          toast.error('Recording failed. Please try again.');
          setIsRecording(false);
          onVoiceStart(false);
        };

        mediaRecorderRef.current.start(1000); // Collect data every second
        setIsRecording(true);
        onVoiceStart(true);
        toast.success('Recording started...');

      } catch (error) {
        console.error('Microphone access error:', error);
        
        // Handle specific error types
        let errorMessage = 'Failed to access microphone.';
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Microphone permission denied. Please allow microphone access and try again.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No microphone found on this device.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Microphone is being used by another application.';
        } else if (error.name === 'OverconstrainedError') {
          errorMessage = 'Microphone constraints cannot be satisfied.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      onVoiceStart(false);
      toast.info('Recording stopped. Processing...');
    }
  };

  // Upload audio file to backend
  const handleAudioUpload = async (audioFile) => {
    try {
      // Ensure we have a session
      let sessionId = currentSessionId;
      if (!sessionId) {
        sessionId = await createSession();
        if (!sessionId) {
          toast.error('Failed to create session for audio upload.');
          return;
        }
      }

      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('sessionId', sessionId);

      const response = await axios.post(
        'https://smartdoc-p1ca.onrender.com/api/v1/chat/messages/audio',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const { userMessage, aiMessage } = response.data;
      
      // Send the audio message to parent component
      onSend({
        type: 'audio',
        content: {
          audioUrl: userMessage.content.audioUrl,
          audioTranscript: userMessage.content.audioTranscript,
        },
      });

      toast.success('Audio uploaded successfully!');

    } catch (error) {
      console.error('Audio upload error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to upload audio.';
      toast.error(errorMessage);
    }
  };

  const showSend = text.trim() || file;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onSend({ type: 'file', content: selectedFile.name }); // Placeholder
      setFile(null);
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend({ type: 'text', content: text });
    }
    setText('');
    setHasStartedTyping(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showSend) {
        handleSend();
      }
    }
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
        onChange={(e) => handleTyping(e.target.value)}
        onKeyPress={handleKeyPress}
        className="border-none outline-none flex-1"
        disabled={isRecording} // Disable text input while recording
      />

      {/* Voice Recording */}
      <button 
        onClick={handleVoiceToggle}
        disabled={!token}
        className={`m-2 p-1 rounded ${!token ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        title={isRecording ? 'Stop recording' : 'Start recording'}
      >
        <FiMic
          className={`${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-700'} text-lg`}
        />
      </button>

      {/* Send Button */}
      {showSend && !isRecording && (
        <button onClick={handleSend}>
          <IoMdSend className="text-black text-xl m-2 cursor-pointer" />
        </button>
      )}

      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center m-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
          <span className="text-sm text-red-500">Recording...</span>
        </div>
      )}
    </div>
  );
};

export default TextBox;