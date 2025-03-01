const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { db } = require("./firebase"); // Import Firestore from firebase.js

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // ✅ Serve static files from 'public' folder

const SECRET_KEY = "your_secret_key"; // Change this in production

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const usersRef = db.collection("users");
    const userSnapshot = await usersRef.where("email", "==", email).get();

    if (!userSnapshot.empty) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await usersRef.add({
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const usersRef = db.collection("users");
    const userSnapshot = await usersRef.where("email", "==", email).get();

    if (userSnapshot.empty) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    let userData;
    let userId;
    userSnapshot.forEach((doc) => {
      userData = doc.data();
      userId = doc.id;
    });

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId, email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ 
      message: "Login successful", 
      token, 
      user: { username: userData.username, email: userData.email }  // ✅ Fixed user response
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ Serve Dashboard Page (Static HTML)
app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// ✅ Protected Dashboard API Route
app.get("/dashboard", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userDoc = await db.collection("users").doc(decoded.userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Welcome to the Dashboard", user: userDoc.data() });
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ error: "Invalid or Expired Token" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
