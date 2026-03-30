import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";


async function wakeServer() {
  try {
    const res = await fetch("https://cricketpulse-backend.onrender.com/api/match-list/");
    return res.ok;
  } catch {
    return false;
  }
}

function Root() {
  const [serverDown, setServerDown] = useState(true);
  const [count, setCount] = useState(10);

  useEffect(() => {
    let interval;

    const start = async () => {
      let awake = false;

      while (!awake) {
        awake = await wakeServer();

        if (!awake) {
          setServerDown(true);

          let c = 10;
          setCount(c);

          await new Promise((resolve) => {
            interval = setInterval(() => {
              c--;
              setCount(c);

              if (c === 0) {
                clearInterval(interval);
                resolve();
              }
            }, 1000);
          });
        }
      }

      setServerDown(false); 
    };

    start();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <App />
      
      {serverDown && (
        <div className="server-popup">
          <div className="popup-box">
            <h2>🏏 CricketPulse</h2>
            <p>Server is waking up...</p>

            <div className="countdown">
              {count}s
            </div>

            <div className="spinner"></div>
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="246111769075-p4r1ulljo9399ntck8b90per0uetrvtl.apps.googleusercontent.com">
    <Root />
  </GoogleOAuthProvider>
);