module.exports = {
  name: "menu",
  aliases: ["help"],
  description: "Show bot menu",
  async execute(sock, msg, args){
    const sender = msg.key.remoteJid;
    const menuText = `
Welcome to LUKTECH-XMD Bot ✅

Commands:

.owner / .restart → Restart bot
.group → Group management
.download → Download media
.media → Send media/files
.fun → Fun commands
.menu / .help → Show this menu
`;
    await sock.sendMessage(sender,{ text: menuText });
  }
};
