import { renderHook, act } from "@testing-library/react";
import { usePatientSearch } from "../usePatientSearch";
import { vi } from "vitest";

// Mock Firestore
vi.mock("../../../services/firebase/firestore", () => ({
  getFirestoreInstance: async () => ({}),
}));

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual<any>("firebase/firestore");

  return {
    ...actual,
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn(() => Promise.resolve({
      docs: [
        { id: "1", data: () => ({ name: "Juan Perez", dni: "12345678" }) },
        { id: "2", data: () => ({ name: "Ana Gómez", dni: "87654321" }) },
      ]
    })),
    addDoc: vi.fn(() => Promise.resolve({ id: "3" })),
    Timestamp: {
      now: () => "timestamp-mock",
    },
  };
});

describe("usePatientSearch", () => {
  it("debería buscar pacientes correctamente", async () => {
    const { result } = renderHook(() => usePatientSearch("mock-prof-id"));

    act(() => {
      result.current.setCurrentName("Juan");
    });

    // esperar 600ms (hook hace debounce a 500ms)
    await new Promise((res) => setTimeout(res, 600));

    expect(result.current.patients.length).toBeGreaterThan(0);
    expect(result.current.patients[0].name).toBe("Juan Perez");
  });

  it("debería registrar un nuevo paciente correctamente", async () => {
    const { result } = renderHook(() => usePatientSearch("mock-prof-id"));

    act(() => {
      result.current.setCurrentName("30303030");
      result.current.setNewPatient({
        name: "Nuevo Paciente",
        email: "nuevo@paciente.com",
        phone: "123456789",
      });
    });

    await act(async () => {
      await result.current.handleRegisterPatient();
    });

    expect(result.current.selectedPatient?.name).toBe("Nuevo Paciente");
  });
});
