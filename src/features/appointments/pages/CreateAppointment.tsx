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
    date: "",
    time: "",
    note: "",
  });

  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // 👉 NUEVO estado para mostrar el formulario con delay
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);

  // 🎯 Delay de 1s para mostrar NewPatientForm cuando se cumplan condiciones
  useEffect(() => {
    if (!loading && patients.length === 0 && currentName && !selectedPatient) {
      const timeout = setTimeout(() => {
        setShowNewPatientForm(true);
      }, 1000);

      return () => clearTimeout(timeout); // limpiamos el timeout si cambia algo
    } else {
      setShowNewPatientForm(false); // ocultamos si cambia la condición
    }
  }, [loading, patients.length, currentName, selectedPatient]);

  // 🔄 Búsqueda automática con debounce
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

  // 👤 Registrar nuevo paciente
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

  // 📅 Crear turno
  const handleCreateAppointment = async () => {
    if (!form.date || !form.time || !selectedPatient) {
      alert("Completá todos los campos");
      return;
    }

    const [year, month, day] = form.date.split("-");
    const [hour, minute] = form.time.split(":");
    const date = new Date(+year, +month - 1, +day, +hour, +minute);

    setSubmitting(true);

    try {
      const db = await getFirestoreInstance();
      await addDoc(collection(db, "appointments"), {
        patientId: selectedPatient.id,
        date: Timestamp.fromDate(date),
        note: form.note,
        createdAt: Timestamp.now(),
      });

      alert("Turno creado correctamente");
      setSelectedPatient(null);
      setCurrentName("");
      setForm({ date: "", time: "", note: "" });
      setPatients([]);
    } catch (err) {
      console.error("Error al crear turno:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // 🔄 Cambios en formularios
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleNewPatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-text mb-4">Nuevo turno</h1>

      {/* 🔍 Búsqueda de paciente */}
      <PatientSearch
        name={currentName}
        onChange={(e) => {
          setCurrentName(e.target.value);
          setSelectedPatient(null);
        }}
      />

      {loading && <p>Buscando paciente...</p>}

      {/* 📋 Lista de pacientes encontrados */}
      {patients.length > 0 && !selectedPatient && (
        <div className="bg-surface rounded-lg p-2 shadow-md mt-2">
          <p className="text-sm mb-2 text-gray-600">Pacientes encontrados:</p>
          <ul>
            {patients.map((p) => (
              <li
                key={p.id}
                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                onClick={() => setSelectedPatient(p)}
              >
                {p.name} ({p.dni})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 👤 Info paciente seleccionado */}
      {selectedPatient && <PatientInfo patient={selectedPatient} />}

      {/* ➕ Registrar nuevo paciente con delay */}
      {showNewPatientForm && (
        <NewPatientForm
          newPatient={newPatient}
          onChange={handleNewPatientChange}
          onSubmit={handleRegisterPatient}
        />
      )}

      {/* 📅 Crear turno */}
      {selectedPatient && (
        <AppointmentForm
          form={form}
          onChange={handleFormChange}
          onSubmit={handleCreateAppointment}
          submitting={submitting}
        />
      )}
    </div>
  );
}
