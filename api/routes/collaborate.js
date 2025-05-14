const express = require("express");
const router = express.Router();
const Collaborate = require("../models/collaborate");

// collaborator routes
router.post("/", async (req, res) => {
  const collaborate = new Collaborate({
    name: req.body.name,
    email: req.body.email,
    projectUrl: req.body.projectUrl,
    message: req.body.message,
  });
  try {
    const newCollaborate = await collaborate.save();
    res.status(201).json(newCollaborate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
