const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  if (listOfPosts === null) {
    return res.status(404).json("Requests not found");
  }
  res.status(200).json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const onePost = await Posts.findByPk(id);
  if (onePost === null) {
    return res.status(404).json("Request not found");
  }
  res.status(200).json(onePost);
});

router.post("/", async (req, res) => {
  const post = req.body;
  const posts = await Posts.create(post);

  if (posts === null) {
    return res.status(400).json("Unable to add request");
  }
  res.status(200).json(posts);
});

module.exports = router;
