const express = require("express");
const Explore = require("../models/explore");

const router = express.Router();

// POST route to join us
router.post("/", async (req, res) => {
  const Entry = new Explore({
    email: req.body.email,
  });
  try {
    const newEntry = await Entry.save();
    res.status(201).send(newEntry);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
