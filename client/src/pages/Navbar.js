import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("accessToken");
  console.log("token: ", token);
  const onLogOut = () => {
    localStorage.removeItem("accessToken");
    window.location = "/login";
  };

  return (
    <nav className="nav">
      <ul className="postList">
        <li className="postItem">
          <Link to="/">Home</Link>
        </li>
        <li className="postItem">
          <Link to="/createPost"> Create a post</Link>
        </li>
      </ul>
      <div class="btn">
        {token ? (
          <button onClick={onLogOut}>LogOut</button>
        ) : (
          <>
            <Link to="/registration">
              <button> Register</button>
            </Link>

            <Link to="/login">
              <button> Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
