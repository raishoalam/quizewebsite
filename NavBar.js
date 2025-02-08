import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/quiz">Start Quiz</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
