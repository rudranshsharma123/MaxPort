const main = async () => {
	const domainContractFactory = await hre.ethers.getContractFactory(
		"DomainService",
	);
	const domainContract = await domainContractFactory.deploy("coder");
	await domainContract.deployed();

	console.log("Contract deployed to:", domainContract.address);

	// CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
	let txn = await domainContract.register("Alpha2", {
		value: hre.ethers.utils.parseEther("0.01"), 
	});
	await txn.wait();
	console.log("Minted domain Alpha2.coder");

	txn = await domainContract.setRecords(
		"Alpha2",
		"I am the first one",
		"LinkedInd",
		"Twitter",
		"Github",
		"WebSite",
		"Email",
		"Leetcode",
	);
	await txn.wait();
	console.log("Set record for Alpha1.coder");

	const address = await domainContract.getAddress("Alpha2");
	console.log("Owner of domain Alpha1:", address);

	const balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
