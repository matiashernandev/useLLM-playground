"use client";
import useLLM from "usellm";
import { useState } from "react";

export default function AudioRecorder() {
    const [audioUrl, setAudioUrl] = useState("");
    const [transcript, setTranscript] = useState("");
    const [status, setStatus] = useState("");

    const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });

    const startRecording = async () => {
        await llm.record();
        setStatus("Recording...");
    };

    const stopRecording = async () => {
        const { audioUrl } = await llm.stopRecording();
        setAudioUrl(audioUrl);
        setStatus("");
    };

    const transcribe = async () => {
        setStatus("Transcribing...");
        const { text } = await llm.transcribe({ audioUrl });
        setTranscript(text);
        setStatus("");
    };

    return (
        <div style={{ maxWidth: 320, margin: "32px auto" }}>
            <h1>Audio Transcription Demo</h1>
            <button onClick={startRecording}>Record</button>
            <button onClick={stopRecording}>Stop</button>
            <button onClick={transcribe}>Transcribe</button>
            <p>{status}</p>
            {audioUrl && <audio src={audioUrl} controls />}
            {transcript && <p>Transcript: {transcript}</p>}
        </div>
    );
}
