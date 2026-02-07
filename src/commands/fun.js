module.exports = {
  name: "fun",
  aliases: ["f"],
  description: "Fun commands",
  async execute(sock, msg, args){
    const sender = msg.key.remoteJid;
    await sock.sendMessage(sender,{ text:"Fun commands coming soon..." });
  }
};
