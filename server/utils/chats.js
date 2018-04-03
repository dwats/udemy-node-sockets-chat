const { getNewDiscriminator } = require('./discriminator');

/**
 *
 * @todo Incorporate uuid time based ID generation.
 * @class Chats
 */
class Chats {
  constructor() {
    this.chats = [];
  }

  addChat(name, user) {
    const chat = {
      name,
      user,
      discriminator: getNewDiscriminator(name, this.chats)
    };
    this.chats.push(chat);
    return chat;
  }

  removeChat(name, user) {
    const chat = this.getChat(name);
    if (chat) {
      this.chats = this.chats.filter((chat) => chat.name !== name);
    }
    return chat;
  }

  getChat(name) {
    return this.chats.filter((chat) => chat.name === name)[0];
  }

  getChatList() {
    const chatList = [];
    this.chats.forEach((chat) => {
      chatList.push(chat.name);
    });
    return chatList;
  }
}

module.exports = Chats;
