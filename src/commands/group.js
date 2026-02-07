module.exports = {
  name: "group",
  aliases: ["grp"],
  description: "Group management commands",
  async execute(sock, msg, args){
    const sender = msg.key.remoteJid;
    await sock.sendMessage(sender,{ text:"Group commands coming soon..." });
  }
};
