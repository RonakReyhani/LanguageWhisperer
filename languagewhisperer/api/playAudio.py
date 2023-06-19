import IPython
import soundfile as sf

def play_audio(audio):
    sf.write("speech_converted.wav", audio.numpy())
    return IPython.display.Audio("speech_converted.wav")
