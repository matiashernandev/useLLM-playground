"use client";
import useLLM from "usellm";
import { useState } from "react";

export default function App() {
    const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
    const [result, setResult] = useState([]);
    async function handleClick() {
        try {
            const data = await llm.chat({
                messages: [
                    {
                        role: "user",
                        content:
                            "Brindame por favor un mensaje amigable para solicitar el silencio de un microfono. El formato, debería ser en castellano antiguo no mayor a 50 palabras.",
                    },
                ],
                stream: true,
                onStream: ({ message }) =>
                    setResult([...result, message.content]),
            });
            console.log(data);
            //setResult([...result, data.message.content]);
        } catch (error) {
            console.error("Something went wrong!", error);
        }
    }

    return (
        <div className=" flex flex-col mx-auto text-center gap-3">
            <h2 className="text-4xl">Prompt Demo</h2>
            <h4 style={{ textWrap: "balance" }}>
                Brindame por favor un mensaje amigable para solicitar el
                silencio de un microfono. El formato, debería ser en castellano
                antiguo no mayor a 50 palabras.
            </h4>
            <button
                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={handleClick}
            >
                Send
            </button>
            {/* <div style={{ whiteSpace: "pre-wrap" }}>{result}</div> */}
            <ul className="flex flex-col gap-6">
                {result.map((item) => (
                    <li
                        className="text-3xl"
                        style={{ textWrap: "balance" }}
                        key={crypto.randomUUID()}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
