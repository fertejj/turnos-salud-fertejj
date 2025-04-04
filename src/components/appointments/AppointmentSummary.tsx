import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type Props = {
  date: Date;
  time: string;
};

export default function AppointmentSummary({ date, time }: Props) {
  const formatted = format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <div className="bg-primary-light border border-primary rounded p-4 mt-6 text-center">
      <p className="text-text mb-1">Turno seleccionado:</p>
      <p className="text-xl font-semibold text-success">
        {formatted.charAt(0).toUpperCase() + formatted.slice(1)} a las {time} hs
      </p>
    </div>
  );
}
