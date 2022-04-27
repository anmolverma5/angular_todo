const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/',

    async (req, res, next) => {
        res.clearCookie("token");
        res.status(200).send({ message: "Cookies cleared" });
    }
);


module.exports = router;