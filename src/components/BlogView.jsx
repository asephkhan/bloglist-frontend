import { useParams } from "react-router-dom";
const BlogView = ({blogs}) => {
const {id} = useParams();

const blog = blogs?.find((b) => b.id === id);
    return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: <a href={blog.url}>{blog.url}</a></p>
      <p>Likes: {blog.likes}</p>
      <p>Added by: {blog.user?.name}</p>
    </div>
    )
}

export default BlogView