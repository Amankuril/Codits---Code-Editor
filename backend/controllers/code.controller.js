const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const runCode = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Code is required", error: true });
  }

  try {
    // Save the code to a temporary file
    const filePath = path.join(__dirname, "../temp/code.js");
    fs.writeFileSync(filePath, code);

    // Execute the JavaScript file using Node.js with a timeout
    exec(`node ${filePath}`, { timeout: 3000 }, (error, stdout, stderr) => {
      // Clean up the file afterward
      fs.unlinkSync(filePath);

      if (error) {
        if (error.killed) {
          return res.status(200).json({
            output: "Execution timed out (possible infinite loop).",
            error: true,
          });
        }

        return res.status(200).json({
          output: stderr || error.message,
          error: true,
        });
      }

      return res.status(200).json({
        output: stdout,
        error: false,
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      output: err.message,
      error: true,
    });
  }
};

module.exports = { runCode };
