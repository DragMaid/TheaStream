import whisper
import torch
import queue
import sounddevice as sd
import numpy as np
import threading
import time

# Load Whisper model (you can change to "base", "small", etc.)
model = whisper.load_model(
    "small", device="cuda" if torch.cuda.is_available() else "cpu")

# Settings
SAMPLE_RATE = 16000  # Whisper expects 16kHz
CHUNK_DURATION = 5  # seconds
BLOCK_SIZE = int(SAMPLE_RATE * CHUNK_DURATION)

audio_queue = queue.Queue()

# Callback to capture microphone audio


def callback(indata, frames, time_info, status):
    if status:
        print(status)
    audio_queue.put(indata.copy())

# Background thread: continuously transcribes from audio queue


def transcribe_loop():
    print("🔊 Listening... Press Ctrl+C to stop.")
    while True:
        audio_chunk = audio_queue.get()
        if audio_chunk is None:
            break

        # Convert to 1D float32 numpy array
        audio_np = audio_chunk.flatten().astype(np.float32)

        # Transcribe using Whisper
        result = model.transcribe(
            audio_np, language="en", fp16=torch.cuda.is_available())
        print(f"[{time.strftime('%H:%M:%S')}] {result['text']}")

# Start audio stream


def start_stream():
    threading.Thread(target=transcribe_loop, daemon=True).start()
    with sd.InputStream(samplerate=SAMPLE_RATE, channels=1, callback=callback, blocksize=BLOCK_SIZE):
        while True:
            time.sleep(0.1)


# Run the real-time transcription
try:
    start_stream()
    print("Stream started")
except KeyboardInterrupt:
    print("\n🛑 Stopped.")

