import { React, useState, useEffect } from 'react';
import SubNav from '../../components/SubNav';
import TextBox from '../../components/TextBox';
import Recording from './Recording';
import Transcribing from './Transcribing';
import ConfirmTranscription from "./ConfirmTransciption"; // fixed import name

const ChatStart = () => {
  const [step, setStep] = useState(null); // 'recording', 'language', 'transcription'
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [duration, setDuration] = useState(43); // replace 43 with your dynamic logic later
  const [transcribingDuration, setTranscribingDuration] = useState(0); 


  useEffect(() => {
  let timer;
  if (step === 'recording') {
    timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  } else {
    setDuration(0); // reset when done
  }
  return () => clearInterval(timer);
}, [step]);

useEffect(() => {
  if (step === 'language') {
    const timeout = setTimeout(() => {
      setTranscript("This is a simulated transcript.");
      setStep('transcription'); // ✅ change step after transcription "completes"
    }, 3000); // ⏱ <-- adjust this delay later when real transcription is integrated

    return () => clearTimeout(timeout);
  }
}, [step]);



  const handleSend = (data) => {
    setMessages((prev) => [...prev, { ...data, timestamp: Date.now() }]);
  };

  const startVoiceFlow = () => {
    setStep('recording');
  };

  const handleStopRecording = (blob) => {
    setAudioBlob(blob);
    setStep('language');
  };

  const handleTranscriptionConfirm = () => {
    handleSend({ type: 'voice', content: transcript });
    setStep(null);
    setTranscript('');
    setAudioBlob(null);
  };

  return (
    <div className="px-6 flex flex-col justify-between h-screen pb-10 md:pb-16">
      <SubNav />

      <div className="flex-1 overflow-y-auto mt-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-3 rounded bg-gray-100 w-fit">
            <p><strong>{msg.type}</strong>: {msg.content}</p>
          </div>
        ))}
      </div>

      {/* Voice flow container */}
      <div className="relative">
        {step === 'recording' && (
          <Recording
            duration={duration}
            onNext={() => setStep('language')}
          />
        )}
        {step === 'language' && (
          <Transcribing />
        )}
        {step === 'transcription' && (
          <ConfirmTranscription
            transcript={transcript}
            onConfirm={handleTranscriptionConfirm}
            onCancel={() => setStep(null)}
          />
        )}
        <TextBox onSend={handleSend} onVoiceStart={startVoiceFlow} />
      </div>

    </div>
  );
};

export default ChatStart;
