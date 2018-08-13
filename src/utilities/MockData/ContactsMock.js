import Presence from "../enums/Presence";

export const getContactsMock = () => {
  return [
    {
      pubkey:
        "3GE0HU76J6KHHNMBKPYD3S7LOJ5PFLFPIIEHFXDKV0KFQCPRZP2HDTGNLS9ZAF26",
      username: "Ogromny | FNC",
      status: "Vive les vaches normandes! 🤠 🐮",
      presence: Presence.ONLINE,
      avatarUri: "https://avatars.githubusercontent.com/Ogromny?size=46",
      lastMessageTimestamp: 1519659888,
      unread: true
    },
    {
      pubkey:
        "14DDWYA1XW454N564PQ1LV5JJD44NWFJWCPUEDFG9FV6MB0FKTFCFVEDADKO5HXS",
      username: "Sean Perkins",
      status:
        "I think this idea could work, I just need to put more energy into it.",
      presence: Presence.BUSY,
      avatarUri: "https://personagenerator.com/user-sean.png",
      lastMessageTimestamp: 1519647578,
      unread: false
    },
    {
      pubkey:
        "IWJK4K5VZZ70E9X1DA724PFX3THR6N7GTHN4UKXZAVLKPNRJTEARS649QQ6M8JC3",
      username: "Joan Perez",
      status: "My students come first in everything I do. 🙂",
      presence: Presence.AWAY,
      avatarUri: "https://personagenerator.com/user-7.png",
      lastMessageTimestamp: 1519647032,
      unread: false
    },
    {
      pubkey:
        "NOYGLAIMCQL5IJKQIGPEOBJI7APNJC1BIZFR6VK2JSFZRV01NNMYZSVULTKXUNIW",
      username: "Ricky Metzger",
      status:
        "I love this idea, and I can't wait to test it with our customers!",
      presence: Presence.OFFLINE,
      avatarUri: "https://personagenerator.com/user-ricky.png",
      lastMessageTimestamp: 1519642102,
      unread: false
    },
    {
      pubkey:
        "NOYGLAIMCQL5IX1DA724PFX3THR6N7GTHN4UKXZAVLKJKQIGPEOBJI7APNJC1BIZ",
      username: "John Doe",
      status: "Yeah.",
      presence: Presence.OFFLINE,
      lastMessageTimestamp: 1519642062,
      unread: false
    }
  ];
};
