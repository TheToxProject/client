export const getConversationMock = contact => {
  return [
    {
      id: 0,
      author: {
        name: "SkyzohKey",
        avatarUri: "https://avatars2.githubusercontent.com/u/8523159"
      },
      fromSelf: true,
      showAvatar: true,
      message: {
        type: "text",
        text: "Let's have a pretty Tox demo conversation"
      },
      time: Date.now()
    },
    {
      id: 1,
      author: {
        name: contact.username,
        avatarUri: contact.avatarUri
      },
      fromSelf: false,
      showAvatar: true,
      message: {
        type: "text",
        text: "sure."
      },
      time: Date.now()
    },
    {
      id: 2,
      author: {
        name: contact.username,
        avatarUri: contact.avatarUri
      },
      fromSelf: false,
      showAvatar: false,
      message: {
        type: "text",
        text: "I'm affraid that you'll have to do the heavy-lifting though..."
      },
      time: Date.now()
    },
    {
      id: 3,
      author: {
        name: "SkyzohKey",
        avatarUri: "https://avatars2.githubusercontent.com/u/8523159"
      },
      fromSelf: true,
      showAvatar: true,
      message: {
        type: "text",
        text: "mmmokay"
      },
      time: Date.now()
    },
    {
      id: 4,
      author: {
        name: "SkyzohKey",
        avatarUri: "https://avatars2.githubusercontent.com/u/8523159"
      },
      fromSelf: true,
      showAvatar: false,
      message: {
        type: "text",
        text:
          "Sometimes I wish somebody would build a mockup engine, but then I remember that the program is a mockup engine..."
      },
      time: Date.now()
    },
    {
      id: 5,
      author: {
        name: "SkyzohKey",
        avatarUri: "https://avatars2.githubusercontent.com/u/8523159"
      },
      fromSelf: true,
      showAvatar: false,
      message: {
        type: "text",
        text: "🙀"
      },
      time: Date.now()
    },
    {
      id: 6,
      author: {
        name: contact.username,
        avatarUri: contact.avatarUri
      },
      fromSelf: false,
      showAvatar: true,
      message: {
        type: "text",
        text: "I see"
      },
      time: Date.now()
    },
    {
      id: 7,
      author: {
        name: contact.username,
        avatarUri: contact.avatarUri
      },
      fromSelf: false,
      showAvatar: false,
      message: {
        type: "action",
        text: "guesses that it's the time for a random cat pic"
      },
      time: Date.now()
    },
    {
      id: 8,
      author: {
        name: "SkyzohKey",
        avatarUri: "https://avatars2.githubusercontent.com/u/8523159"
      },
      fromSelf: true,
      showAvatar: true,
      message: {
        type: "text",
        text: "Just what I was thinking :3"
      },
      time: Date.now()
    },
    {
      id: 9,
      author: {
        name: "SkyzohKey",
        avatarUri: "https://avatars2.githubusercontent.com/u/8523159"
      },
      fromSelf: true,
      showAvatar: false,
      message: {
        type: "image",
        source: {
          uri:
            "http://www.bandofcats.com/wp-content/uploads/2016/03/cat-pictures-fleur-kitten_01.jpg"
        }
      },
      time: Date.now()
    },
    {
      id: 10,
      author: {
        name: "SkyzohKey",
        avatarUri: "https://avatars2.githubusercontent.com/u/8523159"
      },
      fromSelf: true,
      showAvatar: false,
      message: {
        type: "text",
        text: "In the future, augmented cats will solve most houseold problems"
      },
      time: Date.now()
    },
    {
      id: 11,
      author: {
        name: contact.username,
        avatarUri: contact.avatarUri
      },
      fromSelf: false,
      showAvatar: true,
      message: {
        type: "image",
        source: {
          uri: "https://i.ytimg.com/vi/lUaNo_L7AKU/hqdefault.jpg"
        }
      },
      time: Date.now()
    },
    {
      id: 12,
      author: {
        name: contact.username,
        avatarUri: contact.avatarUri
      },
      fromSelf: false,
      showAvatar: false,
      message: {
        type: "text",
        text: "Don't count me as conviced!"
      },
      time: Date.now()
    },
    {
      id: 13,
      author: {
        name: contact.username,
        avatarUri: contact.avatarUri
      },
      fromSelf: false,
      showAvatar: false,
      message: {
        type: "text",
        text: "😂 😂"
      },
      time: Date.now()
    }
  ];
};
