import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const User = ({ blogs }) => {
  const { id } = useParams();

  let userBlogs = blogs.filter((blog) => blog.user && blog.user._id === id);
  console.log("blogs", blogs);

  return (
    <>
      <h4>IndividualUser </h4>
      {userBlogs.map((blog) => (
        <ul>
          <li>{blog.title}</li>
        </ul>
      ))}
    </>
  );
};

export default User;
