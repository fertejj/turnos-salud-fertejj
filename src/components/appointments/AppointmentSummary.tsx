import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type Props = {
  date: Date;
  time: string;
};

export default function AppointmentSummary({ date, time }: Props) {
  const formatted = format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <div className="bg-amber-50 border border-amber-200 rounded p-4 mt-6 text-center">
      <p className="text-gray-700 mb-1">Turno seleccionado:</p>
      <p className="text-xl font-semibold text-green-600">
        {formatted.charAt(0).toUpperCase() + formatted.slice(1)} a las {time} hs
      </p>
    </div>
  );
}
