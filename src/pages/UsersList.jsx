import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const USERS_PER_PAGE = 4;

const UsersList = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllUsers = async () => {
    try {
      let allData = [];
      let page = 1;
      let totalUsers = 0;

      do {
        const response = await axios.get(
          `${BASE_URL}/api/users?page=${page}&per_page=${USERS_PER_PAGE}`
        );
        allData = [...allData, ...response.data.data];
        totalUsers = response.data.total;
        page++;
      } while (allData.length < totalUsers);
      setAllUsers(allData);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const fetchPaginatedUsers = async (page) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users?page=${page}&per_page=${USERS_PER_PAGE}`
      );
      setUsers(response.data.data);
      setTotalPages(Math.ceil(response.data.total / USERS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchPaginatedUsers(currentPage);
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

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${id}`);
      setAllUsers(allUsers.filter((user) => user.id !== id));
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
      toast.error("User deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const searchedUsers = allUsers.filter((user) =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(searchedUsers);
    }
  }, [searchQuery, users, allUsers]);

  return (
    <>
      <div className="task-container">
        <h2>The Users are Listed Below</h2>

        <input
          type="text"
          placeholder="Search by first name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
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
                  <td>
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
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
