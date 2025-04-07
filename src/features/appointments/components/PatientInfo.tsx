type Props = {
    patient: {
      name: string;
      email: string;
      phone: string;
      dni: string;
    };
  };
  
  export default function PatientInfo({ patient }: Props) {
    return (
      <div className="bg-surface border border-border rounded p-4 mb-4 text-sm text-text space-y-1">
        <p><strong>Nombre:</strong> {patient.name}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Teléfono:</strong> {patient.phone}</p>
        <p><strong>DNI:</strong> {patient.dni}</p>
      </div>
    );
  }
  