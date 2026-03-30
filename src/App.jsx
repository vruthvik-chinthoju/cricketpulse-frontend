import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Login from "./components/Login"
import Register from "./components/Register"
import Leaderboard from "./components/Leaderboard"
import MatchList from "./components/MatchList"
import MyPredictions from "./components/MyPredictions";
import Teams from "./components/Teams";
import Chatbot from "./components/Chatbot";
import Home from "./components/home"
import Stats from "./components/Stats"
import { HashRouter } from "react-router-dom";
import GithubCallback from "./components/Githubcallback";
import Admin from "./components/AdminPanel"




function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/matches" element={<h1><MatchList/></h1>} />
        <Route path="/github-callback" element={<GithubCallback />} />
        <Route path="/teams" element={<h1><Teams/></h1>} />
        <Route path="/stats" element={<h1><Stats/></h1>} />
        <Route path="/ai-stats" element={<h1>AI Stats</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-predictions" element={<MyPredictions/>} />
        <Route path="/leaderboard" element={<h1><Leaderboard/></h1>} />
      </Routes>
      <Chatbot/>
    </HashRouter>
  );
}

export default App;