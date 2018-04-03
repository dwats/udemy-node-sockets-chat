class Users {

  constructor() {
    this.users = [];
  }

  addUser (id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    let removedUser;
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex > -1) {
      removedUser = this.users.splice(userIndex, 1)[0];
      return removedUser;
    }
    return removedUser;
  }

  getUser(id) {
    let user;
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex > -1) {
      user = this.users[userIndex];
      return user;
    }
    return user;
  }

  getUserList(room) {
    const users = this.users
      .filter(user => user.room === room)
      .map(user => user.name);
    return users;
  }

}

module.exports = Users;
