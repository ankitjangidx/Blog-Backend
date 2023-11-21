const Post = require("../mondels/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body; //fetch data from req body
    const post = new Post({ title, body }); //create post object
    const savedPost = await post.save(); //save into db
    res.status(200).json({
      post: savedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while creating post",
    });
  }
};

//fetch all post
exports.getAllPost = async (req, res) => {
  try {
    const response = await Post.find().populate("comments").exec(); //without populate only like id and comment id we will get , using populate like and comment object we will get
    res.status(200).json({
      success: true,
      message: "All Post gets successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "finding failed",
      message: error.message,
    });
  }
};
