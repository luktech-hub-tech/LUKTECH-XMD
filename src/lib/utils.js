const cooldowns = {};

function checkCooldown(sender, seconds = 3) {
  const now = Date.now();
  if(cooldowns[sender] && now - cooldowns[sender] < seconds*1000) return true;
  cooldowns[sender] = now;
  return false;
}

function antiLink(text) {
  const regex = /(https?:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+)/gi;
  return regex.test(text);
}

function antiMention(text) {
  const regex = /@/gi;
  return regex.test(text);
}

module.exports = { checkCooldown, antiLink, antiMention };
