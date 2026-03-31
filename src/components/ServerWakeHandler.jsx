import { useEffect, useState } from "react";
import axios from "axios";
import "./css/ServerWakeHandler.css"

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

    // Delay popup so it doesn't flash for fast responses
    const delay = setTimeout(() => {
      if (!serverUp) setLoading(true);
    }, 2000);

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
        <div style={styles.overlay} className="box">
          <div style={styles.popup} className="sleep">
            <h2>Waking up server...</h2>
            <p>This may take 20–30 seconds (Render free tier)</p>

            <div style={styles.loader}></div>
          </div>
        </div>
      )}

      {/* App Content */}
      {children}
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  popup: {
    background: "#fff",
    padding: "30px 40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  loader: {
    margin: "20px auto",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    animation: "spin 1s linear infinite",
  },
};

// Inject keyframes (since single file)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
  100% { transform: rotate(360deg); }
}
`, styleSheet.cssRules.length);