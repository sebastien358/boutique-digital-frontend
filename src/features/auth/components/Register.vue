<template>
  <div class="d-flex align-items-center justify-content-center register">
    <div class="form-container">
      <h2 class="mb-15 text-center">Inscription</h2>
      <form @submit="onSubmit">
        <div class="d-flex flex-column mb-20">
          <label>Nom</label>
          <input v-model="lastname" type="text" />
          <span v-if="errorLastname" class="error-fields">
            {{ errorLastname }}
          </span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label>Prénom</label>
          <input v-model="firstname" type="text" />
          <span v-if="errorFirstname" class="error-fields">
            {{ errorFirstname }}
          </span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label>Email</label>
          <input v-model="email" type="email" />
          <span v-if="errorEmail" class="error-fields">
            {{ errorEmail }}
          </span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label>Mot de passe</label>
          <input v-model="password" type="password" />
          <span v-if="errorPassword" class="error-fields">
            {{ errorPassword }}
          </span>
        </div>
        <div class="d-flex flex-column mb-10">
          <label>Confirmation de mot de passe</label>
          <input v-model="confirmPassword" type="password" />
          <span v-if="errorConfirmPassword" class="error-fields">
            {{ errorConfirmPassword }}
          </span>
        </div>
        <div class="text-center mb-10">
          <span v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </span>
          <span v-if="successMessage" class="success-message">
            {{ successMessage }}
          </span>
        </div>
        <button class="btn btn-primary" :disabled="isSubmitting">Soumettre</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/authStore'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import * as z from 'zod'
import { ref } from 'vue'

const schema = z.object({
  lastname: z
    .string({ message: 'Veuillez remplir votre nom' })
    .min(3, 'Le nom doit contenir au minimum 3 caractères'),
  firstname: z
    .string({ message: 'Veuillez remplir votre prénom' })
    .min(3, 'Le prénom doit contenir au minimum 3 caractères'),
  email: z
    .string({ message: 'Veuillez remplir votre adresse e-mail' })
    .email('Adresse e-mail invalide'),
  password: z
    .string({ message: 'Veuillez remplir votre mot de passe' })
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z
    .string({ message: 'Veuillez remplir votre confirmation de mot de passe' })
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .refine((val) => val === password.value, { message: 'Les mots de passe ne correspondent pas' }),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: lastname, errorMessage: errorLastname } = useField('lastname')
const { value: firstname, errorMessage: errorFirstname } = useField('firstname')
const { value: email, errorMessage: errorEmail } = useField('email')
const { value: password, errorMessage: errorPassword } = useField('password')
const { value: confirmPassword, errorMessage: errorConfirmPassword } = useField('confirmPassword')

const authStore = useAuthStore()

const onSubmit = handleSubmit(async (dataRegister, { resetForm }) => {
  try {
    const response = await authStore.emailExists(dataRegister)
    if (response.exists) {
      setErrorMessage('Un compte existe avec cette adresse e-mail')
    } else {
      await authStore.register(dataRegister)
      setSuccessMessage('Inscription réussie', resetForm)
    }
  } catch (e) {
    setErrorMessage('Erreur de la validation du formulaire')
    console.log('Erreur de la validation du formulaire', e)
  }
})

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const router = useRouter()

function setSuccessMessage(message, resetForm: () => void) {
  errorMessage.value = ''
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
    resetForm()
    router.push({ path: '/login' })
  }, 2000)
}

function setErrorMessage(message) {
  successMessage.value = ''
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = ''
  }, 4000)
}
</script>

<style scoped lang="scss">
.register {
  height: 100%;
}
</style>
@/stores/authStore
