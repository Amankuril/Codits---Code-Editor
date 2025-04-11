import exios from "axios";

const BASE_URL = "http://localhost:3000";


export const runCode = async (code) => {
    try {
        const response = await exios.post(`${BASE_URL}/code/run`, { code });
        // console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error running code:", error);
        throw error;
    }
}