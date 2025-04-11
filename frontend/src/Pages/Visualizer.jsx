import React, { useRef } from "react";
import CodeEditor from "../Components/CodeEditor";
import { runCode } from "../Api/CodeApi.js";
import BubbleSortVisualizer  from "../Components/BubbleSortVisualizer.jsx";

const Visualizer = () => {
    const editorRef = useRef(null);
    const [output, setOutput] = React.useState("");



    // Function to handle code execution and display output
    const handleRunCode = async () => {
        const code = editorRef.current?.getValue();
        if (!code) {
            setOutput("No code provided.");
            return;
        }

        try {
            const response = await runCode(code);

            if (response.error) {
                setOutput(`❌ Error:\n${response.output}`);
            } else {
                setOutput(`✅ Output:\n${response.output}`);
            }
        } catch (err) {
            setOutput(`🚨 Unexpected Error:\n${err.message}`);
        }
    };




    // Function to handle visualization logic
    const handleSeeVisuals = () => {
        const code = editorRef.current?.getValue();
        console.log("Visualizing Code:\n", code);
        // Pass code to visualization logic
    };

    return (
        <div className="p-8 text-white bg-gray-900 min-h-screen pt-20">
            <h2 className="text-3xl font-bold mb-4">Code Visualizer</h2>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Left: Code Editor */}
                <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">Code Editor</h3>
                    <div className="h-[500px] overflow-auto rounded-lg">
                        <CodeEditor
                            ref={editorRef}
                            defaultCode={"console.log('hello world!');"} />
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
                    <h3 className="text-xl font-semibold mb-2">See Visuals</h3>
                    <div className="h-[500px] bg-gray-700 rounded-lg flex items-start justify-start p-5">
                        <pre className="text-white whitespace-pre-wrap px-2">{output || "Output will be displayed here"}</pre>
                    </div>
                    {/* Button */}
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={handleSeeVisuals}
                            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
                        >
                            See Visuals
                        </button>
                    </div>
                </div>

            </div>


            {/* Bubble Sort Visualizer */}
            <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2 mt-8">Visualizer</h3>
                <BubbleSortVisualizer />
            </div>
        </div>
    );
};

export default Visualizer;
