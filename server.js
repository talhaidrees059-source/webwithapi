// const express = require("express");
// const path = require("path");
// const app = express();
// const PORT = process.env.PORT || 3000;


// // Middleware
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Set EJS as view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Import routes
// const indexRoutes = require("./routes/index");

// // Use routes - IMPORTANT: apiRoutes should be mounted at '/api'
// app.use("/", indexRoutes);



// app.get("/", (req, res) => {
//     res.send("Hello from Codio!");
// });

// // Error handlers
// app.use((req, res) => {
//   res.status(404).send("404 - Page not found");
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 API Base: http://localhost:${PORT}/api`);
// });


const express = require("express");
const path = require("path");
const app = express();

// IMPORTANT: use Codio's port when deployed
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import routes
const indexRoutes = require("./routes/index");

// Use routes
app.use("/", indexRoutes);

// Optional: simple test route (only if you don't already handle "/" in routes/index.js)
// If your routes/index.js already has router.get("/", ...) you can delete this.
app.get("/", (req, res) => {
  res.send("Hello from Codio!");
});

// 404 handler MUST be last
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
