### ChatGPT Prompt 
> Im about to write a web3 script in deno that querires this contract
Contract: 0x524cAB2ec69124574082676e6F654a18df49A048
I would like to read the canClaim function and write all the values to the console and a clean javascript object in the format of lilPudgys=[{tokenId:'1',Minted: True},...] this function should incrament through all 22,222 but we will need to batch the call in incraments of 50 and wait a few seconds before calling the next batch.

I some modifications but pretty good.

After playing with the api it did not like me batching calls so i just rate limited it and sent 1 at a time.
Also made some scripts to parse the data but i deleted it and am just kinda archiving this for now. its ez to run the script again if u care.

### Run
create a .env file with api key
```
APIKEY=YOURS
```

```
deno run --allow-all index.js
```
