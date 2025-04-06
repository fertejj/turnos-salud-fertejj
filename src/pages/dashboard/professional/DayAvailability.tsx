import TimeSlotItem from "./TimeSlotItem";
import AddTimeSlot from "./AddTimeSlot";
import type { Day, TimeSlot } from "./types";

type Props = {
  day: Day;
  label: string;
  slots: TimeSlot[];
  onUpdateSlot: (index: number, field: "from" | "to", val: string) => void;
  onRemoveSlot: (index: number) => void;
  onConfirmAdd: () => void;
  isAdding: boolean;
  from: string;
  to: string;
  onChangeFrom: (val: string) => void;
  onChangeTo: (val: string) => void;
};

export default function DayAvailability({

  label,
  slots,
  onUpdateSlot,
  onRemoveSlot,
  onConfirmAdd,
  isAdding,
  from,
  to,
  onChangeFrom,
  onChangeTo,
}: Props) {
  const isValid = Boolean(from && to && from < to);

  return (
    <div className="bg-surface border border-border-base rounded p-4">
      <h3 className="font-semibold text-text mb-3">{label}</h3>

      {slots.map((slot, i) => (
        <TimeSlotItem
          key={i}
          index={i}
          allSlots={slots}
          from={slot.from}
          to={slot.to}
          onChangeFrom={(val) => onUpdateSlot(i, "from", val)}
          onChangeTo={(val) => onUpdateSlot(i, "to", val)}
          onRemove={() => onRemoveSlot(i)}
        />
      ))}

      <AddTimeSlot

        from={isAdding ? from : ""}
        to={isAdding ? to : ""}
        onChangeFrom={onChangeFrom}
        onChangeTo={onChangeTo}
        onConfirm={onConfirmAdd}
        isValid={isValid}
      />
    </div>
  );
}
