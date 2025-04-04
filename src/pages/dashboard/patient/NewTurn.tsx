import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import DateTimeSelector from '../../../components/appointments/DateTimeSelector';
import AppointmentSummary from '../../../components/appointments/AppointmentSummary';
import PrimaryButton from '../../../components/ui/PrimaryButton';

export default function NewTurn() {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const [confirmedTime, setConfirmedTime] = useState<string | null>(null); // ✅ nuevo estado
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      toast.error('Este horario ya está reservado. Elegí otro.');
      setLoading(false);
      return;
    }

    await setDoc(appointmentRef, {
      userId: user.uid,
      date: formattedDate,
      time,
      createdAt: new Date(),
    });

    toast.success('Turno reservado con éxito');
    setConfirmedTime(time); // ✅ guardar hora confirmada
    setTime(null);          // limpiar selección
    await fetchBookedTimes();
    setLoading(false);
    setShowModal(true);     // ✅ mostrar modal
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

      {showModal && confirmedTime && (
        <ConfirmationModal
          date={date}
          time={confirmedTime}
          onClose={() => setShowModal(false)}
          onConfirm={() => navigate('/dashboard/paciente')}
        />
      )}
    </div>
  );
}
