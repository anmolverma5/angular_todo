module.exports = {
  createUser ({ firstname,lastname,email, password }) {
// var firstname = 'anmol';
// var lastname = 'kasa';
// var email = 'kasa@gmail.com';
// var password = 12345678;
    console.log(`Add user ${firstname} , ${lastname}, ${email} with password ${password}`)
    return Promise.resolve()
  }
}