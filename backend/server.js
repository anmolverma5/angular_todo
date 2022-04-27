require("dotenv").config({ path: "./variables.env" });
require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const authenticate = require("./routes/auth");
const register = require("./routes/register");
const userData = require("./routes/userdata");
const userUpdate = require("./routes/userUpdate");
const logout = require("./routes/logout");

const { options } = require("./routes/auth");


app.use("*", cors());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.enable("trust proxy");

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


app.get("/ping", (req, res, next) => {
    res.status(200).send("OK");
});
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, "" + process.env.JWT_KEY, (err, user) => {
        console.log(err)

        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

app.use("/api/authenticate", authenticate);
app.use("/users", register);
app.use("/userData", authenticateToken, userData);
app.use("/userUpdate", authenticateToken, userUpdate);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Stated at ${PORT}`)
});
