export interface MedicalHistoryEntry {
  id: string
  createdAt: Date
  createdBy: string
  date: Date
  reason: string
  symptoms: string
  description?: string
  note?: string
  signs?: string
  diagnosis?: string
  treatment?: string
}
