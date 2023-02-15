const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/user", UserController.getUser);
router.get("/friend/:username", UserController.getFriends);

router.post("/:username", UserController.checkAvailibility);
router.post("/friend/:friendId/request", UserController.postSendFriendRequest);
router.post("/friend/:friendId/accept", UserController.postAcceptFriendRequest);

router.put("/update/username/:username", UserController.updateUsername);
router.put("/update/bio", UserController.updateBio);

router.delete("/delete/:friendId", UserController.deleteFriend);
router.delete("/delete/:friendId/request", UserController.deleteFriendRequest);

module.exports = router;
