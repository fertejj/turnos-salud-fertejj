export type MedicalHistoryEntry = {
    id?: string
    date: string // fecha de consulta (YYYY-MM-DD)
    reason: string
    symptoms: string
    description: string
    note?: string
    signs?: string
    diagnosis?: string
    treatment?: string
    createdAt: string
    createdBy: string
  }
  

