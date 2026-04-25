const {
  Client,
  GatewayIntentBits,
  Partials,
  MessageFlags,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
} = require("discord.js");

const config = require("./config");

console.log("=== BOT STARTING ===");
console.log("Node version:", process.version);
console.log("Token set:", config.TOKEN && config.TOKEN !== "YOUR_BOT_TOKEN_HERE" ? "YES" : "NO - TOKEN IS NOT SET");
console.log("Trigger role:", config.TRIGGER_ROLE_ID);
console.log("Ping role:", config.PING_ROLE_ID);
console.log("Attempting to connect to Discord...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

// If not logged in after 15 seconds, report it
const loginTimeout = setTimeout(() => {
  console.error("❌ TIMEOUT: Could not connect to Discord after 15 seconds.");
  console.error("   Possible causes:");
  console.error("   1. Invalid bot token");
  console.error("   2. Wispbyte is blocking Discord WebSocket connections");
  console.error("   3. Discord API is down");
  process.exit(1);
}, 15000);

function buildCalloutComponents(triggerMember) {
  const { EMBED } = config;

  const bodyText = EMBED.BODY.replace(
    "{mention}",
    triggerMember ? `<@${triggerMember.id}>` : "@unknown"
  );

  const container = new ContainerBuilder()
    .setAccentColor(EMBED.ACCENT_COLOR)
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`**${EMBED.TITLE}**`)
    )
    .addSeparatorComponents(
      new SeparatorBuilder()
        .setSpacing(SeparatorSpacingSize.Small)
        .setDivider(true)
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(bodyText)
    )
    .addSeparatorComponents(
      new SeparatorBuilder()
        .setSpacing(SeparatorSpacingSize.Small)
        .setDivider(false)
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`-# ${EMBED.FOOTER}`)
    );

  return container;
}

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!message.content.toLowerCase().startsWith(`${config.PREFIX}${config.COMMAND}`)) return;

  if (
    config.ALLOWED_CHANNEL_IDS.length > 0 &&
    !config.ALLOWED_CHANNEL_IDS.includes(message.channelId)
  ) {
    return message.reply("❌ This command cannot be used in this channel.");
  }

  const member = message.member;
  if (!member || !config.TRIGGER_ROLE_ID.some(id => member.roles.cache.has(id))) {

  if (config.DELETE_COMMAND_MESSAGE) {
    await message.delete().catch(() => {});
  }

  try {
    const container = buildCalloutComponents(member);

    await message.channel.send({
      content: `<@&${config.PING_ROLE_ID}>`,
      allowedMentions: { roles: [config.PING_ROLE_ID] },
    });

    await message.channel.send({
      components: [container],
      flags: MessageFlags.IsComponentsV2,
    });
  } catch (err) {
    console.error("[Callout] Failed to send callout embed:", err);
    message.reply("❌ Failed to send the callout.").catch(() => {});
  }
};

client.once("ready", () => {
  clearTimeout(loginTimeout);
  console.log(`✅  Logged in as ${client.user.tag}`);
  console.log(`   Command: ${config.PREFIX}${config.COMMAND}`);
  console.log(`   Trigger role: ${config.TRIGGER_ROLE_ID}`);
  console.log(`   Ping role:    ${config.PING_ROLE_ID}`);
});

client.login(config.TOKEN).catch(err => {
  clearTimeout(loginTimeout);
  console.error("❌ LOGIN FAILED:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED ERROR:", err);
});
