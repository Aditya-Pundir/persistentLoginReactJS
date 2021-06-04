// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import "./signInStyle.css";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyA_ZpbuHOwGJHTOgQqN8PQOp4KkBhBqO38",
  authDomain: "user-web-authentication-2007.firebaseapp.com",
  projectId: "user-web-authentication-2007",
  storageBucket: "user-web-authentication-2007.appspot.com",
  messagingSenderId: "1043223580513",
  appId: "1:1043223580513:web:52c0f8f824ef8636bebf20",
  measurementId: "G-FZPSNK60R5",
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
  tosUrl: "https://www.amazon.in",
  privacyPolicyUrl: "https://www.youtube.in",
};

const SignInScreen = () => {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return !isSignedIn ? (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  ) : (
    <>
      <Nav />
      {firebase.auth().currentUser.displayName}
    </>
  );
};
export default SignInScreen;
