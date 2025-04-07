import AuthLayout from "../../../shared/layout/AuthLayout";
import RegisterStepper from "../register/RegisterStepper";

export default function Register() {
  return (
    <AuthLayout>
      <div className="max-w-xl w-full p-6 bg-surface text-text-main shadow-md rounded border border-border-base">
        <RegisterStepper />
      </div>
    </AuthLayout>
  );
}
