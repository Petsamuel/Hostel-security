require('dotenv').config();
const express = require('express');
const app = express();
const firebase = require('firebase/app');
const auth = require('firebase/auth');
const firebaseConfig = require('./firebase');
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
const csrf = require('csurf');


firebase.initializeApp(firebaseConfig);

app.use(bodyParser.json());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", ("./views"));
app.use(express.static("./public"));
app.use("/js", express.static("public/js"));
app.use("/styles", express.static("public/styles"));


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://security-system-5169e-default-rtdb.firebaseio.com"
});
const csrfmiddleware = csrf({ cookies: true })

const apiurl = process.env.API_URL || "https://apiv2.passwordless.dev";
const API_SECRET = process.env.API_SECRET || "Bieefilled:secret:bf1185e1a863427ea9f9d0fe7bc524c2"; // Replace with your API secret
const API_KEY = process.env.API_KEY || "Bieefilled:public:ddb7c9f8960d46fd84805e42d5cb6717"; // this will be injected to index.html
app.get('/', (req, res) => {

    res.render('index');
});
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     next();
// });
app.all('*', (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken);
    next();
})

app.all('/', (req, res) => {

    res.render('index');
})
app.get('/profile', (req, res) => {

    res.render('dashboard');

})

app.post('/sessionlogin', (req, res) => {
    const idToken = req.body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    getAuth().createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie('session', sessionCookie, options);
                res.end(JSON.stringify({ status: "success" }))
            },
            (error) => {
                console.log(error);
            }
        )
})

app.get('/sessionlogout', (req, res) => {
    res.clearCookie(session);
    res.redirect(index);
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`)
})