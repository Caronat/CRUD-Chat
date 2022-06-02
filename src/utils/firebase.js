import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export const signupUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const updateUserDisplayName = (displayName) =>
  updateProfile(auth.currentUser, { displayName });

export const getPosts = () => {
  const postsRef = collection(db, "posts");
  return getDocs(postsRef);
};

export const addPost = (data) => {
  const postsRef = collection(db, "posts");
  return addDoc(postsRef, data);
};

export const deletePost = (postId) => {
  const postRef = doc(db, "posts", postId);
  return deleteDoc(postRef);
};

export const editPost = (postId, newMessage) => {
  const postRef = doc(db, "posts", postId);
  return updateDoc(postRef, { message: newMessage });
};

export const updateComment = (postId, newCommentsData) => {
  const postRef = doc(db, "posts", postId);
  return updateDoc(postRef, { comments: newCommentsData });
};
