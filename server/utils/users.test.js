const expect = require('expect');
const Users = require('./users');

describe('users.js', () => {
  describe('Users()', () => {
    let users;
    let usersArray;

    beforeEach(() => {
      users = new Users();
      usersArray = [
        {
          id: '1',
          name: 'Test1',
          room: 'Testing1'
        },
        {
          id: '2',
          name: 'Test2',
          room: 'Testing2'
        },
        {
          id: '3',
          name: 'Test3',
          room: 'Testing2'
        }
      ];
      users.users = usersArray;
    });

    describe('.addUser()', () => {
      it('should add a new user', () => {
        const users = new Users();
        const user = {
          id: '123',
          name: 'Test',
          room: 'Testing'
        };
        const resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
      });
    });

    describe('.removeUser()', () => {
      it('should remove a user', () => {
        const users = new Users();
        const user = {
          id: '123',
          name: 'Test',
          room: 'Testing'
        };
        users.addUser(user.id, user.name, user.room);
        const resUser = users.removeUser(user.id);

        expect(user).toEqual(resUser);
        expect(users.users).toEqual([]);
      });

      it('should return undefined when user is not found', () => {
        const users = new Users();
        const resUser = users.removeUser('123');

        expect(resUser).toEqual(undefined);
        expect(users.users).toEqual([]);
      });
    });

    describe('.getUser()', () => {
      it('should get user object', () => {
        const resUser = users.getUser('1');
        expect(resUser).toEqual(users.users[0]);
      });

      it('should return undefined when user is not found', () => {
        const resUser = users.getUser('0');
        expect(resUser).toEqual(undefined);
      });
    });

    describe('.getUserList()', () => {
      it('should return names for the room `Testing2`', () => {
        const userList = users.getUserList('Testing2');
        expect(userList).toEqual(['Test2', 'Test3']);
      });

      it('should return names for the room `Testing1`', () => {
        const userList = users.getUserList('Testing1');
        expect(userList).toEqual(['Test1']);
      });
    });

  });
});
