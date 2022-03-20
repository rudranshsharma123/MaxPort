import React, { useState, useEffect } from "react";
import Deso from "deso-protocol";
import Navbar from "../navbar/navbar";
import { toastySuccess } from "../../consts/toasts";
import Popup from "reactjs-popup";
import "./feed.css";
function Feed() {
	const deso = new Deso();
	const [posts, setPosts] = useState([]);
	const [publicKey, setPublicKey] = useState("");
	const [message, setMessage] = useState("");
	const getPostsForFeed = async () => {
		const req = {};
		const res = await deso.posts.getPostsStateless(req);
		console.log(res.data.PostsFound);
		setPosts((prev) => [...prev, ...res.data.PostsFound]);
		console.log(posts);
	};
	const sendDiamonds = async (toPublicKey, postHashHex) => {
		toastySuccess("Sending Diamonds");
		const request = {
			ReceiverPublicKeyBase58Check: toPublicKey,
			SenderPublicKeyBase58Check: publicKey,
			DiamondPostHashHex: postHashHex,
			DiamondLevel: 1,
			MinFeeRateNanosPerKB: 1000,
			InTutorial: false,
		};
		//sleep(5000);

		// toastySuccess("Diamonds Sent");
		const res = await deso.social.sendDiamonds(request);
		console.log(res);
		toastySuccess("Diamonds Sent");
	};
	const pfps = [
		"https://i.pinimg.com/originals/83/89/2c/83892c806ca8f287926b91f15ce5adc0.jpg",
		"https://i.pinimg.com/236x/91/fd/ce/91fdceeaba021b3c87e8d696c13d618f.jpg",
		"http://pm1.narvii.com/7305/f687328407de3238a00b165790d5b01a505ff9d6r1-720-960v2_uhq.jpg",
		"data:image/jpeg;base64,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",
	];

	const sendMessage = async (toPublicKey) => {
		toastySuccess("sending message");
		const request = {
			RecipientPublicKeyBase58Check: toPublicKey,
			SenderPublicKeyBase58Check: publicKey,
			MessageText: message,
		};
		const res = await deso.social.sendMessage(request);
		console.log(res);
		setMessage("");
		toastySuccess("message sent");
	};
	useEffect(() => {
		getPostsForFeed();
	}, []);
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
		<div className="main">
			<Navbar />
			<div className="cards-container">
				<ul className="cards">
					{posts.map((post, i) => {
						console.log(post);
						let baseUri = "https://diamondapp.com/posts/";
						let postHash = post.PostHashHex;
						let image = post.ImageURLs
							? post.ImageURLs[0]
							: "https://media.giphy.com/media/n46TWKCi1vF1Oov8yd/giphy.gif";
						let pfp = i % pfps.length;
						let name = post.ProfileEntryResponse.Username;
						return (
							<li key={i} style={{ margin: "30px" }}>
								<a href={baseUri + postHash} className="card">
									<img src={image} className="card__image" alt="" />
									<div className="card__overlay">
										<div className="card__header">
											<svg
												className="card__arc"
												xmlns="http://www.w3.org/2000/svg">
												<path />
											</svg>
											<img className="card__thumb" src={pfps[pfp]} alt="" />
											<div className="card__header-text">
												<h3 className="card__title">{name}</h3>
												<span className="card__status">1 hour ago</span>
											</div>
										</div>
										<p className="card__description">{post.Body}</p>
									</div>
								</a>

								<div className="button-container">
									<button
										className="cta-button mint-button"
										onClick={async () => {
											await sendDiamonds(
												"BC1YLhULJpt8KAd4NZheJngWeZEwDW988tRGfWWtv5gKfCSgJWXfgwb",
												postHash,
											);
										}}>
										Tip
									</button>
									<Popup
										trigger={
											<button className="cta-button mint-button">DM</button>
										}
										modal>
										{(close) => (
											<div className="modal">
												<button className="close" onClick={close}>
													&times;
												</button>
												<div className="header-m"> Send the DM </div>
												<div className="content-m">
													<input
														type="text"
														placeholder="Your Message"
														value={message}
														onChange={(e) => {
															setMessage(e.target.value);
														}}
													/>
													<button
														className="cta-button mint-button"
														onClick={async () => {
															await sendMessage(
																"BC1YLhULJpt8KAd4NZheJngWeZEwDW988tRGfWWtv5gKfCSgJWXfgwb",
															);
														}}>
														Send
													</button>
												</div>

												<button
													className="cta-button connect-wallet-button"
													onClick={() => {
														console.log("modal closed ");
														close();
													}}>
													close modal
												</button>
											</div>
										)}
									</Popup>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default Feed;
