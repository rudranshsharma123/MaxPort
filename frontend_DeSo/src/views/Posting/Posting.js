import React, { useState, useEffect } from "react";
import "./posting.css";
import Deso from "deso-protocol";
import { toastySuccess } from "../../consts/toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
function Posting() {
	const [isJob, setIsJob] = useState(false);
	const [bio, setBio] = useState("");
	const [name, setName] = useState("");
	const [skills, setSkills] = useState("");
	const [ens, setEns] = useState("");
	const [role, setRole] = useState("");
	const [publicKey, setPublicKey] = useState("");

	const [compBio, setCompBio] = useState("");
	const [compName, setCompName] = useState("");
	const [reqSkills, setReqSkills] = useState("");
	const [compRole, setCompRole] = useState("");
	const [Compensation, setCompensation] = useState("");
	const [jobType, setJobType] = useState("");
	const [compEns, setCompEns] = useState("");

	const handleJob = () => {
		setIsJob(!isJob);
	};
	const deso = new Deso();

	const jobPost = async () => {
		toastySuccess("posting your Profile");
		const requestForJob = {
			UpdaterPublicKeyBase58Check: publicKey,
			BodyObj: {
				Body: `Hello, I am a new job seeker, My Name is ${name} and I am looking for a job in ${role}. My skills are ${skills}. My bio is ${bio}, and you can find my ENS portfolio at ${ens}. Posted it using @MaxPort`,
				VideoURLs: [],
				ImageURLs: [],
			},
		};
		const res = await deso.posts.submitPost(requestForJob);
		console.log(res);
		setBio("");
		setName("");
		setSkills("");
		setEns("");
		setRole("");

		toastySuccess("Your post has been submitted, hex: ");
	};

	const postAJob = async () => {
		toastySuccess("posting Job");
		const jobRequest = {
			UpdaterPublicKeyBase58Check: publicKey,
			BodyObj: {
				Body: `Hello, we at ${compName} are looking for a ${jobType} in ${compRole} while offering ${Compensation} in USD. The required skills for the job are ${reqSkills}. the bio of the company is ${compBio}, and you can find our ENS portfolio at ${compEns}. Posted it using @MaxPort`,
				VideoURLs: [],
				ImageURLs: [],
			},
		};
		const res = await deso.posts.submitPost(jobRequest);
		console.log(res);
		setCompBio("");
		setCompName("");
		setReqSkills("");
		setCompRole("");
		setCompensation("");
		setJobType("");
		setCompEns("");
		toastySuccess("Your post has been submitted, hex:");
		toastySuccess(res.PostHashHex);
	};

	useEffect(() => {
		try {
			toastySuccess("checking to see if you have already logged in");
			const key = deso.identity.getUserKey();
			if (key !== "" && key !== null) {
				setPublicKey(key);
				toastySuccess("you have already logged in");
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<div className="main">
			<Navbar />
			<button onClick={handleJob} className="cta-button mint-button">
				Post {!isJob ? "Job" : "Your Profile"}
			</button>
			<div>
				{!isJob && (
					<div className="main-container">
						<p className="title" style={{ marginBottom: "10px" }}>
							Enter your Details
						</p>
						<div className="form-container">
							<input
								type="text"
								placeholder="Your Bio"
								value={bio}
								onChange={(e) => {
									setBio(e.target.value);
								}}
							/>
							<input
								type="text"
								placeholder="Your skills"
								value={skills}
								onChange={(e) => {
									setSkills(e.target.value);
								}}
							/>
							<input
								type="text"
								placeholder="Your ENS"
								value={ens}
								onChange={(e) => {
									setEns(e.target.value);
								}}
							/>
							<input
								type="text"
								placeholder="Your Pref Role"
								value={role}
								onChange={(e) => {
									setRole(e.target.value);
								}}
							/>
							<input
								type="text"
								placeholder="Your Name"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>

							<div>
								<button className="cta-button mint-button" onClick={jobPost}>
									Submit your profile on chain!
								</button>
							</div>
						</div>
					</div>
				)}
				{isJob && (
					<>
						<div className="main-container">
							<p className="title" style={{ marginBottom: "10px" }}>
								Enter The Job Details
							</p>
							<div className="form-container">
								<input
									type="text"
									placeholder="Company's Bio"
									value={compBio}
									onChange={(e) => {
										setCompBio(e.target.value);
									}}
								/>
								<input
									type="text"
									placeholder="Required skills"
									value={reqSkills}
									onChange={(e) => {
										setReqSkills(e.target.value);
									}}
								/>
								<input
									type="text"
									placeholder="Company's ENS"
									value={compEns}
									onChange={(e) => {
										setCompEns(e.target.value);
									}}
								/>
								<input
									type="text"
									placeholder="Role"
									value={compRole}
									onChange={(e) => {
										setCompRole(e.target.value);
									}}
								/>
								<input
									type="text"
									placeholder="Compensation"
									value={Compensation}
									onChange={(e) => {
										setCompensation(e.target.value);
									}}
								/>
								<input
									type="text"
									placeholder="Job Type"
									value={jobType}
									onChange={(e) => {
										setJobType(e.target.value);
									}}
								/>
								<input
									type="text"
									placeholder="Company's Name"
									value={compName}
									onChange={(e) => {
										setCompName(e.target.value);
									}}
								/>

								<div>
									<button className="cta-button mint-button" onClick={postAJob}>
										Submit your Job on chain!
									</button>
								</div>
							</div>
						</div>
					</>
				)}
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
		</div>
	);
}

export default Posting;
