import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import DateTimeSelector from '../../../components/appointments/DateTimeSelector';
import AppointmentSummary from '../../../components/appointments/AppointmentSummary';
import PrimaryButton from '../../../components/ui/PrimaryButton';

export default function NewTurn() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const formattedDate = format(date, 'yyyy-MM-dd');

  const fetchBookedTimes = async () => {
    const q = query(
      collection(db, 'turnos'),
      where('date', '==', formattedDate)
    );
    const snap = await getDocs(q);
    const taken = snap.docs.map((doc) => doc.data().time);
    setBookedTimes(taken);
  };

  useEffect(() => {
    fetchBookedTimes();
  }, [formattedDate]);

  const handleSubmit = async () => {
    if (!user || !time) return;

    setLoading(true);

    const appointmentId = `${formattedDate}_${time}`;
    const appointmentRef = doc(db, 'turnos', appointmentId);

    const snap = await getDoc(appointmentRef);
    if (snap.exists()) {
      alert('Este horario ya está reservado. Por favor, elegí otro.');
      setLoading(false);
      return;
    }

    await setDoc(appointmentRef, {
      userId: user.uid,
      date: formattedDate,
      time,
      createdAt: new Date(),
    });

    alert('Turno reservado con éxito');
    setTime(null); // Limpia la selección
    await fetchBookedTimes(); // 🔄 Actualiza los horarios bloqueados
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-amber-600 mb-6">Nuevo turno</h1>

      <DateTimeSelector
        selectedDate={date}
        selectedTime={time}
        onDateChange={setDate}
        onTimeChange={setTime}
        bookedTimes={bookedTimes}
      />

      {time && (
        <div className="max-w-md mx-auto">
          <AppointmentSummary date={date} time={time} />
          <div className="mt-4">
            <PrimaryButton onClick={handleSubmit} disabled={loading}>
              {loading ? 'Guardando...' : 'Confirmar turno'}
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
