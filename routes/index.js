const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET /
router.get("/", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.render("index", {
    title: "Mini Messageboard",
    messages,
  });
});

// GET /new
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// POST /new
router.post("/new", async (req, res) => {
  const { messageUser, messageText } = req.body;
  await Message.create({
    name: messageUser,
    message: messageText,
  });
  res.redirect("/");
});

// GET /message/:id
router.get("/message/:id", async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) return res.status(404).send("Message not found");
  res.render("message", { title: "Message Details", message });
});

module.exports = router;
