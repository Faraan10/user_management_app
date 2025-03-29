import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const existingUser = location.state?.user || {
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  };

  const [user, setUser] = useState(existingUser);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate avatar URL
    if (
      !user.avatar.match(/^https?:\/\/.*\/.*\.(png|webp|jpeg|jpg)\??.*$/gim)
    ) {
      toast.error("Enter a valid avatar URL");
      return;
    }

    try {
      await axios.put(`${BASE_URL}/api/users/${id}`, user);

      // ✅ Update local state instead of refetching mock API
      toast.success("User updated successfully");
      navigate("/", { state: { updatedUser: user } }); // Pass updated data back
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  return (
    <>
      <div className="note_container">
        <DialogTitle>Edit User</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <TextField
                fullWidth
                size="small"
                name="first_name"
                value={user.first_name}
                required
                placeholder="Enter first name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <TextField
                fullWidth
                size="small"
                name="last_name"
                value={user.last_name}
                required
                placeholder="Enter last name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <TextField
                fullWidth
                type="email"
                size="small"
                name="email"
                value={user.email}
                required
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="avatar" className="form-label">
                Avatar URL
              </label>
              <TextField
                fullWidth
                size="small"
                name="avatar"
                value={user.avatar}
                required
                placeholder="Enter avatar URL"
                onChange={handleChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Link to="/">
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </Link>
            <Button variant="contained" type="submit" color="success">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </div>
    </>
  );
};

export default EditUser;
