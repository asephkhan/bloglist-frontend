import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import Toglabble from "./components/Toglabble";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { useNotification } from "./notificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const { state: notification, dispatch } = useNotification();
  const queryClient = useQueryClient();

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginServices.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "invalid username or password", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    }
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      newBlogMutation.mutate(blogObject);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "blog successfully created", type: "success" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    } catch (exception) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "blog not created", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 3000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`would you like to remove this blog?`)) {
      deleteBlogMutation.mutate(id);
    }
  };
  const loginForm = () => (
    <>
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    </>
  );

  const blogListForm = () => (
    <>
      <div>
        <Toglabble buttonLabel={"create"}>
          <BlogForm createBlog={handleCreateBlog} />
        </Toglabble>
      </div>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </>
  );

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <>
      {notification.message && (
        <div style={{ color: notification.type === "error" ? "red" : "green" }}>
          {notification.message}
        </div>
      )}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.username} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error fetching blogs. Please try again later.</p>
          ) : (
            blogListForm()
          )}
        </div>
      )}
    </>
  );
};

export default App;
