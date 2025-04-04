import { addDays, format, isBefore, startOfToday } from 'date-fns';

type Props = {
  selectedDate: Date;
  selectedTime: string | null;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
  bookedTimes?: string[];
};

const availableHours = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
];

export default function DateTimeSelector({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  bookedTimes = [],
}: Props) {
  const upcomingDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  const today = startOfToday();

  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200 max-w-md mx-auto">
      <h2 className="text-lg font-bold text-amber-600 mb-4">Seleccioná una fecha</h2>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {upcomingDays.map((date) => {
          const formatted = format(date, 'yyyy-MM-dd');
          const label = format(date, 'EEE dd/MM');
          const isSelected = formatted === format(selectedDate, 'yyyy-MM-dd');
          const isPast = isBefore(date, today);

          return (
            <button
              key={formatted}
              onClick={() => !isPast && onDateChange(date)}
              className={`p-2 rounded border text-sm transition ${
                isPast
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isSelected
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
              disabled={isPast}
            >
              {label}
            </button>
          );
        })}
      </div>

      <h2 className="text-lg font-bold text-amber-600 mb-4">Seleccioná un horario</h2>
      <div className="grid grid-cols-3 gap-2">
        {availableHours.map((hour) => {
          const isBooked = bookedTimes.includes(hour);
          const isSelected = selectedTime === hour;

          return (
            <button
              key={hour}
              onClick={() => !isBooked && onTimeChange(hour)}
              className={`p-2 rounded border text-sm transition ${
                isBooked
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : isSelected
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
              disabled={isBooked}
            >
              {hour}
            </button>
          );
        })}
      </div>
    </div>
  );
}
