import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GithubCallback() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fullUrl = window.location.href;

    // 🔥 Extract code correctly (important for GitHub Pages)
    const code = fullUrl.split("code=")[1]?.split("&")[0];

    console.log("GITHUB CODE:", code);

    if (code) {
      axios.post(`${API}/api/github-login/`, { code })
        .then(res => {
          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);

          alert("GitHub login successful ✅");

          navigate("/");
        })
        .catch(err => {
          console.log(err);
          alert("GitHub login failed ❌");
        });
    }
  }, []);

  return <h2>Logging in with GitHub...</h2>;
}

export default GithubCallback;