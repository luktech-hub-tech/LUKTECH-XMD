module.exports = {
  name: "restart",
  aliases: ["reboot"],
  description: "Restart bot",
  async execute(sock, msg, args){
    const sender = msg.key.remoteJid;
    await sock.sendMessage(sender,{ text:"Bot is restarting..." });
    process.exit(0);
  }
};
