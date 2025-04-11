import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import AppointmentsFilters from "./AppointmentFilters";
import { useIsDesktop } from "../hooks/useIsDesktop";

type Props = {
  filterDate: string;
  patientQuery: string;
  dniQuery: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPatientQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDniQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFilters: () => void;
};

export default function AppointmentsFilterPanel({
  filterDate,
  patientQuery,
  dniQuery,
  onDateChange,
  onPatientQueryChange,
  onDniQueryChange,
  onClearFilters,
}: Props) {
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState(isDesktop);

  // Abrir automáticamente en desktop
  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  return (
    <div className="border border-border-base rounded-xl">
      {!isDesktop && (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 w-full justify-between bg-muted/40 hover:bg-muted transition font-medium rounded-t-xl"
        >
          <span className="flex items-center gap-2">
            <Filter size={18} />
            Filtros
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="16" height="16" fill="currentColor">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </motion.span>
        </button>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-4 border-t border-border-base bg-background rounded-b-xl"
          >
            <AppointmentsFilters
              filterDate={filterDate}
              patientQuery={patientQuery}
              dniQuery={dniQuery}
              onDateChange={onDateChange}
              onPatientQueryChange={onPatientQueryChange}
              onDniQueryChange={onDniQueryChange}
              onClearFilters={onClearFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
