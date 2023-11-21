const express = require("express");
const router = express.Router();

//import controller
const { createComment } = require("../controllers/commentController");
const { createPost, getAllPost } = require("../controllers/postController");
const { createLike, unlikePost } = require("../controllers/likeController");

//mapping create
router.post("/comments/create", createComment); //create comment
router.post("/likes/create", createLike); //create like
router.post("/likes/unlike", unlikePost); //create like
router.post("/posts/create", createPost); //create post
router.get("/getPost", getAllPost); //fetch all post

//export
module.exports = router;
