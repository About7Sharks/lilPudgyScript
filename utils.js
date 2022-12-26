// load .json
let data = await JSON.parse(await Deno.readTextFile("lilPudgys10000.json"))
// rewrite minted value to canClaim {tokenId:"1", minted:"true"}
// we only need the first 8888 tokens
data.forEach((item) => {
    item.canClaim = item.minted
    delete item.minted
})
// we want only the true values
data = data.filter((item) => item.canClaim === true)
// write to file
Deno.writeTextFile("data.json", JSON.stringify(data));