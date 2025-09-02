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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImageURL, setProfileImageURL] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your full name.");
      return;
    }
    if (!email) {
      setError("Please enter an email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        profileImageURL,
      });

      const { token, role,...user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-screen flex flex-col justify-center">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-800 tracking-wide mb-2">
          Create Your Account
        </h1>

        <p className="text-lg text-slate-500 mt-[5px] mb-6">
          Please fill in the details below
        </p>

        <form onSubmit={handleSignUp}>
          <Input
            value={name}
            onChange={({ target }) => setName(target.value)}
            label="Full Name"
            type="text"
            placeholder="John Doe"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            type="email"
            placeholder="john@example.com"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            type="password"
            placeholder="Min 8 Characters"
          />
          <Input
            value={profileImageURL}
            onChange={({ target }) => setProfileImageURL(target.value)}
            label="Profile Image URL"
            type="text"
            placeholder="https://example.com/profile.jpg"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary w-full mt-5">
            SIGN UP
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
