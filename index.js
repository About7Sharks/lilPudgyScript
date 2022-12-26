import Web3 from "https://deno.land/x/web3/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const { APIKEY } = config();
// Connect to the Ethereum mainnet using Infura
const web3 = new Web3(APIKEY);
const contractAddress = "0x524cAB2ec69124574082676e6F654a18df49A048"; // Contract address
// Contract ABI
const contractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "canClaim",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // Add other contract ABI here...
];
const contract = new web3.eth.Contract(contractABI, contractAddress); // Create an instance of the contract
const batchSize = 1; // Set the batch size (number of tokens to check in each batch)
const batchDelay = 100; // Set the delay between batches (in milliseconds)
const lilPudgys = [];
async function main() {
    try{
        // The total number of tokens
        const totalTokens = 10000;
        // Loop through the tokens in batches
        for (let i = 1000; i < totalTokens; i += batchSize) {
          // Check the canClaim status of each token in the current batch
          const batch = [];
          for (let j = i; j < i + batchSize; j++) {batch.push(contract.methods.canClaim(j).call())}
          // Wait for all calls in the batch to complete
          const results = await Promise.all(batch);
          // Add the results to the list of Pudgy tokens
          for (let j = 0; j < results.length; j++) {
            lilPudgys.push({
              tokenId: j + i,
              minted: results[j],
            });
          }
          console.log(lilPudgys[lilPudgys.length-1])
          await new Promise((resolve) => setTimeout(resolve, batchDelay));
        }
          console.log(lilPudgys);
          Deno.writeTextFile("lilPudgys10000.json", JSON.stringify(lilPudgys));      
    }catch(e){
        console.log(e)
        const fileData = await JSON.parse(await Deno.readTextFile('./lilPudgys.json'));
        fileData.push(...lilPudgys)
        Deno.writeTextFile("lilPudgysErrorCatch.json", JSON.stringify(fileData));
    }
}
// Run the main function
main();
