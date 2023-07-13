import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Record from "./Record.jsx";
import Image from "./Image.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <div className="container m-auto  flex flex-col gap-10 items-center justify-center">
            <Record />
            <App />
            <Image />
        </div>
    </React.StrictMode>
);
