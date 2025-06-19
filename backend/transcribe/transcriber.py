import os
import tempfile
import ffmpeg
from faster_whisper import WhisperModel


class Transcriber:
    def __init__(self, model_size="base"):
        self._model_size = model_size

        self._device = "cuda" if os.environ.get(
            "CUDA_VISIBLE_DEVICES") else "cpu"

        self._compute_type = "float16" if self._device == "cuda" else "int8"

        self._model = WhisperModel(self._model_size, device=self._device,
                                   compute_type=self._compute_type)

    def transcribe(self, audio_path):
        """Transcribe the given audio file using faster-whisper."""

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
            segments, _ = self._model.transcribe(tmp_wav.name)

            # Join segments to a single string
            text = " ".join([segment.text for segment in segments])
            return text.strip()


if __name__ == "__main__":
    # Testing with a predefined audio
    from pathlib import Path
    root_dir = Path(__file__).resolve().parent.parent
    audio_path = os.path.join(
        root_dir, 'static', 'audio', 'transcribe_test1.wav')

    if Path(audio_path).exists():
        transcriber = Transcriber()
        result = transcriber.transcribe(audio_path)
        print("Transcription:", result)
