"use strict";

var cfg = require("./knex-cfg");
var knex = require('knex')(cfg.client);
module.exports = cfg;
