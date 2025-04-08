import { getDoc, doc } from "firebase/firestore";
import { getFirestoreInstance } from "../../../services/firebase/firestore";
import { ProfessionalUser } from "../types/user";

export const getUserByUID = async (uid: string): Promise<ProfessionalUser> => {
    const db = await getFirestoreInstance();
    const docRef =  doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      throw new Error("Usuario no encontrado en Firestore");
    }
  
    return { id: docSnap.id, ...docSnap.data() } as ProfessionalUser;
  };
  