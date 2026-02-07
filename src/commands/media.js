module.exports = {
  name: "media",
  aliases: ["m"],
  description: "Send media or files",
  async execute(sock, msg, args){
    const sender = msg.key.remoteJid;
    await sock.sendMessage(sender,{ text:"Media commands coming soon..." });
  }
};
