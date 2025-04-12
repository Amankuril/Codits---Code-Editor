const axios = require('axios');


const languageMap = {
  java: 62,       
  cpp: 54,        
  python: 71,     
  javascript: 63,
  c: 50,
};

const runCode = async (req, res) => {
  const { code, language } = req.body;

  // console.log("Received Code:", code);
  // console.log("Received Language:", language);
  

  const languageId = languageMap[language];
  // console.log("Mapped Language ID:", languageId);

  if (!code) {
    return res.status(400).json({ message: "Code is required", error: true });
  }

  if (!languageId) {
    return res.status(400).json({ message: "Language ID is required", error: true });
  }

  try {
    // Encode the source code in Base64
    const base64Code = Buffer.from(code).toString('base64');

    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true',
      {
        source_code: base64Code, // Use the Base64-encoded code
        language_id: languageId,
      },
      {
        headers: {
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.APIKEY,
          'Content-Type': 'application/json',
        },
      }
    );

    // console.log("Response Data:", response.data);

    if (response.data.status.id === 3) {
      // Decode the stdout if the execution is successful
      const output = Buffer.from(response.data.stdout, 'base64').toString('utf-8');
      // console.log("Decoded Output:", output);

      return res.status(200).json({
        output: output || "No output",
        error: false,
      });
    } else if (response.data.status.id === 6) {
      // Decode the compile_output if there's a compilation error
      const compileError = Buffer.from(response.data.compile_output, 'base64').toString('utf-8');
      console.log("Compilation Error:", compileError);

      return res.status(400).json({
        output: compileError,
        error: true,
      });
    } else {
      return res.status(400).json({
        output: response.data.stderr || response.data.message,
        error: true,
      });
    }
  } catch (err) {
    if (err.response) {
      console.log("Error Response:", err.response.data.message);
    } else {
      console.log("Error Message:", err.message);
    }
    return res.status(500).json({
      error: true,
      message: err.response.data.message || "Execution failed",
    });
  }
};

module.exports = {
  runCode,
};