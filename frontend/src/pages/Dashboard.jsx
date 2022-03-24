import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import Spinner from "../components/Spinner";
import { getPosts, reset } from "../features/posts/postSlice";
import PostItem from "../components/PostItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [user]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.username}</h1>
        <p>Liste des posts : </p>
      </section>

      <PostForm />

      <section className="content">
        {posts.length > 0 ? (
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <h3>You have not set any posts</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
