import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from "./views/EnsMint/App";
import Login from "./views/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posting from "./views/Posting/Posting";
import Board from "./views/board/Board";
import Feed from "./views/feed/Feed";
// import

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/ens" element={<App />} />

			<Route path="/post" element={<Posting />} />
			<Route path="/board" element={<Board />} />
			<Route path="/feed" element={<Feed />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root"),
);