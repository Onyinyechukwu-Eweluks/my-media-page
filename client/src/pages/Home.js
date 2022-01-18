import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const onLike = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((resp) => {
        // console.log("data: ", resp.data);

        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              if (resp.data.liked === true) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                let likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((resp) => resp.data)
      .then((data) => {
        setPosts(data.listOfPosts);
        setLikedPosts(
          data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <p className="title">{post.title}</p>
          <p
            className="body"
            onClick={() => {
              navigate(`/post/${post.id}`);
            }}
          >
            {post.postText}
          </p>
          <p className="footer">
            {post.username}
            <div>
              <label>{post.Likes.length}</label>
              <i
                className="bi bi-hand-thumbs-up-fill"
                style={
                  likedPosts.includes(post.id) ? { color: "goldenrod" } : null
                }
                onClick={() => onLike(post.id)}
              ></i>
            </div>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
