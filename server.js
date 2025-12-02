const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import routes
const indexRoutes = require("./routes/index");

// Use routes - IMPORTANT: apiRoutes should be mounted at '/api'
app.use("/", indexRRoutes);

// Error handlers
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Base: http://localhost:${PORT}/api`);
});
