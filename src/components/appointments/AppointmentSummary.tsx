import { format } from 'date-fns';

type Props = {
  date: Date;
  time: string;
};

export default function AppointmentSummary({ date, time }: Props) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded p-4 mt-6 text-center">
      <p className="text-gray-700 mb-1">Turno seleccionado:</p>
      <p className="text-xl font-semibold text-amber-700">
        {format(date, 'dd/MM/yyyy')} a las {time} hs
      </p>
    </div>
  );
}
