import { useState, useEffect } from 'react'
import { updateProfessionalData, uploadProfilePhoto } from '../services/settingsService'
import { ProfessionalUser } from '../../dashboard/types/user'

export const useSettingsForm = (initialData: ProfessionalUser | null) => {
  const [formValues, setFormValues] = useState<ProfessionalUser | null>(null)
  const [originalValues, setOriginalValues] = useState<ProfessionalUser | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormValues(initialData)
      setOriginalValues(initialData)
    }
  }, [initialData])

  const handleChange = (field: keyof ProfessionalUser, value: string) => {
    if (!formValues) return
    setFormValues({ ...formValues, [field]: value })
  }

  const handleImageChange = (urlOrFile: string | File) => {
    if (!formValues) return

    if (typeof urlOrFile === 'string') {
      setFormValues({ ...formValues, photoURL: urlOrFile })
    } else {
      setNewImageFile(urlOrFile)

      const tempUrl = URL.createObjectURL(urlOrFile)
      setFormValues({ ...formValues, photoURL: tempUrl })
    }
  }

  const hasChanges =
    JSON.stringify({ ...formValues, photoURL: '' }) !==
    JSON.stringify({ ...originalValues, photoURL: '' }) || newImageFile !== null

  const handleSubmit = async () => {
    if (!formValues || !originalValues || !hasChanges) return
    setIsSubmitting(true)

    try {
      let photoURL = formValues.photoURL

      // Subir imagen si hay nueva
      if (newImageFile) {
        photoURL = await uploadProfilePhoto(formValues.id, newImageFile)
      }
      console.log("Datos a guardar en Firestore:", {
        ...formValues,
        photoURL: newImageFile ? '[nueva imagen]' : formValues.photoURL,
      })
      
      await updateProfessionalData({
        ...formValues,
        photoURL,
      })

      setOriginalValues({ ...formValues, photoURL })
      setNewImageFile(null)
    } catch (error) {
      console.error('Error al guardar configuración:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formValues,
    handleChange,
    handleImageChange,
    handleSubmit,
    isSubmitting,
    hasChanges,
  }
}
