import { useState } from 'react';
import ChatStart from './ChatStart';
import Recording from './Recording';
import Transcribing from './Transcribing';


const STAGES = {
  START: 'start',
  RECORDING: 'recording',
  TRANSCRIBING: 'transcribing',
  CONTRANSCRIBING: 'confirmTranscription',
  SUMMARY: 'summary',
};

const NewChat = () => {
  const [stage, setStage] = useState(STAGES.START);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {stage === STAGES.START && (
        <ChatStart onNext={() => setStage(STAGES.RECORDING)} />
      )}

      {stage === STAGES.RECORDING && (
        <Recording onNext={() => setStage(STAGES.TRANSCRIBING)} />
      )}

      {stage === STAGES.TRANSCRIBING && (
        <Transcribing onNext={() => setStage(STAGES.CONTRANSCRIBING)} />
      )}

      {stage === STAGES.CONTRANSCRIBING && (
        <ConfirmTranscription onNext={() => setStage(STAGES.SUMMARY)} />
      )}

      {stage === STAGES.SUMMARY && <ChatSummary />}
    </div>
  );
};

export default NewChat;
