const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Create a new keypair
//const newPair = new Keypair();

// Extract the public and private key from the keypair
//const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
//const privateKey = newPair._keypair.secretKey;

// Connect to Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

//console.log("Public Key of the generated keypair", publicKey);

// Get the wallet balanace from a given private key
const getWalletBalance = async (publicKey) => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        //console.log("Connection object is:", connection);

        // Make a wallet (keypair) from privateKey and get its balance
        //const myWallet = await Keypair.fromSecretKey(privateKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);

    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async (publicKey) => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        //const myWallet = await Keypair.fromSecretKey(privateKey);

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            2 * LAMPORTS_PER_SOL
        );

        await connection.confirmTransaction({
            signature: fromAirDropSignature,
        });
    } catch (err) {
        console.log(err);
    }
};

const mainFunction = async () => {

    const publicKey = process.argv[2];

    if (!publicKey) {
        return console.log("No public key entered.");
    } else {
        await getWalletBalance(publicKey);
        await airDropSol(publicKey);
        await getWalletBalance(publicKey);
    }
};

mainFunction();