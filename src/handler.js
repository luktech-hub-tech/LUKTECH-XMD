const fs = require("fs");
const path = require("path");
const config = require("./config");

const commands = {};
const cmdFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(f => f.endsWith(".js"));

for(const file of cmdFiles){
  const cmd = require(`./commands/${file}`);
  if(cmd.name) commands[cmd.name] = cmd;
  if(cmd.aliases && config.useAliases) cmd.aliases.forEach(a => commands[a] = cmd);
}

async function handle(sock, msg, text) {
  const sender = msg.key.remoteJid;
  const prefixUsed = config.prefixes.find(p => text.startsWith(p));
  if(!prefixUsed) return;

  const args = text.slice(prefixUsed.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if(commands[command]) {
    try { await commands[command].execute(sock, msg, args); } 
    catch(e){ console.error("CMD ERROR", e); }
  }
}

module.exports = { handle };
