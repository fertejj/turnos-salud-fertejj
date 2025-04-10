export default function InfoItem({ label, value }: { label: string; value: string }) {
    return (
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-base font-medium text-gray-900">{value}</p>
      </div>
    )
  }