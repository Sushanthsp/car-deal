import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCb_stY7SPNWmjywm3E1LxyUsV9-3xcZI0",
    authDomain: "car-deal-9915c.firebaseapp.com",
    projectId: "car-deal-9915c",
    storageBucket: "car-deal-9915c.appspot.com",
    messagingSenderId: "359818163607",
    appId: "1:359818163607:web:a18024c5395479b5a040d2",
    measurementId: "G-T54BWCDL21"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};