import commentModel from "../models/Comments.js";

export const postComment = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Name and comment are required." });
    }

    const newComment = await commentModel.create({
      name,
      comment,
      propertyId,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Comment posted successfully",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while posting comment",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { id: propertyId } = req.params;

    const comments = await commentModel
      .find({ propertyId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching comments",
    });
  }
};
