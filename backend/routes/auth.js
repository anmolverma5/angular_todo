require("dotenv").config({ path: "../.env" });
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/',
    async (req, res, next) => {
        const email = req.body.email ? req.body.email : '';
        const password = req.body.password ? req.body.password : '';
        // bcrypt.hash(req.body.password,10).then((hash)=>{
        //         password: hash
        //     })


        if (!email) {
            return res.json({ success: false, message: 'email is required' });
        } else if (!password) {
            return res.json({ success: false, message: 'password is required' });
        }
        var usernameReq = req.body.email;
        var passwordReq = req.body.password;
        knex('users')
            .where({ email: email })
            .select({
                id: 'id',
                firstname: 'firstname',
                lastname: 'lastname',
                email: 'email',
                is_admin: 'is_admin',
                password: 'password',
            })
            .then(function (result) {
                if (!result || !result[0]) {  // not found!
                    console.log('invalid username');
                    return res.status(401).json({ success: false, message: 'invalid username' });
                    // report invalid username
                }
                var pass = result[0].password;
                if (password === pass) {
                    var privateKey = ('../private.key');
                    var token = jwt.sign({ id: result[0].id, is_admin: result[0].is_admin, firstname: result[0].firstname, lastname: result[0].lastname, email: email }, "" + process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    // res.status(200).send([ result[0].id, result[0].firstname, result[0].lastname, email, true, token ]);
                    res.status(200).send([token]);
                    // res.status(200).send({ id: result[0].id,firstname: result[0].firstname,lastname:  result[0].lastname,email: email, auth: true, token: token });
                } else {
                    // failed login
                    console.log('Password Incorrect');
                    return res.status(401).json({ success: false, message: 'Faild To Login' });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
);

module.exports = router;