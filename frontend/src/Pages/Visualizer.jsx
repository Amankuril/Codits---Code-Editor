import React, { useRef, useEffect } from "react";
import CodeEditor from "../Components/CodeEditor";
import { runCode } from "../Api/CodeApi.js";
import boilerplateCode from "../utils/boilerPlate.js";




const Visualizer = () => {
    const editorRef = useRef(null);
    const languageRef = useRef(null);

    const [selectedLanguage, setSelectedLanguage] = React.useState("javascript");
    const [output, setOutput] = React.useState("");


    // Set default code based on selected language
    useEffect(() => {

        if (editorRef.current) {
            editorRef.current.setValue(boilerplateCode[selectedLanguage]);
        }
    }, [selectedLanguage]);



    // Function to handle code execution and display output
    const handleRunCode = async () => {
        const code = editorRef.current?.getValue();
        const language = selectedLanguage;

        if (!code) {
            setOutput("No code provided.");
            return;
        }
        if (!language) {
            setOutput("No language selected.");
            return;
        }

        try {
            const response = await runCode(code, language);

            if (response.error) {
                setOutput(`❌ Error:\n${response.output}`);
            } else {
                setOutput(`✅ Output:\n${response.output}`);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;

            if (errorMsg.includes("exceeded the DAILY quota")) {
                setOutput("🚫 Daily limit exceeded Please try after 24 hours.");
            } else {
                setOutput(`🚨 Error:\n${errorMsg}`);
            }
        }
    };




    // Function to handle visualization logic
    // const handleSeeVisuals = () => {
    //     const code = editorRef.current?.getValue();
    //     console.log("Visualizing Code:\n", code);
    //     // Pass code to visualization logic
    // };

    return (
        <div className="p-8 text-white bg-gray-900 min-h-screen pt-20">
            <h2 className="text-3xl font-bold mb-4">Welcome to Codit</h2>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Left: Code Editor */}
                <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold mb-2">Code Editor</h3>
                        <select
                            className="bg-gray-700 text-white px-3 py-1 rounded"
                            value={selectedLanguage}
                            ref={languageRef}
                            onChange={(e) => setSelectedLanguage(e.target.value)}>
                            <option value="javascript">JavaScript</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="c">C</option>
                            <option value="python">Python</option>
                        </select>
                    </div>
                    <div className="h-[500px] overflow-auto rounded-lg">
                        <CodeEditor
                            ref={editorRef}
                            language={selectedLanguage}
                            defaultCode={boilerplateCode[selectedLanguage]} />
                    </div>
                    {/* Button */}
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={handleRunCode}
                            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
                        >
                            Run Code
                        </button>
                    </div>
                </div>

                {/* Right: Visuals */}
                <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">See Output</h3>
                    <div className="h-[500px] bg-gray-700 rounded-lg flex items-start justify-start p-5">
                        <pre className="text-white whitespace-pre-wrap px-2">{output || "Output will be displayed here"}</pre>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default Visualizer;
