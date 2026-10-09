const express = require("express");
const router = express.Router();
const user = require("../models/user");

// CREATE
router.post("/", async (req, res) => {
try {
const newUser = await user.create(req.body);
return res.status(201).json(newUser);
} catch (err) {
return res.status(400).json({ error: err.message });
}
});

// READ ALL
router.get("/", async (req, res) => {
const users = await user.find().sort({ createdAt: -1 });
return res.json(users);
});

// UPDATE
router.put("/:id", async (req, res) => {
try {
const updated = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
return res.json(updated);
} catch (err) {
return res.status(400).json({ error: err.message });
}
});

// DELETE
router.delete("/:id", async (req, res) => {
try {
await user.findByIdAndDelete(req.params.id);
return res.json({ message: "User deleted" });
} catch (err) {
return res.status(400).json({ error: err.message });
}
});

module.exports = router;

