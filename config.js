module.exports = {
  // Your bot token
  TOKEN: "MTQ5NzU5NDc1NTY0NTcwMjE1NA.Gh__c6.BuupmF1HnmTGg70tR5oJUhQhm6Tx5F_QlYF_Og",

  // ----- Command settings -----
  PREFIX: "!",
  COMMAND: "callout",

  // Delete the !callout message after sending the embed?
  DELETE_COMMAND_MESSAGE: true,

  // ----- Role IDs -----
  // Only members with this role can run !callout
  TRIGGER_ROLE_ID: ["1479582865980129440", "1479582865980129435"],

  // Role that gets pinged when the callout is sent (e.g. Department Personnel)
  PING_ROLE_ID: "1479582865972007051",

  // ----- Embed / Components v2 content -----
  EMBED: {
    ACCENT_COLOR: 0xe1c47b,

    TITLE: "Department Shift Callout – Recommended",

    BODY:
      "{mention} has requested more dispatchers online, all available " +
      "personnel are advised to respond, doing so will result in an " +
      "increased chance of promotion(s). If attending; please react to " +
      "gauge attendance.",

    FOOTER: "Department Management advises you respond! Have fun.",
  },

  // Restrict to specific channels — leave [] for all channels
  ALLOWED_CHANNEL_IDS: [],
};
