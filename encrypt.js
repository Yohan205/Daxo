require("dotenv").config();
const fs = require('fs');
const yutil = require('yutil.js');

const encryptEnv = async () => {
    const envData = fs.readFileSync('.env', 'utf-8');

    const encryptData = await yutil.encrypt(envData, process.env.secretENV)

    fs.writeFile('encrypt', encryptData, 'utf-8', (err) => { if(err) console.error(err)});
}

encryptEnv();