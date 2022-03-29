// onSignInSubmit = (e) => {

//     const phoneNumber = "+234" + phoneNum.value;
//     const appVerifier = window.recaptchaVerifier;
//     firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//             return confirmationResult.getidToken().then((idToken) => {
//                 return fetch('/sessionlogin', {
//                     method: 'POST',
//                     headers: {
//                         Accepts: 'Application/json',
//                         'Content-Type': "Application/json",
//                         "CSRF-Token": Cookies.get("XSRF-TOKEN"),
//                     },
//                     body: JSON.stringify({ idToken })
//                 })

//             })

//             .catch((error) => {
//                 phoneNum.value = '';
//                 console.log(error);
//             });
//         })

// }



function onverifySubmit(event) {
    event.preventDefault();
    const code = otpverify.value
    confirmationResult.confirm(code).then(({ user }) => {
        console.log(user);

        return user.getIdToken().then(idToken => {

            return fetch('/sessionlogin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': "application/json",
                    "CSRF-Token": Cookies.get('XSRF-TOKEN'),
                },
                body: JSON.stringify({ idToken })
            })
        })
    }).then(() => {
        return firebase.auth().signOut();
    }).then(() => {
        window.location.assign('profile')

    });

}