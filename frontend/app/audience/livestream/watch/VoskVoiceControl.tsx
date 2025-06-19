"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import Vosk from "vosk-browser";

interface VoskRecognizer {
  on: (event: string, callback: (msg: any) => void) => void;
  acceptWaveform: (inputBuffer: AudioBuffer) => void;
}

export default function VoskVoiceControl({
  onCommand,
  addMessage,
}: {
  onCommand: (audioBlob: Blob) => Promise<void>;
  addMessage: (sender: "user" | "ai", message: string) => void;
}) {
  const [voskEnabled, setVoskEnabled] = useState(false);

  const recognizer = useRef<VoskRecognizer | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const recognizerNode = useRef<ScriptProcessorNode | null>(null);
  const model = useRef<any>(null);
  const silenceTimeout = useRef<NodeJS.Timeout | null>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const audioContextMonitor = useRef<AudioContext | null>(null);
  const processor = useRef<ScriptProcessorNode | null>(null);
  const source = useRef<MediaStreamAudioSourceNode | null>(null);

  const callLines = ["hey alex", "hi alex", "hello alex"];
  const modelURL = "http://127.0.0.1:8000/api/voice/model/model.zip/";

  const startVosk = async () => {
    try {
      model.current = await Vosk.createModel(modelURL);
      recognizer.current = new model.current.KaldiRecognizer(16000);

      recognizer.current.on("result", (message: any) => {
        const transcript = message.result.text.trim().toLowerCase();
        console.log("Transcript:", transcript);
        if (callLines.some((v) => transcript.includes(v))) {
          addMessage("ai", "I'm listening!");
          startRecording();
        }
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          channelCount: 1,
        },
        video: false,
      });

      audioContext.current = new AudioContext({ sampleRate: 16000 });
      recognizerNode.current = audioContext.current.createScriptProcessor(4096, 1, 1);

      recognizerNode.current.onaudioprocess = (event) => {
        try {
          recognizer.current?.acceptWaveform(event.inputBuffer);
        } catch (err) {
          console.error("acceptWaveform failed:", err);
        }
      };

      const sourceNode = audioContext.current.createMediaStreamSource(stream);
      sourceNode.connect(recognizerNode.current);
      recognizerNode.current.connect(audioContext.current.destination);
    } catch (err) {
      console.error("Failed to start Vosk:", err);
    }
  };

  const stopVosk = () => {
    recognizerNode.current?.disconnect();
    recognizerNode.current = null;

    audioContext.current?.close();
    audioContext.current = null;

    recognizer.current = null;
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });
      addMessage("user", "...");
      await onCommand(blob);
      stopMonitoring();
    };

    mediaRecorder.current.start();

    // Silence monitor
    audioContextMonitor.current = new AudioContext();
    processor.current = audioContextMonitor.current.createScriptProcessor(2048, 1, 1);
    source.current = audioContextMonitor.current.createMediaStreamSource(stream);

    source.current.connect(processor.current);
    processor.current.connect(audioContextMonitor.current.destination);

    processor.current.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const isSilent = input.every((sample) => Math.abs(sample) < 0.01);

      if (!isSilent) {
        if (silenceTimeout.current) clearTimeout(silenceTimeout.current);
        silenceTimeout.current = setTimeout(stopRecording, 1000);
      }
    };

    silenceTimeout.current = setTimeout(stopRecording, 8000);
  };

  const stopRecording = () => {
    if (mediaRecorder.current?.state === "recording") {
      mediaRecorder.current.stop();
    }
  };

  const stopMonitoring = () => {
    processor.current?.disconnect();
    source.current?.disconnect();
    audioContextMonitor.current?.close();

    processor.current = null;
    source.current = null;
    audioContextMonitor.current = null;
  };

  const toggleVosk = async () => {
    if (voskEnabled) {
      stopVosk();
      setVoskEnabled(false);
    } else {
      await startVosk();
      setVoskEnabled(true);
    }
  };

  return (
    <button
      onClick={toggleVosk}
      className="p-2 rounded-full bg-zinc-700 hover:bg-zinc-600 transition relative group"
    >
      {voskEnabled ? (
        <Mic className="text-red-500 animate-pulse h-5 w-5" />
      ) : (
        <MicOff className="text-white h-5 w-5" />
      )}
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
        Toggle Mic
      </span>
    </button>
  );
}