import { useEffect, useState } from "react";
import "./css/Teams.css";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");

    fetch("https://cricketpulse-backend.onrender.com/api/teams/", {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {}
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch teams");
        return res.json();
      })
      .then(data => setTeams(data))
      .catch(err => {
        console.error(err);
        alert("Error loading teams ❌");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = teams.filter(team =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="teams-page">
      <h2>Teams</h2>

      <input
        type="text"
        placeholder="Search team..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading teams...</p>
      ) : filtered.length === 0 ? (
        <p>No teams found</p>
      ) : (
        filtered.map(team => (
          <div key={team.id} className="team-card">
            <h3>{team.name}</h3>

            <p>Matches: <b>{team.matches}</b></p>
            <p>Wins: <b>{team.wins}</b></p>
            {/* <p>Loses: <b>{team.losses}</b></p> */}
            <p>Win Percentage : <b>{team.win_percentage}</b>%</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Teams;