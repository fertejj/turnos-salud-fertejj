type Props = {
    patientName: string;
    time: string;
    notes?: string;
  };
  
  export default function AppointmentCard({ patientName, time, notes }: Props) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-800">{time} hs - {patientName}</p>
        {notes && <p className="text-sm text-gray-600 mt-1">{notes}</p>}
      </div>
    );
  }
  