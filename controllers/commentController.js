const Post = require("../mondels/postModel");
const Comment = require("../mondels/commentModel");

exports.createComment = async (req, res) => {
  try {
    //fetch data from req body
    const { post, user, body } = req.body;
    //create a comment object
    const comment = new Comment({ post, user, body });

    //save the new comment into DB
    const saveComment = await comment.save();

    //find the post by ID, add the new comment to the comments array
    const updatePost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: saveComment._id } },
      { new: true }
    )
      .populate("comments") //populate comment array with comment object
      .exec();

    res.json({
      post: updatePost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while creating comment",
    });
  }
};
