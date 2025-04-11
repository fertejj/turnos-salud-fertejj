// src/shared/utils/safeToDate.ts
import { Timestamp } from "firebase/firestore"

export function safeToDate(value: any): Date {
  if (!value) return new Date()

  if (value instanceof Timestamp) {
    return value.toDate()
  }

  if (value instanceof Date) {
    return value
  }

  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value)
    if (!isNaN(date.getTime())) return date
  }

  // fallback: ahora
  return new Date()
}
