import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import DayAvailability from "./DayAvailability";
import DurationSelector from "./DurationSelector";

export const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const dayLabels: Record<Day, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

export type Day = (typeof daysOfWeek)[number];

export type TimeSlot = {
  from: string;
  to: string;
};

export type AvailabilityData = {
  [key in Day]: TimeSlot[];
} & {
  appointmentDuration: number;
};

export default function Disponibility() {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<AvailabilityData>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
    appointmentDuration: 30,
  });

  const [loading, setLoading] = useState(false);
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [addingDay, setAddingDay] = useState<Day | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchAvailability = async () => {
      const ref = doc(db, "disponibilidad", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data() as AvailabilityData;
        setAvailability((prev) => ({ ...prev, ...data }));
      }
    };

    fetchAvailability();
  }, [user]);

  const updateSlot = (day: Day, index: number, field: "from" | "to", value: string) => {
    const updated = [...availability[day]];
    updated[index][field] = value;
    setAvailability({ ...availability, [day]: updated });
  };

  const removeSlot = (day: Day, index: number) => {
    const updated = availability[day].filter((_, i) => i !== index);
    setAvailability({ ...availability, [day]: updated });
  };

  const confirmAddSlot = async (day: Day) => {
    if (!newFrom || !newTo || newFrom >= newTo || !user) return;

    const updatedSlots = [...availability[day], { from: newFrom, to: newTo }];
    const updatedAvailability = { ...availability, [day]: updatedSlots };

    setAvailability(updatedAvailability);
    setNewFrom("");
    setNewTo("");
    setAddingDay(null);

    const ref = doc(db, "disponibilidad", user.uid);
    await setDoc(ref, { [day]: updatedSlots }, { merge: true });
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    await setDoc(doc(db, "disponibilidad", user.uid), availability);
    setLoading(false);
    alert("Disponibilidad guardada con éxito");
  };

  return (
    <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-primary-dark mb-6">
        Mi disponibilidad
      </h1>

      <DurationSelector
        value={availability.appointmentDuration}
        onChange={(val) => setAvailability({ ...availability, appointmentDuration: val })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {daysOfWeek.map((day) => (
          <DayAvailability
            key={day}
            day={day}
            label={dayLabels[day]}
            slots={availability[day] ?? []}
            onUpdateSlot={(index, field, value) => updateSlot(day, index, field, value)}
            onRemoveSlot={(index) => removeSlot(day, index)}
            from={addingDay === day ? newFrom : ""}
            to={addingDay === day ? newTo : ""}
            onChangeFrom={(val) => {
              setAddingDay(day);
              setNewFrom(val);
            }}
            onChangeTo={(val) => {
              setAddingDay(day);
              setNewTo(val);
            }}
            onConfirmAdd={() => confirmAddSlot(day)}
            isAdding={addingDay === day}
          />
        ))}
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar disponibilidad"}
        </PrimaryButton>
      </div>
    </div>
  );
}
