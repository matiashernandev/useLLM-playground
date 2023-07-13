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
        <div>
            <button onClick={handleClick}>Send</button>
            {/* <div style={{ whiteSpace: "pre-wrap" }}>{result}</div> */}
            <ul>
                {result.map((item) => (
                    <li
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
