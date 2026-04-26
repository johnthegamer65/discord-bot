const {
  Client,
  GatewayIntentBits,
  Partials,
  MessageFlags,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
} = require("discord.js");

const config = require("./config");
const welcomeConfig = require("./welcome-config");

console.log("=== BOT STARTING ===");
console.log("Token set:", config.TOKEN && config.TOKEN !== "YOUR_BOT_TOKEN_HERE" ? "YES" : "NO - TOKEN IS NOT SET");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

// ---- Callout embed builder ----
function buildCalloutComponents(triggerMember) {
  const { EMBED } = config;

  const bodyText = EMBED.BODY.replace(
    "{mention}",
    triggerMember ? `<@${triggerMember.id}>` : "@unknown"
  );

  const container = new ContainerBuilder()
    .setAccentColor(EMBED.ACCENT_COLOR);

  if (EMBED.BANNER_URL) {
    container.addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(
        new MediaGalleryItemBuilder().setURL(EMBED.BANNER_URL)
      )
    );
  }

  container
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`# ${EMBED.TITLE}`)
    )
    .addSeparatorComponents(
      new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true)
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(bodyText)
    )
    .addSeparatorComponents(
      new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(false)
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`-# ${EMBED.FOOTER}`)
    );

  return container;
}

// ---- Welcome embed builder ----
function buildWelcomeComponents(member) {
  const { EMBED } = welcomeConfig;

  const bodyText = EMBED.BODY
    .replace(/{mention}/g, `<@${member.id}>`)
    .replace(/{server}/g, member.guild.name);

  const container = new ContainerBuilder()
    .setAccentColor(EMBED.ACCENT_COLOR);

  if (EMBED.BANNER_URL) {
    container.addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(
        new MediaGalleryItemBuilder().setURL(EMBED.BANNER_URL)
      )
    );
  }

  container.addTextDisplayComponents(
    new TextDisplayBuilder().setContent(bodyText)
  );

  if (EMBED.FOOTER) {
    container
      .addSeparatorComponents(
        new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(false)
      )
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`-# ${EMBED.FOOTER}`)
      );
  }

  return container;
}

// ---- Welcome event ----
client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(welcomeConfig.WELCOME_CHANNEL_ID);
  if (!channel) return;

  try {
    const container = buildWelcomeComponents(member);
    await channel.send({
      content: `<@${member.id}>`,
      components: [container],
      flags: MessageFlags.IsComponentsV2,
    });
  } catch (err) {
    console.error(
      `[Welcome] Failed to send welcome message for ${member.user.tag} (${member.id}) ` +
      `in guild "${member.guild.name}" (${member.guild.id}):`,
      err
    );
  }
});

// ---- Callout command ----
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
  const hasRole = Array.isArray(config.TRIGGER_ROLE_ID)
    ? config.TRIGGER_ROLE_ID.some(id => member.roles.cache.has(id))
    : member.roles.cache.has(config.TRIGGER_ROLE_ID);

  if (!member || !hasRole) {
    return message.reply("❌ You don't have permission to use this command.");
  }

  if (config.DELETE_COMMAND_MESSAGE) {
    await message.delete().catch(() => {});
  }

  try {
    const container = buildCalloutComponents(member);

    await message.channel.send({
      content: `<@&${config.PING_ROLE_ID}>`,
      allowedMentions: { roles: [config.PING_ROLE_ID] },
      components: [container],
      flags: MessageFlags.IsComponentsV2,
    });
  } catch (err) {
    console.error("[Callout] Failed to send callout embed:", err);
    message.reply("❌ Failed to send the callout.").catch(() => {});
  }
});

// ---- Ready ----
client.once("ready", () => {
  console.log(`✅  Logged in as ${client.user.tag}`);
  console.log(`   Callout command: ${config.PREFIX}${config.COMMAND}`);
  console.log(`   Welcome channel: ${welcomeConfig.WELCOME_CHANNEL_ID}`);

  // Validate the welcome channel exists and the bot can send messages there
  const welcomeChannel = client.channels.cache.get(welcomeConfig.WELCOME_CHANNEL_ID);
  if (!welcomeChannel) {
    console.warn(
      `⚠️  [Welcome] Channel ID "${welcomeConfig.WELCOME_CHANNEL_ID}" not found. ` +
      "Welcome messages will not be sent until this is corrected."
    );
  } else if (!welcomeChannel.permissionsFor(client.user)?.has("SendMessages")) {
    console.warn(
      `⚠️  [Welcome] Bot lacks SendMessages permission in channel "${welcomeConfig.WELCOME_CHANNEL_ID}". ` +
      "Welcome messages may fail."
    );
  } else {
    console.log(`   Welcome channel validated: #${welcomeChannel.name}`);
  }
});

client.login(config.TOKEN).catch(err => {
  console.error("❌ LOGIN FAILED:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED ERROR:", err);
});
