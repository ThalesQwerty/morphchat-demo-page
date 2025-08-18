const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Serve the standalone widget script
app.get("/widget.js", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "morphchat.umd.js"));
});

// Serve a demo page for the standalone widget
app.get("/demo", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "standalone-demo.html"));
});

// Serve the main HTML file for all routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Main demo: http://localhost:${PORT}`);
    console.log(`Standalone demo: http://localhost:${PORT}/demo`);
    console.log(`Widget script: http://localhost:${PORT}/widget.js`);
});
