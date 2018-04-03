const expect = require('expect');
const Chats = require('./chats');
const { getNewDiscriminator } = require('./discriminator');

describe('chats.js', () => {
  describe('Chats()', () => {
    let chats;
    let chatsArray;

    beforeEach(() => {
      chats = new Chats();
      chatsArray = [
        {
          name: 'test1',
          user: 'user1',
          discriminator: getNewDiscriminator('test1', [])
        },
        {
          name: 'test2',
          user: 'user2',
          discriminator: getNewDiscriminator('test2', [])
        },
        {
          name: 'test1',
          user: 'user3',
          discriminator: getNewDiscriminator('test1', [])
        }
      ];
      chats.chats = chatsArray;
    });

    describe('.addChat()', () => {
      it('should add a new chat', () => {
        const chats = new Chats();
        const chat = {
          name: 'testing',
          user: 'user1'
        };
        chats.addChat(chat.name, chat.user);

        expect(chats.chats.length).toBe(1);
        expect(chats.chats[0].name).toBe(chat.name);
        expect(chats.chats[0].user).toBe(chat.user);
        expect(chats.chats[0].discriminator.length).toBe(4);
        console.log(chats.chats);
      });
    });


  });
});
