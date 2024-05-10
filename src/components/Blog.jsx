import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const [, setLikes] = useState(null);

  const hideWhenVisible = {
    display: visible ? "none" : "",
  };
  const showWhenVisible = {
    display: visible ? "" : "none",
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const visibility = () => {
    setVisible(!visible);
  };

  const increaseLikes = async (e) => {
    e.preventDefault();
    const updatedLikes = blog.likes++;
    setLikes(updatedLikes);
    const newBlog = { ...blog, updatedLikes };
    await blogService.update(blog.id, newBlog);
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        {blog.author}
        <button type="submit" onClick={visibility}>
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} by {blog.author}
        <button type="submit" onClick={visibility}>
          hide
        </button>
        <br />
        url:{blog.url}
        <br />
        <button type="submit" onClick={increaseLikes}>
          likes:
        </button>
        {blog.likes}
        <br />
        {user.name}
        <button onClick={() => handleDelete(blog.id)}>remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
};

export default Blog;
