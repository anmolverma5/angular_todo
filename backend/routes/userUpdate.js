const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/',

    async (req, res, next) => {
        const id = req.body.id ? req.body.id : '';
        const firstname = req.body.firstname ? req.body.firstname : '';
        const lastname = req.body.lastname ? req.body.lastname : '';
        const email = req.body.email ? req.body.email : '';
        const password = req.body.password ? req.body.password : '';

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
        } else if (!id) {
            return res.json({ success: false, message: 'id is required' });
        }
        knex("users")
            .update({ firstname, lastname, email, password })
            .where({ id })
            .then(rows => {
                // the argument here as you stated
                // describes the number of rows updated
                // therefore if no row found no row will be updated
                if (!rows) {
                    return res.status(404).json({ success: false });
                }
                return res.json({ success: true });
            })
            .catch(e => res.status(500).json(e));
    }

);


module.exports = router;