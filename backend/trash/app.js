"user strict";
var screen = require('./screen');
var db = require('./db');
var users = require('./users-repo');
var jsonBody = require('body/json');
var formidable = require('formidable');
var axios = require('axios');
var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
const app = express();
const { validationResult } = require('express-validator');


const store = require('./route/store.js')

const port = process.env.PORT || 3000;



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
app.get('/getusers', (req, res) => {
    users.listUsers().then(function (result) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
        screen.write(result, "pretty");
    })
        .catch(function (err) {
            screen.write('get users not working');
            screen.write(err);
        })
});

app.post('/users', (req, res) => {
    // TODO insert user

    // console.log(req.body);
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
});


