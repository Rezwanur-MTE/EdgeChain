const SHA256= require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp= timestamp;
        this.data= data;
        this.previousHash= previousHash;
        this.hash= this.calculateHash();
        this.nonce=0;

    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
           this.nonce++;
            this.hash= this.calculateHash();

        }

        console.log("Block mined : "+this.hash);

    }
}

class Blockchain{

    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty= 4;

    }

    createGenesisBlock(){
        return new Block(0,"03/12/2023","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
       // newBlock.hash= newBlock.calculateHash();
       newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);

    }

    isChainValid(){
        for(let i=1; i<= this.chain.length; i++){
            const currentBlock= this.chain[i];
            const previousBlock= this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                  return false;
            }
             if(currentBlock.previousHash !== previousBlock.hash){
                  return false;
             }
        }

        return true;
    }

}


let edgeCoin = new Blockchain();
console.log("Mining Block 1...");
edgeCoin.addBlock(new Block(1, "09/12/2023",{ amountBDT : 4}));
console.log("Mining Block 2...");
edgeCoin.addBlock(new Block(2, "14/12/2023",{ amount$ : 7}));

console.log(JSON.stringify(edgeCoin,null, 4));