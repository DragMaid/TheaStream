import os
import tempfile
import ffmpeg
import torch
from faster_whisper import WhisperModel

def transcribe(audio_path: str, model_size: str = "medium") -> str:
    """
    Transcribe the given audio file using faster-whisper.

    Parameters:
        audio_path: Path to the input audio file.
        model_size: Whisper model size ("tiny", "base", "small", "medium", "large").

    Returns:
        Transcribed text.
    """

    # Automatically detect GPU (cuda) or fallback to CPU
    device = "cuda" if os.environ.get("CUDA_VISIBLE_DEVICES") or torch.cuda.is_available() else "cpu"

    # Initialize model with quantization (optional for speed)
    model = WhisperModel(model_size, device=device, compute_type="float16" if device == "cuda" else "int8")

    # Convert audio to WAV (16kHz mono) using ffmpeg
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=True) as tmp_wav:
        (
            ffmpeg
            .input(audio_path)
            .output(tmp_wav.name, format="wav", ac=1, ar="16000")
            .overwrite_output()
            .run(quiet=True)
        )

        # Transcribe
        segments, _ = model.transcribe(tmp_wav.name)

        # Join segments to a single string
        text = " ".join([segment.text for segment in segments])
        return text.strip()

if __name__ == "__main__":
    from pathlib import Path
    root_dir = Path(__file__).resolve().parent.parent
    audio_path = os.path.join(root_dir, 'static', 'audio', 'transcribe_test1.wav')
    if Path(audio_path).exists():
        result = transcribe(audio_path)
        print("Transcription:", result)