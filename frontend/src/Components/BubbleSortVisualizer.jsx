import React, { useEffect, useState } from "react";
import * as anime from "animejs";


const BubbleSortVisualizer = () => {
    const [array, setArray] = useState([5, 1, 4, 2, 8]);

    useEffect(() => {
        animateBubbleSort([...array]);
    }, []);

    const animateBubbleSort = async (arr) => {
        const boxes = document.querySelectorAll(".array-box");

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                // Highlight the elements being compared
                boxes[j].style.backgroundColor = "#facc15"; // yellow
                boxes[j + 1].style.backgroundColor = "#facc15";

                await sleep(500);

                if (arr[j] > arr[j + 1]) {
                    // Swap values visually
                    anime({
                        targets: [boxes[j], boxes[j + 1]],
                        translateX: [0, 60],
                        duration: 500,
                        easing: "easeInOutQuad",
                    });

                    await sleep(500);

                    // Swap in the actual DOM
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    setArray([...arr]); // Re-render
                    return; // Exit early to allow re-trigger of animation
                }

                // Reset color after comparison
                boxes[j].style.backgroundColor = "#3b82f6"; // blue
                boxes[j + 1].style.backgroundColor = "#3b82f6";

                await sleep(200);
            }
        }
    };

    return (
        <div className="p-4 text-white">
            <h2 className="text-2xl font-bold mb-4">Bubble Sort Visualizer</h2>
            <div className="flex gap-4">
                {array.map((value, index) => (
                    <div
                        key={index}
                        className="array-box bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded"
                    >
                        {value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BubbleSortVisualizer;
