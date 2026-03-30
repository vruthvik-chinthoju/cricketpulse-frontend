import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./css/Register.css";

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
      alert("All fields are required ⚠️");
      return;
    }

    if (data.password.length < 6) {
      alert("Password must be at least 6 characters 🔒");
      return;
    }

    setLoading(true);

    try {
      await axios.post("https://cricketpulse-backend.onrender.com/api/register/", data);

      alert("Registered successfully ✅");

      const loginRes = await axios.post("https://cricketpulse-backend.onrender.com/api/token/", {
        username: data.username,
        password: data.password
      });

      localStorage.setItem("access", loginRes.data.access);
      localStorage.setItem("refresh", loginRes.data.refresh);

      navigate("/");
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(JSON.stringify(err.response.data));
      } else {
        alert("Network error ❌");
      }
    }

    setLoading(false);
  };

  return (
    <div className="main">
      <h1>Register</h1>

      <div className="box">
        <label>Username :</label>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Enter Username"
        />

        <label>Email :</label>
        <input
          name="email"
          onChange={handleChange}
          placeholder="Enter Email"
        />

        <label>Password :</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Enter Password"
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;