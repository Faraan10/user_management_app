import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const USERS_PER_PAGE = 4;

const UsersList = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async (page) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users?page=${page}/&per_page=${USERS_PER_PAGE}`
      );
      setUsers(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 4));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (location.state?.updatedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === location.state.updatedUser.id
            ? location.state.updatedUser
            : user
        )
      );
    }
  }, [location.state?.updatedUser]);

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.error("user deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="task-container">
        <h2>The Users are Listed Below</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>UID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Avatar</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="avatar"
                  />
                </td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to={`/edit/${user.id}`} state={{ user }}>
                    <button className="btn btn-warning">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-wrapper">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-primary"
        >
          Previous
        </button>

        <span className="page-indicator">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UsersList;
