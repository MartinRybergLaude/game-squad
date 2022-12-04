import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA9Te6438WmLwLTpe_y_Bm73YcHEnQFbNI",
  authDomain: "gamesquad-192bc.firebaseapp.com",
  projectId: "gamesquad-192bc",
  storageBucket: "gamesquad-192bc.appspot.com",
  messagingSenderId: "384146702468",
  appId: "1:384146702468:web:c0fd00482f9d5efa7602d1",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
