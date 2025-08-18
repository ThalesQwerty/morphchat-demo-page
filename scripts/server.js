import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory (one level up from scripts)
app.use(express.static(path.join(__dirname, "..", "dist")));
// Serve the main HTML file for all routes (SPA)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Main demo: http://localhost:${PORT}`);
    console.log(`Standalone demo: http://localhost:${PORT}/demo`);
    console.log(`Widget script: http://localhost:${PORT}/widget.js`);
});
