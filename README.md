# MaxPort
Multi-chain dApp which helps you get hired
## Inspiration
(You can see the demo video in real-time using the other link in the submission, the main video link has been 1.5Xed the speed for time saving)
I got the inspiration from LinkedIn and GoDaddy, to be honest. I saw how it helps people in getting jobs and especially how it acts as a profile for any working professionals (or even the aspiring ones). However, there are many problems with LinkedIn and most of the good features are hidden behind a paywall. (Especially the DM feature) no more. By using MaxPort both the Hiring team and the job seekers will have a direct line of communication with each other. 
Now talking about how GoDaddy, it is very clear with the shifting trend in hiring that having an online persona in terms of their own website is highly important. For people looking to make a standout Web3 portfolio and looking to get in the whole web3 space, having a .tech, .study or any typical Web2 domain just would not cut it. Hence, I made a .coder domain extension on the Polygon network. It will work with the ENS to DNS bridge (once it's done) and would resolve to a website like normal. The best part is that I have made it such that all your key data would be stored on-chain and you can visit your newly minted domain on OpenSea Polygon Mumbai Testnet. (It's kinda like unstoppable domains but better xD)

## What it does
It is a multi-chain platform that works on Two Chains as of now (Polygon and DeSo). The flow of the application works like the following ->
1. User enters the website Logs in using DeSo Identity and then gets their public key stored with the app.
2. User is then taken to the ENS domain minting service where they can reserve their own .coder domain and then see it live on the open sea testnet. User also would be required to enter their details to make the profile their own. 
3. User then can choose to go to the posting page where they can either post a job or post their portfolio and then that gets stored directly on the DeSo chain. 
4. User can now visit the board section where all the currently active jobs and the people up for hire are displayed they can either Tip the person there directly or they can choose to DM them. If they also want they can see the post directly on the Diamond App by clicking on the post.

## How we built it
It was built using React for the frontend, Solidity for the ENS Smart Contract for Polygon, and DeSo to decentralise the job board

## Challenges we ran into
Minting a whole ENS and domain name service was very tricky and there were many issues with getting solidity to work properly. DeSo also was a little weird since the newest hub is still in very beta form so I had to mix and match just to get the whole functionality of the app ready. 

## Accomplishments that we're proud of
The fact that everything works!

## What we learned
A lot about solidity, DeSo, and JS and CSS

## What's next for MaxPort
Improve the app upon user feedback!
