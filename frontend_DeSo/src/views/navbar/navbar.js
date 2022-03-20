import React from "react";
import "./navbar.css";
function Navbar() {
	return (
		<nav>
			<div className="nav-links">
				<button className="cta-button" style={{ color: "black" }}>
					{" "}
					MaxPort
				</button>
				<a href="/">
					<button className="cta-button mint-button"> Home</button>
				</a>
				<a href="/ens">
					<button className="cta-button mint-button"> ENS</button>
				</a>
				<a href="/post">
					<button className="cta-button mint-button"> Post</button>
				</a>
				<a href="/feed">
					<button className="cta-button mint-button"> Feed</button>
				</a>
				<a href="/board">
					<button className="cta-button mint-button"> Board</button>
				</a>
			</div>
		</nav>
	);
}

export default Navbar;
