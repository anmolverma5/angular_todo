const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/',

    async (req, res, next) => {
        console.warn(req.headers['authorization']);
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        jwt.verify(token, "" + process.env.JWT_KEY, (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)
            req.user = user
            console.warn(user.is_admin);
            if (user.is_admin == 1) {
                knex("users").select("*").where("email", "like", user.email).then((users) => {
                    return res.json(users);
                })
            } else {
                knex("users").select("*").then((users) => {
                    return res.json(users);
                })
            }
        })

    }

);


module.exports = router;