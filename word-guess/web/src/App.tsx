import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import qMark from "./assets/questionMark.png";
import JoinGame from "./JoinGame";
import NewGame from "./NewGame";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>WordGuess</h1>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div>
                  <p>
                    Are you ready to Play
                    <img src={qMark} className="logo" alt="Question Mark" />
                  </p>
                </div>

                <div className="card">
                  <Link to="/join-game">
                    <button className="NavButton">Join Game</button>
                  </Link>
                  <Link to="/new-game">
                    <button className="NavButton">New Game</button>
                  </Link>
                </div>
              </div>
            }
          />

          <Route path="/join-game" element={<JoinGame />} />

          <Route path="/new-game" element={<NewGame />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
