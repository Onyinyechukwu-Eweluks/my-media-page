const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  if (comments === null) {
    return res.status(404).json("Request not found");
  }
  res.status(200).json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username; // accessed from the validateToken
  comment.username = username;
  const comments = await Comments.create(comment);

  if (comments === null) {
    return res.status(400).json("Unable to add request");
  }
  res.status(200).json(comments);
});

router.delete("/:commentId", async (req, res) => {
  const id = req.params.commentId;
  console.log(id);
  // const username = req.user.username;
  const deleteComment = await Comments.destroy({
    where: { id: id },
  });
  try {
    if (!deleteComment) {
      return res.status(400).json("Unable to delete comment");
    }
    res.status(200).json(deleteComment);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
