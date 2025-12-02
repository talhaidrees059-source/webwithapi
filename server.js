// server.js
const express = require("express");
const path = require("path");

const app = express();

// Use Codio's port (8080 box) or fallback for local dev
const PORT = process.env.PORT || 8080;

// -------- Middleware -------- //
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------- View Engine (EJS) -------- //
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------- Routes -------- //
const indexRoutes = require("./routes/index");
const apiRoutes = require("./routes/api");

// Page routes (home, test, etc.)
app.use("/", indexRoutes);

// API routes (/api/companies, /api/market, /api/news, etc.)
app.use("/api", apiRoutes);

// -------- 404 Handler (MUST be last) -------- //
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

// -------- Start Server -------- //
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
