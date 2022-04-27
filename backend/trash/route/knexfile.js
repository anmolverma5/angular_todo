const knex = require('knex')(require('./index.js'))
module.exports = {
  createUser ({ firstname,lastname,email, password }) {
    console.log(`Add user ${firstname} , ${lastname}, ${email} with password ${password}`)
    return knex('users').insert({
      firstname,
      lastname,
      email,
      password,
    }).then()
  }
}