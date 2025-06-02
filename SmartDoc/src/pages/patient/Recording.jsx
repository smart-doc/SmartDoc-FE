import { useEffect, useState, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { MdTranslate } from 'react-icons/md';

export default function Recording({ onStop, onClose, language = 'English', onNext }) {
  const [duration, setDuration] = useState(0);
  const [levels, setLevels] = useState(new Array(12).fill(4));
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    let stream;
    let interval;

    const initRecording = async () => {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // waveform animation
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const animate = () => {
        analyser.getByteFrequencyData(dataArray);
        const normalized = Array.from(dataArray.slice(0, 12)).map(val => Math.max(2, val / 10));
        setLevels(normalized);
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();

      // record audio
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.start();

      // duration timer
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    };

    initRecording();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationRef.current);
      audioContextRef.current?.close();
      mediaRecorderRef.current?.stop();
    };
  }, []);

  const handleNext = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      onStop?.(blob);
    };
  };

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center text-xs text-gray-500 mb-1">
        <MdTranslate className="mr-1 text-sm" />
        <span>Language detected:</span>
        <span className="text-orange-500 font-medium ml-1">{language}</span>
      </div>

      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md border border-gray-300">
        <FaMicrophone className="text-black text-base mr-2" />
        <div className="flex-1">
          <div className="flex items-end space-x-1 h-6">
            {levels.map((height, index) => (
              <div
                key={index}
                className="w-0.5 bg-gray-700 rounded transition-all"
                style={{ height: `${height * 2}px`, maxHeight: "100%" }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {Math.floor(duration / 60)}:{('0' + (duration % 60)).slice(-2)}
          </p>
        </div>

        <button
          onClick={onNext}
          className="ml-2 p-1 rounded hover:bg-gray-200 transition cursor-pointer"
        >
          <FiCheck className="text-black text-lg" />
        </button>
      </div>
    </div>
  );
}
