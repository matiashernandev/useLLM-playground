import useLLM from "usellm";
import { useState } from "react";

export default function Image() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState("");
    const [example, setExample] = useState(
        "Claymation art of a old man playing guitar, 100mm, candle lightning, industrial colours, extremely detailed"
    );
    const [isLoading, setIsLoading] = useState(false);
    const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });

    async function handleGenerateClick(e) {
        setIsLoading(true);
        setPrompt("");
        e.preventDefault();
        setImage("");
        setExample(prompt);
        const { images } = await llm.generateImage({ prompt });
        setImage(images[0]);
        setIsLoading(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleGenerateClick(e);
        }
    };

    return (
        <div className=" flex flex-col gap-3 items-center max-w-4xl w-full mx-auto my-4">
            <h1 className="font-medium text-4xl text-center">
                Image Generation Demo
            </h1>
            <p style={{ textWrap: "balance", textAlign: "center" }}>
                {example}
            </p>
            <div className="flex mt-4">
                <input
                    className="px-3 rounded-lg"
                    type="text"
                    placeholder="Enter a prompt here"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={handleGenerateClick}
                    className="ml-2                 
                py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                >
                    Generate
                </button>
            </div>
            {isLoading && <p>Loading...</p>}
            {image && (
                <img
                    className="mt-4 rounded-lg"
                    src={image}
                    alt={prompt}
                    width={256}
                    height={256}
                />
            )}
        </div>
    );
}
