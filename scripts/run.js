const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const domainContractFactory = await hre.ethers.getContractFactory(
		"DomainService",
	);
	const domainContract = await domainContractFactory.deploy("bro");
	await domainContract.deployed();
	console.log("Contract deployed to:", domainContract.address);
	const txn = await domainContract.register("Hello", {
		value: hre.ethers.utils.parseEther("0.1"),
	});
	await txn.wait();

	// const owner = await domainContract.getAddress("Hello");
	// console.log("Owner:", owner);

	const one = await domainContract.connect(randomPerson).register("Onsdddsdsdsdsdsdsdsdsde", {
		value: hre.ethers.utils.parseEther("1111"),
	});
	await one.wait();

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

    try{
        let t = await domainContract.connect(randomPerson).withdraw()
        await t.wait()
    }
    catch(e){
        console.log(e);
        console.log("could not do this")
    }

    let oB = await hre.ethers.provider.getBalance(owner.address)
    console.log("Owner balance:", hre.ethers.utils.formatEther(oB))

    let t = await domainContract.connect(owner).withdraw()
    oB = await hre.ethers.provider.getBalance(owner.address)
    console.log("Owner balance:", hre.ethers.utils.formatEther(oB))

	const txn1 = await domainContract
		.connect(randomPerson)
		.setRecords("One", "1", "1", "1", "1", "1", "1", "1");

	await txn1.wait();

	const txn2 = await domainContract.connect(randomPerson).getPrice("One");
	// await txn2.wait();
	console.log(txn2);

	// const txn3 = await domainContract.connect(randomPerson).
	const two = await domainContract.connect(randomPerson).register("Two", {
		value: hre.ethers.utils.parseEther("0.5"),
	});
	await two.wait();
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
