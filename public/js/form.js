const loginform = document.getElementById("login");
const otpverify = document.getElementById("verifyOtp");
const phoneNum = document.getElementById("phoneNumber");
const Submitbtn = document.getElementById("sign-in-button");
const comfirmOtp = document.getElementById("loginsubmmit");
const innerInfo = document.getElementById("container");
const svg1 = document.getElementById("svg");
const form = document.getElementById("formID");
const verifiedMenu = document.querySelector("#statMenu");
//mobile login form
const formContent = document.querySelector(".formContent");
verifiedMenu.addEventListener("click", verifyMenu);
const verifiedContent = document.querySelector(".verifiedContent");

function verifyMenu() {
  formContent.classList.add("hidden");
  verifiedContent.classList.remove("hidden");
}

const navlogin = document.querySelector("#mlogin");
navlogin.addEventListener("click", () => {
  svg1.classList.add("hidden");
  form.classList.remove("hidden");
});

const registerform = document.querySelector("#register");
registerform.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginform.classList.add("hidden");
});

const registerBtn = document.querySelector("#printIcon");
registerBtn.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginform.classList.add("hidden");
});

const loginbtn = document.querySelector("#loginbtn");
loginbtn.addEventListener("click", () => {
  registerform.classList.add("hidden");
});
const output = document.getElementById("message");
function Output(text) {
  const currentText = output.innerHTML;
  var newLine = text;
  output.innerHTML = newLine;
}

//EVERYTHING FIREBASE Auth
// -STEP1 SETTING RECAPTCHA
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  "sign-in-button",
  {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      console.log("onload");
      onSignInSubmit();
    },
    defaultCountry: "NG",
  }
);

// DISPLAYING THE RECAPTURE WIDGET
recaptchaVerifier.render().then((widgetId) => {
  window.recaptchaWidgetId = widgetId;
});

function isvalid() {
  const isValid = Validity.includes(phoneNum.value);
  console.log(isValid);
  return;
}

//functionn to verify if num exists
function verifynum() {
  // init fb
  // get the doc - users
  // find the object with phoneNum
  const valid = data.includes(phoneNum.value);
  console.log(valid);
  return valid;
}

function onSignInSubmit(event) {
  event.preventDefault();
  //verify phone number by calling api

  //if num is verified proceed and get
  if (verifynum() == true) {
    const phoneNumber = "+234" + phoneNum.value;
    const appVerifier = window.recaptchaVerifier;
    console.log(phoneNumber);

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // ...
        console.log("otp sent");
        Output("[" + new Date().toLocaleTimeString() + "]: " + "OTP SENT");
        document.querySelector(".icon").classList.remove("hidden");

        return confirmationResult;
      })
      .catch((error) => {
        const message = error.message;
        Output(`${message}`);
        document.querySelector(".icon").classList.remove("hidden");
      });
  } else {
    //invalid form filled
    Output(`NOT IN DATABASE`);
    document.querySelector(".icon").classList.remove("hidden");
  }
}

function onverifySubmit() {
  const code = otpverify.value;
  confirmationResult
    .confirm(code)
    .then((result) => {
      const user = result.user;
      // ...
      console.log("successful");
      console.log(user);
      document.querySelector("#modalauth").classList.remove("hidden");
    })
    .catch((error) => {
      const message = error.message;

      Output(`${message}`);

      console.log(message);
    });
}

// signout
function signoutbtn() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("/");
    })
    .catch((error) => {
      // An error happened.
    });
}

const status = document.getElementById("status");
function Status(text) {
  const currentText = status.innerHTML;
  var newLine = "[" + new Date().toLocaleTimeString() + "]: " + text + "\n";
  status.innerHTML = newLine;
}
Status("Enter matricNo");

document
  .getElementById("passwordless-register")
  .addEventListener("click", RegisterPasswordless);

function verifymat() {
  const alias = document.getElementById("alias").value;
  const validmat = matric.includes(alias);
  console.log(validmat);
  return validmat;
}

async function handleSignInSubmit() {
  const alias = document.getElementById("alias").value;

  if (verifymat() === true) {
    Status("Please Wait...");
    var challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    var userID = "Kosv6fPtkDoh2Oz7Yq/pVgWHS8HhdlCto3cR0aBoVMw=";
    var id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));

    var publicKey = {
      challenge: challenge,

      rp: {
        name: "YCT Security System",
      },

      user: {
        id: id,
        name: alias,
        displayName: alias,
      },

      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
    };

    navigator.credentials
      .create({ publicKey: publicKey })
      .then((newCredentialInfo) => {
        alert("SUCCESS", newCredentialInfo);
        document.querySelector("#modalauth").classList.remove("hidden");
      })
      .catch((error) => {
        alert("FAILED", error);
      });
  } else {
    Status("not in database");
  }
}
document
  .getElementById("passwordless-signin")
  .addEventListener("click", handleSignInSubmit);

//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
