import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  let { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [user, setUser] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  // console.log("comment: ", state);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: comment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((resp) => {
        if (resp.data.error) {
          return alert(resp.data.message);
        }
        // console.log("response: ", resp.data);

        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  const onDelete = (id) => {
    let iD = id;
    axios
      .delete(`http://localhost:3001/comments/${iD}`)
      .then((resp) => {
        // console.log("resp: ", resp.data);

        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((resp) => {
      console.log("result: ", resp.data);
      setPostDetails(resp.data);
    });
    axios.get(`http://localhost:3001/comments/${id}`).then((resp) => {
      setAllComments(resp.data);
    });

    axios
      .get("http://localhost:3001/auth/userAuth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((resp) => {
        setUser(resp.data);
      });
  }, []);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="title">{postDetails.title}</div>
        <div className="body">{postDetails.postText}</div>
        <div className="footer">
          {postDetails.username}
          <label>{postDetails.Likes}</label>
          <i class="bi bi-hand-thumbs-up-fill"></i>
        </div>
      </div>
      <div className="rightSide">
        <div className="comment">
          <form className="addCommentContainer" onSubmit={handleSubmit}>
            <textarea
              type="text"
              rows="5"
              cols="70"
              name="commentBody"
              defaultValue={comment}
              placeholder="Comment..."
              autoComplete="off"
              onChange={handleChange}
            />
            <button type="submit">Add Comment</button>
          </form>
          <div className="listOfComments">
            {allComments.map((comment, index) => (
              <div key={index} className="content">
                <div className="comments">
                  <p>{comment.commentBody}</p>
                  {user === comment.username ? (
                    <i
                      class="bi bi-trash-fill"
                      onClick={() => onDelete(comment.id)}
                    ></i>
                  ) : null}
                </div>
                <span>{comment.createdAt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
