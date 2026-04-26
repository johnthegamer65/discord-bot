module.exports = {
  // Channel ID where welcome messages are sent
  WELCOME_CHANNEL_ID: "CHANNEL_ID_HERE",

  EMBED: {
    // Accent color (left border strip)
    ACCENT_COLOR: 0x2b6cb0,

    // Banner image at the top — set to null to disable
    BANNER_URL: null,

    // Thumbnail/badge shown — set to null to disable
    THUMBNAIL_URL: "https://ik.imagekit.io/8uafykfsx/p58Lbvz.png?updatedAt=1774712949801",

    // Welcome message body
    // {mention} = the new member's @mention
    // {server}  = the server name
    BODY:
      "Welcome {mention}, Welcome to {server}! " +
      "We are here to dispatch Police, Fire, and EMS " +
      "while keeping communications professional and smooth across Hillsborough County.\n\n" +
      "To become a dispatcher, Please go to our <#1479582866903011351> channel. " +
      "Please make sure to abide by the application rules and you may apply.",

    // Optional footer — set to null to disable
    FOOTER: null,
  },
};
