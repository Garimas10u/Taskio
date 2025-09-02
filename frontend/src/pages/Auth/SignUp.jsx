import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = () => {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImageURL: "",
    role: "member",
    adminInviteToken: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, profileImageURL, role, adminInviteToken } = formData;

    if (!name || !email || !password) {
      setError("Please fill all required fields.");
      return;
    }

    if (role === "admin" && !adminInviteToken) {
      setError("Please enter Admin Access Token for admin role.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        profileImageURL,
        role,
        adminInviteToken: adminInviteToken,
      });

      const { token, role: userRole, ...user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);

        navigate(userRole === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-screen flex flex-col mt-6">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-800 tracking-wide ">
          Create Your Account
        </h1>

        <p className="text-lg text-slate-500 mt-[5px] mb-4">
          Please fill in the details below
        </p>

        <form onSubmit={handleSignUp}>
          <Input
            value={formData.name}
            onChange={handleChange("name")}
            label="Full Name"
            type="text"
            placeholder="John Doe"
          />
          <Input
            value={formData.email}
            onChange={handleChange("email")}
            label="Email Address"
            type="email"
            placeholder="john@example.com"
          />
          <Input
            value={formData.password}
            onChange={handleChange("password")}
            label="Password"
            type="password"
            placeholder="Min 8 Characters"
          />
          <Input
            value={formData.profileImageURL}
            onChange={handleChange("profileImageURL")}
            label="Profile Image URL"
            type="text"
            placeholder="https://example.com/profile.jpg (Optional)"
          />

          <div className="mb-4">
            <label className="text-[13px] text-slate-800">Role</label>
            <select
              value={formData.role}
              onChange={handleChange("role")}
              className="input-box w-full"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {formData.role === "admin" && (
            <Input
              value={formData.adminInviteToken}
              onChange={handleChange("adminInviteToken")}
              label="Admin Access Token"
              type="text"
              placeholder="Enter Admin Token"
            />
          )}

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-5 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="loader h-4 w-4"></div>
                Signing Up...
              </>
            ) : (
              "SIGN UP"
            )}
          </button>

          <p className="text-[13px] text-slate-800 mt-4 text-center">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
