import { useRef, useState } from 'react'
import Spinner from '../../../shared/components/ui/Spinner'
import PrimaryButton from '../../../shared/components/ui/PrimaryButton'


interface ProfilePhotoUploaderProps {
  imageUrl?: string
  onImageChange: (file: File) => void
}

export const ProfilePhotoUploader = ({ imageUrl, onImageChange }: ProfilePhotoUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl)
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo y tamaño
    const validTypes = ['image/jpeg', 'image/png']
    const maxSizeMB = 2
    if (!validTypes.includes(file.type)) {
      alert('Solo se permiten imágenes JPG o PNG')
      return
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert('La imagen no debe superar los 2MB')
      return
    }

    setLoading(true)
    try {
      const tempUrl = URL.createObjectURL(file)
      setPreviewUrl(tempUrl)
      onImageChange(file)
    } catch (err) {
      console.error('Error al cargar imagen', err)
    } finally {
      setLoading(false)
    }
  }

  const triggerFileInput = () => fileInputRef.current?.click()

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-32 h-32 rounded-full overflow-hidden border shadow">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <Spinner />
          </div>
        ) : (
          <img
            src={previewUrl || '/default-profile.png'}
            alt="Foto de perfil"
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <PrimaryButton onClick={triggerFileInput}>
        Cambiar foto
      </PrimaryButton>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
