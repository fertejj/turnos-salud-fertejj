import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../../auth/context/AuthContext";

import PatientSearch from "../components/PatientSearch";
import PatientInfo from "../components/PatientInfo";
import NewPatientForm from "../components/NewPatientForm";
import AppointmentForm from "../components/AppointmentForm";
import { getFirestoreInstance } from "../../../services/firebase/firestore";

export default function CreateAppointment() {
  const { user } = useAuth();

  const [currentName, setCurrentName] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    date: new Date(),
    time: "",
    note: "",
  });

  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [showNewPatientForm, setShowNewPatientForm] = useState(false);

  useEffect(() => {
    if (!loading && patients.length === 0 && currentName && !selectedPatient) {
      const timeout = setTimeout(() => {
        setShowNewPatientForm(true);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowNewPatientForm(false);
    }
  }, [loading, patients.length, currentName, selectedPatient]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchPatients = async () => {
        if (!currentName.trim() || !user) {
          setPatients([]);
          return;
        }

        setLoading(true);
        try {
          const db = await getFirestoreInstance();
          const q = query(
            collection(db, "patients"),
            where("professionalId", "==", user.uid)
          );
          const snapshot = await getDocs(q);
          const filtered = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((p: any) =>
              p.name.toLowerCase().includes(currentName.toLowerCase().trim())
            );

          setPatients(filtered);
        } catch (err) {
          console.error("Error buscando pacientes:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchPatients();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [currentName, user]);

  const handleRegisterPatient = async () => {
    if (!newPatient.name || !newPatient.email || !newPatient.phone || !currentName || !user) {
      alert("Completá todos los datos del paciente.");
      return;
    }

    try {
      const db = await getFirestoreInstance();
      const docRef = await addDoc(collection(db, "patients"), {
        ...newPatient,
        dni: currentName.trim(),
        professionalId: user.uid,
        createdAt: Timestamp.now(),
      });

      setSelectedPatient({ id: docRef.id, ...newPatient, dni: currentName.trim() });
      setNewPatient({ name: "", email: "", phone: "" });
      setPatients([]);
    } catch (err) {
      console.error("Error registrando paciente:", err);
    }
  };

  const handleCreateAppointment = async () => {
    if (!form.date || !form.time || !selectedPatient) {
      alert("Completá todos los campos");
      return;
    }

    const [hour, minute] = form.time.split(":");
    const fullDate = new Date(form.date);
    fullDate.setHours(+hour, +minute);

    setSubmitting(true);

    try {
      const db = await getFirestoreInstance();
      await addDoc(collection(db, "appointments"), {
        patientId: selectedPatient.id,
        date: Timestamp.fromDate(fullDate),
        note: form.note,
        createdAt: Timestamp.now(),
      });

      alert("Turno creado correctamente");
      setSelectedPatient(null);
      setCurrentName("");
      setForm({ date: new Date(), time: "", note: "" });
      setPatients([]);
    } catch (err) {
      console.error("Error al crear turno:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "date") {
      setForm({ ...form, date: new Date(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleNewPatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Encabezado */}
      <div className="border-b border-[var(--color-border-base)] pb-4">
        <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight">
          Nuevo turno
        </h1>
        <p className="text-sm text-[var(--color-text-soft)] mt-1">
          Buscá al paciente y completá los datos para registrar un nuevo turno.
        </p>
      </div>

      {/* Buscador */}
      <PatientSearch
        name={currentName}
        onChange={(e) => {
          setCurrentName(e.target.value);
          setSelectedPatient(null);
        }}
      />

      {/* Estado de búsqueda */}
      {loading && (
        <p className="text-sm text-[var(--color-text-soft)]">
          Buscando paciente...
        </p>
      )}

      {/* Resultados */}
      {patients.length > 0 && !selectedPatient && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-2xl p-6 shadow-md space-y-2">
          <p className="text-sm font-medium text-[var(--color-text-soft)]">
            Pacientes encontrados:
          </p>
          <ul className="space-y-1">
            {patients.map((p) => (
              <li
                key={p.id}
                className="cursor-pointer hover:bg-[var(--color-border-base)] px-3 py-1 rounded transition"
                onClick={() => setSelectedPatient(p)}
              >
                <span className="text-[var(--color-text)]">{p.name}</span>{" "}
                <span className="text-sm text-[var(--color-text-soft)]">
                  ({p.dni})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Info de paciente seleccionado */}
      {selectedPatient && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-2xl p-6 shadow-md">
          <PatientInfo patient={selectedPatient} />
        </div>
      )}

      {/* Formulario nuevo paciente */}
      {showNewPatientForm && (
        <NewPatientForm
          newPatient={newPatient}
          onChange={handleNewPatientChange}
          onSubmit={handleRegisterPatient}
        />
      )}

      {/* Formulario de turno */}
      {selectedPatient && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-base)] rounded-2xl p-6 shadow-md">
          <AppointmentForm
            form={form}
            onChange={handleFormChange}
            onSubmit={handleCreateAppointment}
            submitting={submitting}
          />
        </div>
      )}
    </div>
  );
}
