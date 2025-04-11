import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore"
import { getFirestoreInstance } from "../../../services/firebase/firestore"
import { useAuth } from "../../auth/context/AuthContext"

export type Appointment = {
  id: string
  patientId: string
  date: Date
  note?: string
  patient?: {
    name: string
    dni?: string
    email: string
  }
}

export function useAppointments() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filterDate, setFilterDate] = useState("")
  const [patientQuery, setPatientQuery] = useState("")
  const [dniQuery, setDniQuery] = useState("")

  useEffect(() => {
    if (!user) return

    const fetchAppointments = async () => {
      setLoading(true)
      try {
        const db = await getFirestoreInstance()

        const patientsSnap = await getDocs(
          query(
            collection(db, "patients"),
            where("professionalId", "==", user.uid)
          )
        )

        const patients = patientsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any[]

        const patientIds = patients.map((p) => p.id)
        const patientMap = Object.fromEntries(patients.map((p) => [p.id, p]))

        if (patientIds.length === 0) {
          setAppointments([])
          setLoading(false)
          return
        }

        const appointmentsSnap = await getDocs(collection(db, "appointments"))
        const allAppointments: Appointment[] = appointmentsSnap.docs
          .map((doc) => {
            const data = doc.data()
            return {
              id: doc.id,
              patientId: data.patientId,
              date: (data.date as Timestamp).toDate(),
              note: data.note,
              patient: patientMap[data.patientId],
            }
          })
          .filter((appt) => patientIds.includes(appt.patientId))

        setAppointments(allAppointments)
      } catch (err) {
        console.error("Error cargando turnos:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [user])

  const filteredAppointments = appointments.filter((appt) => {
    const matchesDate = filterDate
      ? appt.date.toISOString().slice(0, 10) === filterDate
      : true

    const matchesPatient = patientQuery
      ? appt.patient?.name.toLowerCase().includes(patientQuery.toLowerCase())
      : true

    const matchesDni = dniQuery
      ? appt.patient?.dni?.includes(dniQuery)
      : true

    return matchesDate && matchesPatient && matchesDni
  })

  const clearFilters = () => {
    setFilterDate("")
    setPatientQuery("")
    setDniQuery("")
  }

  return {
    loading,
    filteredAppointments,
    filterDate,
    setFilterDate,
    appointments,
    patientQuery,
    setPatientQuery,
    dniQuery,
    setDniQuery,
    clearFilters,
  }
}
