import React from "react";
import { Link } from "react-router-dom";
import qMark from "../assets/questionMark.png";

const Home = () => {
  return (
    <div>
      <h1>WordGuess</h1>
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
  );
};

export default Home;
