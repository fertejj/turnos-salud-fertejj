import { firebaseConfig } from "./config";

export const getFirestoreInstance = async () => {
  const { initializeApp, getApps } = await import("firebase/app");
  const { getFirestore } = await import("firebase/firestore"); // 👈 firestore completo
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return getFirestore(app);
};
