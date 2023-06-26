const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt);

const comparePasswords = (inputPassword, hasedPassword) =>
  bcrypt.compareSync(inputPassword, hasedPassword);

module.exports = { hashPassword, comparePasswords };
