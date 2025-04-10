import { useState } from "react";

export function useNewPatientForm(initialDni: string) {
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const resetNewPatient = () => {
    setNewPatient({ name: "", email: "", phone: "" });
  };

  return {
    newPatient,
    setNewPatient,
    handleChange,
    resetNewPatient,
    dni: initialDni.trim(),
  };
}
