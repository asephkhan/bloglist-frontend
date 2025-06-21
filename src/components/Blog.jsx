import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog, user, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient()


  const updateBlogMutation = useMutation({mutationFn: ({id, updatedBlog}) =>  blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['blogs']})
    } 
  })

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
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate({ id: blog.id, updatedBlog });
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}><Link to={`/blogs/${blog.id}`}>{blog.title}
        {blog.author}</Link>

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
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
};

export default Blog;
