import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA1edVF43x9e2or6cajtJ78LEbOyD-Cz4k",
  authDomain: "auth-6a813.firebaseapp.com",
  projectId: "auth-6a813",
  storageBucket: "auth-6a813.appspot.com",
  messagingSenderId: "655319751519",
  appId: "1:655319751519:web:1daa807f10d6e83a9c74ea"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        console.log(error);
    }
};