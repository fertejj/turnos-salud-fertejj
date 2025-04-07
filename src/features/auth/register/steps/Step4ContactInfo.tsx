import Input from "../../../../shared/components/Input";

type Props = {
  formData: {
    phone?: string;
    address?: string;
    city?: string;
  };
  setFormData: (data: any) => void;
};

export default function Step4ContactInfo({ formData, setFormData }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        type="tel"
        placeholder="Teléfono"
        value={formData.phone || ""}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        aria-label="Teléfono"
        hasError={!formData.phone}
      />
      <Input
        type="text"
        placeholder="Dirección del consultorio"
        value={formData.address || ""}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        aria-label="Dirección del consultorio"
        hasError={!formData.address}
      />
      <Input
        type="text"
        placeholder="Localidad"
        value={formData.city || ""}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        aria-label="Localidad"
        hasError={!formData.city}
      />
    </div>
  );
}
