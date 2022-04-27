const express = require('express');
const router = express.Router();
var screen = require('../screen');
var db = require('../db');
var users = require('../users-repo');

router.post('/',
    async (req, res, next) => {
        // TODO insert user

        const firstname = req.body.firstname ? req.body.firstname : '';
        const lastname = req.body.lastname ? req.body.lastname : '';
        const email = req.body.email ? req.body.email : '';
        const password = req.body.passwordGroup.password ? req.body.passwordGroup.password : '';
        console.log(req.body.passwordGroup.password);
        // bcrypt.hash(req.body.password,10).then((hash)=>{
        //         password: hash
        //     })
        console.log(firstname);

        if (!firstname) {
            return res.json({ success: false, message: 'firstname is required' });
        } else if (!lastname) {
            return res.json({ success: false, message: 'lastname is required' });
        } else if (!email) {
            return res.json({ success: false, message: 'email is required' });
        } else if (!password) {
            return res.json({ success: false, message: 'password is required' });
        }
        knex('users')
            .insert({ firstname, lastname, email, password })
            .then((id) => {
                //get user by id
                knex('users')
                    .select({
                        id: 'id',
                        firstname: 'firstname',
                        lastname: 'lastname',
                        email: 'email',
                        password: 'password',
                    })
                    .where({ id })
                    .then((users) => {
                        return res.json(users[0]);
                    })
            })
            .catch((err) => {
                console.error(err);
                return res.json({ success: false, message: 'An error occurred, please try again later.' });
            });
    }
);


module.exports = router;