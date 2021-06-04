import React from "react";
import firebase from "firebase";

export default function Nav() {
  return (
    <div>
      <button id="signOutBtn" onClick={() => firebase.auth().signOut()}>
        Sign-out
      </button>
    </div>
  );
}
