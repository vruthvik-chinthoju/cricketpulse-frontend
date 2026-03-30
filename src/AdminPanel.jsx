import { useEffect, useState } from "react";
import "./components/css/AdminPanel.css"

function AdminPanel() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access");

  useEffect(() => {
    fetch("https://cricketpulse-backend.onrender.com/api/matches/")
      .then(res => res.json())
      .then(data => {
        setMatches(data);
        setLoading(false);
      });
  }, []);

  const updateWinner = async (matchId, teamId) => {
    try {
      const res = await fetch(
        `https://cricketpulse-backend.onrender.com/api/update-winner/${matchId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ winner: teamId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error");
        return;
      }

      alert("Winner updated ✅");

      // 🔥 update UI instantly
      setMatches(prev =>
        prev.map(m =>
          m.id === matchId ? { ...m, winner: teamId, status: "completed" } : m
        )
      );

    } catch (err) {
      console.log(err);
      alert("Network error ❌");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-panel">
      <h2>Admin - Update Match Winners</h2>

      {matches.map(match => (
        <div key={match.id} className="admin-card">

          <p><b>Match {match.match_number}</b></p>
          <p>{match.team1} vs {match.team2}</p>

          <div className="btns">
            <button
              disabled={match.winner}
              onClick={() => updateWinner(match.id, match.team1_id)}
            >
              {match.team1}
            </button>

            <button
              disabled={match.winner}
              onClick={() => updateWinner(match.id, match.team2_id)}
            >
              {match.team2}
            </button>
          </div>

          {match.winner && (
            <p className="done">Winner selected ✅</p>
          )}

        </div>
      ))}
    </div>
  );
}

export default AdminPanel;