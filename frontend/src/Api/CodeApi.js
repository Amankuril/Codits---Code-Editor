import exios from "axios";

const BASE_URL = "http://localhost:3000";


export const runCode = async (code , language) => {
    // console.log("Running code:", code, "Language:", language);
    try {
        const response = await exios.post(`${BASE_URL}/code/run`, { code, language });
        // console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        // console.error("Error running code:", error);
        console.log("COdeAPI.js", error.response.data.message);
        throw error;
    }
}