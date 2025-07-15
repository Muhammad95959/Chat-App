export interface IUser {
  id: string;
  name: string;
  room: string;
}

export default class Users {
  users: IUser[];
  constructor() {
    this.users = [];
  }

  addUser(id: string, name: string, room: string) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  getUserList(room: string) {
    const users = this.users.filter((user) => user.room === room);
    const namesArray = users.map((user) => user.name);
    return namesArray;
  }

  getUser(id: string) {
    return this.users.filter((user) => user.id === id)[0];
  }

  removeUser(id: string) {
    const user = this.getUser(id);
    if (user) this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
