const express = require("express");

module.exports = function (dbConnection) {
  const router = express.Router();

  // GET request to fetch users from the database
  router.get("/", (req, res) => {
    console.log("Fetching users from the database...");
    dbConnection.query("SELECT * FROM users", (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      console.log("Users fetched successfully",results);
      res.json(results);
    });
  });

  return router;
};
