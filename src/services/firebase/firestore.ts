// src/services/firebase/firestore.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";

let firestoreInstance: ReturnType<typeof getFirestore> | null = null;

export const getFirestoreInstance = (): ReturnType<typeof getFirestore> => {
  if (!firestoreInstance) {
    const app = initializeApp(firebaseConfig);
    firestoreInstance = getFirestore(app);
  }
  return firestoreInstance;
};
