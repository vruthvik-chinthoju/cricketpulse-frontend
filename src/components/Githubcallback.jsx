import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/githubcallback.css"

function GithubCallback() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const fullUrl = window.location.href;

    const code = fullUrl.split("code=")[1]?.split("#")[0];

    console.log("GITHUB CODE CLEAN:", code);


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

  return (
    <div className="box">
      <h2>Logging in With Git hub</h2>
    </div>
  )
}

export default GithubCallback;


