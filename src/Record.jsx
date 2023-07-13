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
            <h2 className="text-4xl font-bold my-3">
                Audio Transcription Demo
            </h2>
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
                {/* old button */}
                {/*       <button
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    onClick={transcribe}
                >
                    Transcribe
                </button> */}

                {/* button loading */}

                <button
                    onClick={transcribe}
                    type="button"
                    className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                    {!!status && (
                        <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mr-2 animate-spin"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                        </svg>
                    )}
                    {status ? "Loading" : "Transcribe"}
                </button>
            </div>
            {audioUrl && <audio src={audioUrl} controls />}
            <p>{status}</p>
            {transcript && (
                <p>
                    <span className="font-bold">Transcript:</span> {transcript}
                </p>
            )}
        </div>
    );
}
