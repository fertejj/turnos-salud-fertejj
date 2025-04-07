// src/lib/firebase/auth.ts
import { firebaseConfig } from "./config";

export const getAuthInstance = async () => {
  const { initializeApp } = await import("firebase/app");
  const { getAuth } = await import("firebase/auth");
  const app = initializeApp(firebaseConfig);
  return getAuth(app);
};
