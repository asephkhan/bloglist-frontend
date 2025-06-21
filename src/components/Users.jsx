import React from "react";
import { Link } from "react-router-dom";

const Users = ({ blogs }) => {
  const userBlogCount = {};

  blogs?.forEach((blog) => {
    const user = blog.user;
    if (user) {
      userBlogCount[user.username] = {
        username: user.username,
        userId: user._id,
        count: (userBlogCount[user.username]?.count || 0) + 1,
      };
    }
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <h2>Users</h2>
            <th>Blogs Created</th>
          </tr>
        </thead>
        {Object.values(userBlogCount).map((user) => (
          <tbody>
            <tr>
              <Link to={`/user/${user.userId}`}>{user.username}</Link>
              <td>{user.count}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Users;
