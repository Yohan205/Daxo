const mongoose = require('mongoose');
const { Telegram } = require('telegraf');
const { BOT } = require("../settings/config");

//let URI = `mongodb+srv://Daxo:`+BOT.passMongo+`@cluster0.kl1zz.mongodb.net/retryWrites=true&w=majority`;

const botTelegram = new Telegram(BOT.TOKEN.TELEGRAM);

let URI = `mongodb+srv://Daxo:`+BOT.DB.KEY_MONGO+`@cluster0.kl1zz.mongodb.net/DaxoDB?retryWrites=true&w=majority`;

const MAX_RETRIES = 10; // Máximo de intentos antes de dejar de reintentar
let retries = 0;

function connectDB() {
    mongoose.connect(URI)
        .then(() => {
            console.log(BOT.console.db+"✅ Conectado a MongoDB :D");
            botTelegram.sendMessage(BOT.tChatID,"✅ Conectado a MongoDB :D");
            retries = 0; // Reiniciar el contador en caso de éxito
        })
        .catch((e) => {
            console.error("❌ Error conectando a MongoDB:", e.message);
            botTelegram.sendMessage(BOT.tChatID, "❌ Error conectando a MongoDB:" + e.message); //.then(ans => console.log(ans) );
            retries++;
            if (retries <= MAX_RETRIES) {
                console.log(`🔄 Reintentando conexión cada 5 segundos (${retries}/${MAX_RETRIES})...`);
                botTelegram.sendMessage(BOT.tChatID, `🔄 Reintentando conexión cada 5 segundos (${retries}/${MAX_RETRIES})...`);
                setTimeout(connectDB, 5000); // Reintenta después de 5 segundos
            } else {
                console.log("🚨 Se alcanzó el máximo de intentos. No se intentará más.");
                botTelegram.sendMessage(BOT.tChatID, "🚨 Se alcanzó el máximo de intentos. No se intentará más.");
            }
        });
}

// Iniciar la conexión
connectDB();

module.exports = mongoose;