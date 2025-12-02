const express = require("express");
const router = express.Router();

// Home page ONLY - remove api-status route
router.get("/", (req, res) => {
  res.render("index", {
    title: "Aberdeen Oil & Gas Development Hub | Europe's Energy Capital",
    page: "home",
    data: {
      stats: [
        { value: "40+", label: "Energy Companies" },
        { value: "120+", label: "Active Projects" },
        { value: "40K+", label: "Jobs Supported" },
        { value: "£20B+", label: "Annual Investment" },
      ],
      lastUpdated: new Date().toLocaleString(),
    },
  });
});

router.get("/test", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test Page</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1>Test Page</h1>
                <p>Server is working!</p>
                <a href="/" class="btn btn-primary">Go Home</a>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;
