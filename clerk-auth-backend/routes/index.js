var express = require("express");
var router = express.Router();
require("dotenv").config();

// Import the verifyJWT function
const verifyJWT = require("../utils/verifyJWT");

router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.post("/api", async function (req, res) {
  const jwtToken = req.headers.authorization?.split(" ")[1];

  try {
    // Verify the JWT using the extracted function
    await verifyJWT(jwtToken);

    // If verification succeeds, the user is considered signed in
    const isSignedIn = true;
    console.log("isSignedIn", isSignedIn);
    return res.json({ message: "Welcome to the API ENDPOINT" });
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
});

module.exports = router;
