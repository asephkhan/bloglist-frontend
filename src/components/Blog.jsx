import { useState } from "react";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {
    display: visible ? "none" : "",
 
  };
  const showWhenVisible = {
    display: visible ? "" : "none",
  
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const visibility = () => {
    setVisible(!visible);
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
        <br />
        url:{blog.url}
        <br />
        likes:{blog.likes}
        <br />
        {user.username}
        <button type="submit" onClick={visibility}>
          hide
        </button>
      </div>
      </div>

  );
};

export default Blog;
