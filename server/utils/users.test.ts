import expect from "expect";
import Users from "./users";

describe("Users", () => {
  let users: Users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Muhammad",
        room: "The Office Fans",
      },
      {
        id: "2",
        name: "Ahmed",
        room: "Scrubs Fans",
      },
      {
        id: "3",
        name: "Nour",
        room: "The Office Fans",
      },
    ];
  });

  it("Should add new user", () => {
    const users = new Users();
    const user = {
      id: "dkljlka",
      name: "Muhammad",
      room: "The Office Fans",
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("Should return names for the office fans", () => {
    const userList = users.getUserList("The Office Fans");
    expect(userList).toEqual(["Muhammad", "Nour"]);
  });

  it("Should return names for scrubs fans", () => {
    const userList = users.getUserList("Scrubs Fans");
    expect(userList).toEqual(["Ahmed"]);
  });

  it("Should find user", () => {
    const userID = "2";
    const user = users.getUser(userID);
    expect(user.id).toBe(userID);
  });

  it("Should not find user", () => {
    const userID = "150";
    const user = users.getUser(userID);
    expect(user).toBeUndefined();
  });

  it("Should remove a user", () => {
    const userID = "1";
    const user = users.removeUser(userID);
    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);
  });

  it("Should not remove a user", () => {
    const userID = "108";
    const user = users.removeUser(userID);
    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });
});
