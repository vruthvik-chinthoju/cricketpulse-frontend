import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./css/Login.css";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  // 🔥 GitHub Login
  const githubLogin = () => {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=Ov23ligSAFksea0QwijE&scope=user:email&redirect_uri=https://vruthvik-chinthoju.github.io/cricketpulse-frontend/#/github-callback";
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/api/login/`, data);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="main">
      <h1>Login</h1>
      <div className="box">
        <label>Username</label>
        <input name="username" onChange={handleChange} placeholder=" You Name" />

        <label>Password</label>
        <input name="password" type="password" onChange={handleChange}  placeholder=" Your Password"/>

        <button onClick={handleLogin}>Login</button>

        <hr />

        <h3>Or Login with</h3>

        <div className="auth">
          {/* 🔥 GOOGLE LOGIN */}
          <GoogleLogin
            onSuccess={async (res) => {
              try {
                const response = await axios.post(`${API}/api/auth/google/`, {
                  credential: res.credential
                });

                localStorage.setItem("access", response.data.access);
                localStorage.setItem("refresh", response.data.refresh);

                alert("Login successful ✅");
                navigate("/");
              } catch (err) {
                console.log(err);
                alert("Login failed ❌");
              }
            }}
          />

          {/* 🔥 GITHUB LOGIN */}
          <button
            onClick={githubLogin}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              background: "#505d69",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              letterSpacing: "2px",
              paddingLeft: "30px",
            }}
          >
            <svg height="20" width="20" viewBox="0 0 16 16" fill="white">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 
              6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53
              -.49-2.69-.94-.09-.23-.48-.94-.82
              -1.13-.28-.15-.68-.52-.01-.53.63
              -.01 1.08.58 1.23.82.72 1.21 1.87
              .87 2.33.66.07-.52.28-.87.51-1.07
              -1.78-.2-3.64-.89-3.64-3.95 0-.87.31
              -1.59.82-2.15-.08-.2-.36-1.02.08-2.12
              0 0 .67-.21 2.2.82.64-.18 1.32-.27
              2-.27s1.36.09 2 .27c1.53-1.04
              2.2-.82 2.2-.82.44 1.1.16 1.92.08
              2.12.51.56.82 1.27.82 2.15 0 3.07
              -1.87 3.75-3.65 3.95.29.25.54.73.54
              1.48 0 1.07-.01 1.93-.01 2.2 0
              .21.15.46.55.38A8.013 8.013 0 0
              0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>

            Login with GitHub
          </button>
        </div>

        <p>
          Don't Have an Account <Link to="/Register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;