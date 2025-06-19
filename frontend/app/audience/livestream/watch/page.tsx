"use client";
import { useRef, useState } from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import VoskVoiceControl from "./VoskVoiceControl";


function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LivestreamViewer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [chat, setChat] = useState<{ sender: "user" | "ai"; message: string }[]>([]);
  const [input, setInput] = useState("");

  const addMessage = (sender: "user" | "ai", message: string) => {
    setChat((prev) => [...prev, { sender, message }]);
    setTimeout(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const updateLastMessage = (sender: "user" | "ai", newText: string) => {
    setChat((prev) => {
      const updated = [...prev];
      const last = [...updated].reverse().find(
        (msg) => msg.sender === sender &&
        (msg.message.includes("Thinking") || msg.message.includes("...")));
      if (last) last.message = newText;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const question = input.trim();
    setInput("");
    addMessage("user", question);
    await askAI(question);
  };

  const askAI = async (question: string) => {
    addMessage("ai", "Thinking...");

    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg")
    );

    if (!blob) return;

    const formData = new FormData();
    formData.append("question", question);
    formData.append("screenshot", blob, "screenshot.jpg");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chatbot/ask/", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      updateLastMessage("ai", data.response || "Sorry, I didn't get that.");
    } catch {
      updateLastMessage("ai", "Something went wrong.");
    }
  };

  const requestTranscription = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "command.webm");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/transcribe/", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("Whisper transcript:", result.text);

      if (result.text != "") {
        console.log("Succeeded!!")
        updateLastMessage("user", result.text);
        await askAI(result.text);
      } else {
        updateLastMessage("user", "Couldn't here you bro!!");
      }

    } catch (err) {
      console.error("Transcription error:", err);
      addMessage("ai", "Something went wrong.");
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <div className="w-2/3 p-6 space-y-4">
        <h1 className="text-3xl font-semibold">Cambodian Theater Performance</h1>
        <div className="rounded-xl overflow-hidden shadow-xl bg-black">
          <video
            ref={videoRef}
            controls
            autoPlay
            muted
            crossOrigin="anonymous"
            className="w-full h-auto rounded-xl"
            src="http://127.0.0.1:8000/api/video/test1.mp4/"
          ></video>
        </div>
      </div>

      <div className="w-1/3 bg-zinc-800 flex flex-col border-l border-zinc-700">
        <div className="flex items-center justify-between p-4 border-b border-zinc-700">
          <h2 className="text-xl font-medium">Ask About the Performance</h2>
          <VoskVoiceControl onCommand={requestTranscription} addMessage={addMessage} />
        </div>

        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm scroll-smooth"
        >
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "px-4 py-2 rounded-xl max-w-[80%]",
                  msg.sender === "user"
                    ? "bg-yellow-400 text-black rounded-br-none"
                    : "bg-zinc-700 text-white rounded-bl-none"
                )}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-700 relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="Type your question here..."
            required
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            className="absolute bottom-5 right-6 text-yellow-400 hover:text-yellow-300"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

