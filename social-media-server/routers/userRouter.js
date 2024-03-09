const requireUser = require("../middlewares/requireUser");
const UserController = require("../controllers/userController");
const router = require("express").Router();

const {
    followOrUnfollowUserController,
    getPostsOfFollowingController,
    getMyPostsController,
    getUserPostsController,
    deleteMyProfileController,
    getMyInfoController,
    updateMyProfileController,
    getUserProfileController,
    searchUserController,
    getPostsOfNotFollowingController,
} = UserController;

router.post("/follow", requireUser, followOrUnfollowUserController);
router.get("/getFeedData", requireUser, getPostsOfFollowingController);
router.get("/getExploreData", requireUser, getPostsOfNotFollowingController);
router.get("/getMyPosts", requireUser, getMyPostsController);
router.get("/getUserPosts", requireUser, getUserPostsController);
router.delete("/deleteMyProfile", requireUser, deleteMyProfileController);
router.get("/getMyInfo", requireUser, getMyInfoController);
router.put("/", requireUser, updateMyProfileController);
router.post("/getUserProfile", requireUser, getUserProfileController);
router.post("/searchUser", requireUser, searchUserController);

module.exports = router;
