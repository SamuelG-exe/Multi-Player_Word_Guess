import React from "react";
import { Link } from "react-router-dom";

const NewGame = () => {
  return (
    <div>
      <div>
        <p>Start a new game.</p>
      </div>

      <div className="card">
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NewGame;
