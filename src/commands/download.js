module.exports = {
  name: "download",
  aliases: ["dl"],
  description: "Download media commands",
  async execute(sock, msg, args){
    const sender = msg.key.remoteJid;
    await sock.sendMessage(sender,{ text:"Download commands coming soon..." });
  }
};
