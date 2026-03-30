import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PredictButton({ match, disabled, predictions, setPredictions }) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const alreadyPredicted = predictions.some(
    (p) => p.match === match.id || p.match_id === match.id
  );

  const selected = predictions.find(
    (p) => p.match === match.id || p.match_id === match.id
  )?.predicted_team;

  const handlePredict = async (teamId) => {
    if (disabled || loading || alreadyPredicted) return;

    const token = localStorage.getItem("access");

    if (!token) {
      alert("Please login first ⚠️");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://cricketpulse-backend.onrender.com/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          match: match.id,
          predicted_winner: teamId
        })
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Error");
        return;
      }

      alert("Prediction submitted ✅");

      setPredictions(prev => [
        ...prev,
        {
          match: match.id,
          match_id: match.id,
          predicted_team: teamId
        }
      ]);

    } catch (err) {
      console.log(err);
      alert("Network error ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <button
        disabled={disabled || loading || alreadyPredicted}
        onClick={() => handlePredict(match.team1_id)}
        style={{
          background: selected === match.team1_id ? "#22c55e" : ""
        }}
      >
        {loading ? "..." : match.team1}
      </button>

      <button
        disabled={disabled || loading || alreadyPredicted}
        onClick={() => handlePredict(match.team2_id)}
        style={{
          background: selected === match.team2_id ? "#22c55e" : ""
        }}
      >
        {loading ? "..." : match.team2}
      </button>

      {selected && (
        <p style={{ color: "#22c55e", fontSize: "14px" }}>
          You predicted:{" "}
          {selected === match.team1_id ? match.team1 : match.team2}
        </p>
      )}
    </>
  );
}

export default PredictButton;