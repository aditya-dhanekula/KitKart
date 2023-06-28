const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;

const users = [
  {
    name: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin@admin.com", 10),
    isAdmin: true,
  },
  {
    _id: ObjectId("649c8b88aff8fa5f87d583d9"),
    name: "John",
    lastName: "Doe",
    email: "john@doe.com",
    password: bcrypt.hashSync("john@doe.com", 10),
  },
];

module.exports = users;
