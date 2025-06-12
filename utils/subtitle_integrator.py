import os
import sounddevice as sd
from scipy.io.wavfile import write
from google.cloud import speech_v1p1beta1 as speech
from google.cloud import translate_v2 as translate

def record_audio(filename="temp.wav", duration=5, rate=16000):
    print("🎤 Recording...")
    audio = sd.rec(int(duration * rate), samplerate=rate, channels=1)
    sd.wait()
    write(filename, rate, audio)
    print(f"✅ Saved: {filename}")

def transcribe_audio(filename):
    client = speech.SpeechClient()
    with open(filename, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="auto",  # You can change to e.g. "ja-JP" for Japanese
        enable_automatic_punctuation=True
    )

    response = client.recognize(config=config, audio=audio)
    transcript = ""
    for result in response.results:
        transcript += result.alternatives[0].transcript + " "
    return transcript.strip()

def translate_text(text, target="en"):
    client = translate.Client()
    translation = client.translate(text, target_language=target)
    return translation['translatedText']

if __name__ == "__main__":
    record_audio("temp.wav", duration=5)
    original_text = transcribe_audio("temp.wav")
    print("🎧 Transcript:", original_text)

    translated = translate_text(original_text, target="en")  # change "en" to any language code
    print("🌍 Translated:", translated)
