"use strict";

var Promise = require("bluebird");
var db = require('./db');


module.exports =
{
  listUsers: function () {
    return db.select('id', 'email').from("users").then();
  },
  listUsersByEmail: function (searchTxt) {
    return db("users").select("*").where("email", "like", "%" + searchTxt + "%").then();
  },
  DeleteUsers: function (usersID) {
    return db('users').where('id', usersID).del().then();
  },
  AddUsers: function (UserAdd) {
    return db('users').insert(UserAdd, "id").then();
  }
};