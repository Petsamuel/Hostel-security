const registerform = document.getElementById("register");
const loginform = document.getElementById("login");
const loginbtn = document.getElementById("loginbtn");
const otpverify = document.getElementById("verifyOtp");
const phoneNum = document.getElementById("phoneNumber");
const Submitbtn = document.getElementById("sign-in-button");
const comfirmOtp = document.getElementById("loginsubmmit");
const innerInfo = document.getElementById("container")
const svg1 = document.getElementById("svg");
const navlogin = document.getElementById("mlogin");
const form = document.getElementById("formID");
const status = document.getElementById("status");
// document
//     .getElementById("passwordless-signin")
//     .addEventListener("click", handleSignInSubmit);
// document
//     .getElementById("passwordless-register")
//     .addEventListener("click", RegisterPasswordless);

navlogin.addEventListener('click', () => {
    svg1.classList.add('hidden');
    form.classList.remove('hidden');
});
const registerbtn1 = document.getElementById("registerbtn ");
registerbtn1.addEventListener("click", () => {
    console.log('clicked');
    registerform.classList.remove("hidden");
    loginform.classList.add("hidden");

});

// loginbtn.addEventListener("click", () => {
//     registerform.classList.add("hidden");
//     loginform.classList.remove("hidden");

// });


//EVERYTHING firebase Api
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
    },
    defaultCountry: "NG"
});
recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
});

onSignInSubmit = (e) => {

    const phoneNumber = "+234" + phoneNum.value;
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log(phoneNumber);
            console.log(`AN OTP SENT TO ${phoneNumber}`);
            phoneNum.value = '';
        }).catch((error) => {
            phoneNum.value = '';
        });
}


function onverifySubmit(event) {
    event.preventDefault();

    const code = otpverify.value;
    confirmationResult.confirm(code).then((result) => {

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        const user = result.user;
        otpverify.value = '';
        window.location.assign('profile');
        var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
        console.log(credential);
    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        otpverify.value = ''
    });


}






// singout firebase
signout = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.assign('index')
        }).catch((error) => {
            console.log(`an error occured`, error)

        });
    }
    //finger print js api liberd key
const API_KEY = "Bieefilled:public:ddb7c9f8960d46fd84805e42d5cb6717"; // Replace this value with your API Key
const BACKEND_URL = ""; // will use node/app.js as default, but if you can't run node, use the hosted demo: https://demo-backend.passwordless.dev

// Print Status messages to UI.


function Status(text) {
    const currentText = status.innerHTML;
    var newLine =
        // "[" + new Date().toLocaleTimeString() + "]:\n " + 
        text + "\n";
    status.innerHTML = newLine + currentText;
}
Status("Welcome! Please register or sign in");

if (API_KEY[0] === "<") {
    console.log("WARNING: Please change the API_KEY in index.html and API_KEY_SECRET in app.js before running the example.")
}

async function RegisterPasswordless(event) {
    event.preventDefault();
    const alias = document.getElementById("alias").value;

    Status("Starting registering...");
    /**
     * Initiate the Passwordless client with your public api key
     */
    const p = new Passwordless.Client({
        apiKey: API_KEY
    });
    /**
     * Create token - Call your node backend to retrieve a token that we can use client-side to register a key to a alias
     */
    const backendRequest = await fetch(
        BACKEND_URL + "/create-token?alias=" + alias
    );
    const backendResponse = await backendRequest.text();
    if (!backendRequest.ok) {
        // If our demo backend did not respond with success, show error in UI
        Status(backendResponse);
        return;
    }
    /**
     *  Register a key - The Passwordless API and browser creates and stores a key, based on the token.
     */
    try {
        await p.register(backendResponse);

        Status("Successfully registered WebAuthn. You can now sign in!");

        /**
         * Done - the user can now sign in using the key
         */
    } catch (e) {
        console.error("Things went bad", e);
        Status("Things went bad, check console");
    }
}
//functions for passwordless auth.
async function handleSignInSubmit(e) {
    e.preventDefault();
    const alias = document.getElementById("alias").value;

    Status("Starting sign in...");

    /**
     * Initiate the Passwordless client with your public api key
     */
    const p = new Passwordless.Client({
        apiKey: API_KEY,
    });

    try {
        /**
         * Sign in - The Passwordless API and the browser initiates a sign in based on the alias
         */

        //var userId = await fetch("user/passwordless-id").then(r => r.text()); // get user id from database

        const token = await p.signinWithAlias(alias);
        //const token = await p.signinWithId(486761564);

        console.log("Received token", token);
        /**
         * Verify the sign in - Call your node backend to verify the token created from the sign in
         */
        const user = await fetch(BACKEND_URL + "/verify-signin?token=" + token).then((r) =>
            r.json()
        );

        /**
         * Done - you can now check the user result for status, userid etc
         */
        Status("User details: " + JSON.stringify(user, null, 2));
        Status("Yey! Succesfully signed in without a password!");

        console.log("User", user);
    } catch (e) {
        console.error("Things went really bad: ", e);
        Status("Things went bad, check console");
    }
}

// (function() {
//     const uid = null;
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             // User is signed in.
//             uid = user.uid
//         } else {
//             uid = null
//             window.location.assign('index')
//         }
//     });


// })();