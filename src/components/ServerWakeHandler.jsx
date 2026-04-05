import { useEffect, useState } from "react";
import axios from "axios";
import "./css/ServerWakeHandler.css";

export default function ServerWakeHandler({ children }) {
  const [loading, setLoading] = useState(false);
  const [serverUp, setServerUp] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let retryTimeout;
    let progressInterval;

    const checkServer = async () => {
      try {
        await axios.get("https://cricketpulse-backend.onrender.com/api/matches/");
        setServerUp(true);
        setLoading(false);
        setProgress(100);
        clearInterval(progressInterval);
      } catch (err) {
        setLoading(true);
        retryTimeout = setTimeout(checkServer, 3000);
      }
    };

    
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; 
        return prev + Math.random() * 10;
      });
    }, 800);

    const delay = setTimeout(() => {
      if (!serverUp) setLoading(true);
    }, 1500);

    checkServer();

    return () => {
      clearTimeout(retryTimeout);
      clearTimeout(delay);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <>
      {loading && !serverUp && (
        <div className="wake-overlay">
          <div className="wake-popup">
            <h2>Waking up CricketPulse AI</h2>

            <p>{getMessage(progress)}</p>

  
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <span className="progress-text">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>
      )}

      {children}
    </>
  );
}


function getMessage(progress) {
  if (progress < 30) return "Starting server...";
  if (progress < 60) return "Loading AI models...";
  if (progress < 90) return "Fetching match data...";
  return "Almost ready...";
}