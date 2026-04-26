module.exports = {
  // Channel ID where welcome messages are sent
  WELCOME_CHANNEL_ID: "1479582866563399688",

  EMBED: {
    // Accent color (left border strip)
    ACCENT_COLOR: 0xe1c47b,

    // Banner image at the top — set to null to disable
    BANNER_URL: null,

    // Thumbnail/badge shown — set to null to disable
    THUMBNAIL_URL: "https://ik.imagekit.io/8uafykfsx/0f045eb53e69d5c20e14642d96200db6.png?updatedAt=1774713500214",

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
