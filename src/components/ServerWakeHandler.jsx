import { useEffect, useState } from "react";
import axios from "axios";
import "./css/ServerWakeHandler.css";

export default function ServerWakeHandler({ children }) {
  const [loading, setLoading] = useState(false);
  const [serverUp, setServerUp] = useState(false);

  useEffect(() => {
    let retryTimeout;

    const checkServer = async () => {
      try {
        await axios.get("https://cricketpulse-backend.onrender.com/api/matches/");
        setServerUp(true);
        setLoading(false);
      } catch (err) {
        console.log("Server sleeping... retrying");
        setLoading(true);
        retryTimeout = setTimeout(checkServer, 3000);
      }
    };

    const delay = setTimeout(() => {
      if (!serverUp) setLoading(true);
    }, 1500);

    checkServer();

    return () => {
      clearTimeout(retryTimeout);
      clearTimeout(delay);
    };
  }, []);

  return (
    <>
      {/* Popup */}
      {loading && !serverUp && (
        <div className="server-overlay">
          <div className="server-popup">
            <h2>🚀 Waking up server...</h2>
            <p>Please wait a few seconds (Render free tier)</p>

            <div className="spinner"></div>
          </div>
        </div>
      )}

      {children}
    </>
  );
}