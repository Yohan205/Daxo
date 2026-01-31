const fs = require("fs");
const yutil = require("yutil.js");

const decryptEnv = async function () {
  const envData = fs.readFileSync("encrypt.env", "utf-8");

  const decryptData = await yutil.decrypt(envData, "SetPasswordHere1234");

  fs.writeFile(".env", decryptData, "utf-8", (err) => {
    if (err) console.error(err);
  });
};

decryptEnv();
