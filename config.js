module.exports = {
  // Your bot token
  TOKEN: process.env.TOKEN || "MTQ5NzU5NDc1NTY0NTcwMjE1NA.GgjNsC.yL0U9pAlFAh_gj_pWvAcNrmJbP6uaCjEJGhEhI",

  // ----- Command settings -----
  PREFIX: "!",
  COMMAND: "callout",

  // Delete the !callout message after sending?
  DELETE_COMMAND_MESSAGE: true,

  // ----- Role IDs -----
  // Single role: "123456789"
  // Multiple roles: ["123456789", "987654321"]
  TRIGGER_ROLE_ID: ["1479582865980129440", "1479582865980129435"],

  // Role that gets pinged when callout is sent
  PING_ROLE_ID: "1479582865972007051",

  // ----- Embed content -----
  EMBED: {
    // Accent color (left border strip)
    ACCENT_COLOR: 0xe1c47b,

    // Banner image shown at the top of the embed
    // Set to null to disable: BANNER_URL: null
    BANNER_URL: "https://ik.imagekit.io/8uafykfsx/p58Lbvz.png?updatedAt=1774712949801",

    // Large heading shown below the banner
    TITLE: "Department Shift Callout – Recommended",

    // Body text — {mention} is replaced with whoever ran the command
    BODY:
      "{mention} has requested more dispatchers online, all available " +
      "personnel are advised to respond, doing so will result in an " +
      "increased chance of promotion(s). If attending; please react to " +
      "gauge attendance.",

    // Small footer line
    FOOTER: "Department Management advises you respond! Have fun.",
  },

  // Restrict to specific channels — leave [] for all channels
  ALLOWED_CHANNEL_IDS: [],
};
