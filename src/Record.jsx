import useLLM from "usellm";
import { useState } from "react";

export default function Record() {
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
        <div className="flex flex-col items-center gap-3">
            <h2 className="text-4xl">Audio Transcription Demo</h2>
            <div className="flex gap-3">
                <button
                    className="py-2 px-4  bg-lime-600 hover:bg-lime-700 focus:ring-lime-500 focus:ring-offset-lime-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    onClick={startRecording}
                >
                    Record
                </button>
                <button
                    className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    onClick={stopRecording}
                >
                    Stop
                </button>
                <button
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    onClick={transcribe}
                >
                    Transcribe
                </button>
            </div>
            <p>{status}</p>
            {audioUrl && <audio src={audioUrl} controls />}
            {transcript && <p>Transcript: {transcript}</p>}
        </div>
    );
}
