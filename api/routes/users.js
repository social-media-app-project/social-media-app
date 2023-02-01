const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/friend/:username", UserController.getFriends);

router.post("/username", UserController.checkAvailibility);
router.post("/friend/:friendId", UserController.postAddFriend);

router.put("/update/username", UserController.updateUsername);
router.put("/update/bio", UserController.updateBio);

router.delete("/delete/:friendId", UserController.deleteFriend);

module.exports = router;
