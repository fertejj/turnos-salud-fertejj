import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default function PacienteDashboard() {
  const { user } = useAuth();
  const [proxTurno, setProxTurno] = useState<{ date: string; time: string } | null>(null);

  useEffect(() => {
    const fetchProximoTurno = async () => {
      if (!user) return;
      const q = query(
        collection(db, 'turnos'),
        where('userId', '==', user.uid),
        orderBy('date'),
        orderBy('time'),
        limit(1)
      );
      const snap = await getDocs(q);
      const data = snap.docs[0]?.data();
      if (data) setProxTurno(data as any);
    };

    fetchProximoTurno();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-amber-600 mb-4">
        Bienvenido{user?.displayName ? `, ${user.displayName}` : ''} 👋
      </h1>

      {proxTurno ? (
        <div className="bg-green-50 border border-green-200 p-4 rounded mb-6 text-center">
          <p className="text-gray-700">Tu próximo turno:</p>
          <p className="text-lg text-green-700 font-medium">
            {format(new Date(proxTurno.date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })} a las {proxTurno.time} hs
          </p>
        </div>
      ) : (
        <p className="text-gray-600 mb-6">No tenés turnos próximos agendados.</p>
      )}

      <div className="flex flex-col gap-3 max-w-sm">
        <Link
          to="/dashboard/paciente/turnos/nuevo"
          className="bg-amber-500 text-white px-4 py-2 rounded text-center font-medium hover:bg-amber-600 transition"
        >
          Agendar nuevo turno
        </Link>
        <Link
          to="/dashboard/paciente/mis-turnos"
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded text-center font-medium border hover:bg-gray-200 transition"
        >
          Ver mis turnos
        </Link>
      </div>
    </div>
  );
}
