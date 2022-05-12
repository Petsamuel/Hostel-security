require("dotenv").config();
const express = require("express");
const app = express();

const {
  doc,
  getFirestore,
  collection,
  onSnapshot,
  where,
  query,
  db,
  colRef,
  getDocs,
} = require("./firebase");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
const csrf = require("csurf");
const { json } = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));
app.use("/js", express.static("public/js"));
app.use("/styles", express.static("public/styles"));

//setting up the database and the webauthn api
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://security-system-5169e-default-rtdb.firebaseio.com",
});

const API_URL = "https://apiv2.passwordless.dev";
const API_SECRET = "biee:secret:c5218e3a9b614b4fba29744e476096c8"; // API_KEY_SECRET
const API_KEY = "biee:public:3934336a0f5e4b86bbc5b9fc1b167262";
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.all("/", async (req, res) => {
  const studentdata = await getDocs(colRef)
    .then((snapshot) => {
      let users = [];
      snapshot.docs.map((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      return users;
    })
    .catch((err) => {
      console.log("failed to get users");
    });

  let Studentinfo = studentdata.map((items) => {
    // return items.phone_no && items.isVerified !== false;
    return items.phone_no;
  });
  let StudentMat = studentdata.map((items) => {
    return items.matricNo;
  });

  let studentStatus = studentdata.map((items) => {
    return [items.phone_no, items.isverified];
  });

  res.render("index", {
    result: Studentinfo,
    studentmat: StudentMat,
    studentStatus: studentStatus,
    user: studentdata,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
