import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./css/Register.css";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!data.username || !data.email || !data.password) {
      toast.success("All fields are required ⚠️");
      return;
    }

    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters 🔒");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://cricketpulse-backend.onrender.com/api/register/",
        data
      );

      toast.success("Registered successfully ✅");

      const loginRes = await axios.post(
        "https://cricketpulse-backend.onrender.com/api/token/",
        {
          username: data.username,
          password: data.password
        }
      );

      localStorage.setItem("access", loginRes.data.access);
      localStorage.setItem("refresh", loginRes.data.refresh);

      navigate("/");
    } catch (err) {
      console.log(err);

      if (err.response) {
        toast.error(JSON.stringify(err.response.data));
      } else {
        toast.error("Network error ❌");
      }
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1 className="register-title">Create Account</h1>

        <label className="register-label">Username</label>
        <input
          className="register-input"
          name="username"
          onChange={handleChange}
          placeholder="Enter username"
        />

        <label className="register-label">Email</label>
        <input
          className="register-input"
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
        />

        <label className="register-label">Password</label>
        <input
          className="register-input"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Enter password"
        />

        <button
          className="register-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;