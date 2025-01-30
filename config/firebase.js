import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getDatabase,ref, set} from 'firebase/database';
import Constants from 'expo-constants';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBmq3whfIG9hf8lljOQYbOmTdORL2VeFIM",
  authDomain: "readers-relay.firebaseapp.com",
  databaseURL: "https://readers-relay-default-rtdb.asia-southeast1.firebasedatabase.app", 
  projectId: "readers-relay",
  storageBucket: "readers-relay.firebasestorage.app",
  messagingSenderId: "426266154977",
  appId: "1:426266154977:web:b68f58fcfe9b65b1c764a0",
  measurementId: "G-3N3YYM86Y6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
export const database = getFirestore();
