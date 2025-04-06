export interface Patient {
    id?: string; // solo cuando lo traemos desde Firestore
    fullName: string;
    dni: string;
    email?: string;
    phone?: string;
    notes?: string;
    createdAt: string;
    professionalId: string;
  }
  