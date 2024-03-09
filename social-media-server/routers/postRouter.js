const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");
const postController = require("../controllers/postController");

const {
    createPostController,
    likeAndUnlikePost,
    updatePostController,
    deletePostController,
} = postController;

router.post("/", requireUser, createPostController);
router.post("/like", requireUser, likeAndUnlikePost);
router.put("/", requireUser, updatePostController);
router.delete("/", requireUser, deletePostController);

module.exports = router;
