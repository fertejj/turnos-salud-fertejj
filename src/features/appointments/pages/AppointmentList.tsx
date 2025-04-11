import Spinner from "../../../shared/components/ui/Spinner";
import { useAppointments } from "../hooks/useAppointments";
import AppointmentListHeader from "../components/AppointmentListHeader";
import AppointmentCard from "../components/AppointmentCard";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import AppointmentsFilterPanel from "../components/AppointmentFilterPanel";

export default function AppointmentsList() {
  const {
    loading,
    filteredAppointments,
    filterDate,
    patientQuery,
    dniQuery,
    setFilterDate,
    setPatientQuery,
    setDniQuery,
    clearFilters,
  } = useAppointments();

  // Agrupar turnos por fecha
  const groupedByDate = filteredAppointments.reduce<
  Record<string, typeof filteredAppointments>
  >((acc, appt) => {
    const dateKey = appt.date.toISOString().slice(0, 10);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(appt);
    return acc;
  }, {});
  

  // Ordenar las fechas
  const sortedDates = Object.keys(groupedByDate).sort();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <AppointmentListHeader />

      <AppointmentsFilterPanel
        filterDate={filterDate}
        onDateChange={(e) => setFilterDate(e.target.value)}
        patientQuery={patientQuery}
        onPatientQueryChange={(e) => setPatientQuery(e.target.value)}
        dniQuery={dniQuery}
        onDniQueryChange={(e) => setDniQuery(e.target.value)}
        onClearFilters={clearFilters}
      />

      {loading ? (
        <div className="min-h-[30vh] flex justify-center items-center">
          <Spinner />
        </div>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-[var(--color-text-soft)]">
          No se encontraron turnos con los filtros aplicados.
        </p>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((dateKey) => {
            const date = format(new Date(dateKey), "EEEE dd 'de' MMMM", {
              locale: es,
            });
            const appointments = groupedByDate[dateKey].sort(
              (a, b) => a.date.getTime() - b.date.getTime()
            );
            

            return (
              <div key={dateKey} className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-dark border-b border-border-base pb-1">
                  {date.charAt(0).toUpperCase() + date.slice(1)}
                </h3>
                <ul className="space-y-3">
                  {appointments.map((appt) => (
                    
                    <AppointmentCard
                      key={appt.id}
                      id={appt.id}
                      date={appt.date}
                      note={appt.note}
                      patient={appt.patient}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
