import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { toastySuccess } from "../../consts/toasts";
import Deso from "deso-protocol";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function Login() {
	const navigate = useNavigate();
	const [publicKey, setPublicKey] = useState("");
	const deso = new Deso();
	const request = 3;

	const handlePage = () => {
		navigate("/todo");
	};
	const handleEns = () => {
		navigate("/ens");
	};

	useEffect(() => {
		try {
			toastySuccess("checking to see if you have already logged in");
			const key = deso.identity.getUserKey();
			if (key !== "" && key !== null) {
				setPublicKey(key);
				toastySuccess("you have already logged in, check footer for details");
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<>
			<div className="log">
				<h1>Welcome to MaxPort</h1>
				<div
					className="login-container"
					onClick={async (e) => {
						e.preventDefault();
						const res = await deso.identity.login(request);
						const s = await deso.identity.getUserKey();
						console.log(s);
						console.log(res);
						setPublicKey(res.key);
					}}>
					Login With/DeSo
				</div>
				<div
					className="login-container"
					onClick={() => {
						handleEns();
					}}>
					Head to Ethereum Domain Service (ENS)
				</div>
				<footer className="foot">
					<>
						<div>Your account on deso is {publicKey} </div>
						<button onClick={handleEns}>Click me to procceed</button>
					</>
				</footer>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default Login;
