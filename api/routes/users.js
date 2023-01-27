const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/friend/:username");

router.post("/friend/:friendId");

router.put("/update/username");
router.put("/update/bio");

router.delete("/delete/:friendId");

module.exports = router;
