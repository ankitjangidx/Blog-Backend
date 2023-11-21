const Post = require("../mondels/postModel");
const Like = require("../mondels/likeModel");
exports.createLike = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user } = req.body;
    //create a like object
    const like = new Like({ post, user });

    //save the new like into DB
    const saveLike = await like.save();

    //find the post by ID, add the new like to the comments array
    const updateLike = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: saveLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

    res.json({
      post: updateLike,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while creating comment",
    });
  }
};
exports.unlikePost = async (req, res) => {
  try {
    //fetch data from req body
    const { post, like } = req.body;

    //delete like based on post id and like id
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });
    //update post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while unlike",
    });
  }
};
