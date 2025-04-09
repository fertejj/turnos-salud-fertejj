import { ProfilePhotoUploader } from "../components/ProfilePhotoUploader";
import { PersonalInfoForm } from "../components/PersonalInfoForm";
import { ContactInfoForm } from "../components/ContactInfoForm";
import { useSettingsForm } from "../hooks/useSettingsForm";
import useProfessional from "../../dashboard/hooks/useProfessional";
import Spinner from "../../../shared/components/ui/Spinner";
import Card from "../../../shared/ui/card/Card";
import CardContent from "../../../shared/ui/card/CardContent";
import PrimaryButton from "../../../shared/components/ui/PrimaryButton";

const SettingsPage = () => {
  const { professional, loading } = useProfessional();
  const {
    formValues,
    handleChange,
    handleImageChange,
    handleSubmit,
    isSubmitting,
    hasChanges,
  } = useSettingsForm(professional);

  if (loading || !formValues) return <Spinner />;

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Configuración de perfil
      </h2>

      <Card>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <ProfilePhotoUploader
            imageUrl={formValues.photoURL}
            onImageChange={handleImageChange}
          />

          <PersonalInfoForm
            values={{
              fullName: formValues.fullName,
              dni: formValues.dni,
              birthdate: formValues.birthdate,
            }}
            onChange={(field, value) =>
              handleChange(field as "fullName" | "dni" | "birthdate", value)
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <ContactInfoForm
            values={{
              phone: formValues.phone,
              address: formValues.address,
              specialty: formValues.specialty,
            }}
            email={professional?.email ?? ""}
            onChange={handleChange}
          />
        </CardContent>
      </Card>

      <div className="text-right">
        <PrimaryButton
          onClick={handleSubmit}
          disabled={!hasChanges || isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </PrimaryButton>
      </div>
    </section>
  );
};

export default SettingsPage;
