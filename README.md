# Department Shift Callout Bot

Sends a **Components v2** callout embed whenever a member with a specific role
pings another specific role.

---

## Quick Setup

### 1. Install dependencies
```
npm install
```

### 2. Edit `config.js`
Open `config.js` and fill in:

| Field | What to put |
|---|---|
| `TOKEN` | Your bot token from the [Discord Developer Portal](https://discord.com/developers/applications) |
| `TRIGGER_ROLE_ID` | ID of the role allowed to fire the callout (e.g. "Department Management") |
| `WATCH_ROLE_PING_ID` | ID of the role that, when pinged, triggers the bot (e.g. "@here" role or a specific duty role) |
| `EMBED.ACCENT_COLOR` | Hex colour as a number, e.g. `0x2b6cb0` for blue |
| `EMBED.THUMBNAIL_URL` | URL to your department badge/logo image |
| `EMBED.TITLE` | Bold heading of the callout |
| `EMBED.BODY` | Body text. Use `{mention}` where you want the triggering user's @mention to appear |
| `EMBED.FOOTER` | Small grey footnote line |
| `ALLOWED_CHANNEL_IDS` | Array of channel IDs to restrict the bot to, e.g. `["123456", "789012"]`. Leave `[]` for all channels |

### 3. Bot Permissions & Intents
In the Developer Portal:
- **Privileged Intents**: enable **Message Content Intent**
- **Bot Permissions**: `Send Messages`, `Read Message History`, `View Channels`

### 4. Run
```
npm start
```

---

## How It Works

1. A member with `TRIGGER_ROLE_ID` sends a message in an allowed channel.
2. That message must ping `WATCH_ROLE_PING_ID` (e.g. `@DutyOfficers`).
3. The bot responds with a Components v2 container embed matching the callout style.

---

## Customising the Embed Later

All changes live in **`config.js`** — you never need to touch `index.js`.

- Change colours → `EMBED.ACCENT_COLOR`
- Change text → `EMBED.TITLE`, `EMBED.BODY`, `EMBED.FOOTER`
- Swap badge image → `EMBED.THUMBNAIL_URL`
- Restrict/expand channels → `ALLOWED_CHANNEL_IDS`
