const express = require("express");
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { handle } = require("./handler");

const app = express();
app.use(express.json());

let sock;
let pairingCode = null;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({ version, logger: pino({ level:"silent" }), auth: state, browser:["LUKTECH-XMD","Chrome","1.0"] });

  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", update => {
    const { connection, lastDisconnect } = update;
    if(connection === "close"){
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if(shouldReconnect) startBot();
    }
    if(connection === "open") console.log("LUKTECH-XMD connected");
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if(!msg.message || msg.key.fromMe) return;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    if(!text) return;
    await handle(sock, msg, text);
  });
}

startBot();

// Pairing API
app.post("/pair", async (req,res)=>{
  const { number } = req.body;
  if(!number) return res.json({ error:"Phone number required" });
  try{
    pairingCode = await sock.requestPairingCode(number);
    res.json({ code: pairingCode });
  }catch(err){
    res.json({ error:"Failed to generate pairing code" });
  }
});

// Status API
app.get("/status", (req,res)=>{
  res.json({ connected: sock?.user ? true : false });
});

app.get("/", (req,res)=>res.send("LUKTECH-XMD Backend Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("Server running on port "+PORT));
