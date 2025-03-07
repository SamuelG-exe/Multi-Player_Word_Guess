import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Welcome";
import JoinGame from "./components/JoinGame";
import NewGame from "./components/NewGame";
import Game from "./components/Game";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join-game" element={<JoinGame />} />
        <Route path="/new-game" element={<NewGame />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
