<template>
  <div class="d-flex align-items-center justify-content-center login">
    <div class="form-container">
      <h2 class="mb-15 text-center">Connexion</h2>
      <form @submit="onSubmit">
        <div class="d-flex flex-column mb-20">
          <label>Email</label>
          <input v-model="email" type="email" />
          <span v-if="errorEmail" class="error-fields">
            {{ errorEmail }}
          </span>
        </div>
        <div class="d-flex flex-column mb-10">
          <label>Mot de passe</label>
          <input v-model="password" type="password" />
          <span v-if="errorPassword" class="error-fields">
            {{ errorPassword }}
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
  email: z
    .string({ message: 'Veuillez remplir votre adresse e-mail' })
    .email('Adresse e-mail invalide'),
  password: z
    .string({ message: 'Veuillez remplir votre mot de passe' })
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: email, errorMessage: errorEmail } = useField('email')
const { value: password, errorMessage: errorPassword } = useField('password')

const authStore = useAuthStore()

const onSubmit = handleSubmit(async (dataLogin, { resetForm }) => {
  try {
    const response = await authStore.emailExists(dataLogin)
    if (!response.exists) {
      setErrorMessage("Aucun compte n'est associé à cette adresse e-mail")
    } else {
      const response = await authStore.login(dataLogin)
      if (authStore.isLoggedIn) {
        setSuccessMessage('Connexion établie avec succès', resetForm)
      } else {
        setErrorMessage('Identifiants incorrects. Vérifiez votre email et votre mot de passe')
      }
    }
  } catch (e) {
    setErrorMessage('Erreur de la validation du formulaire')
    console.log('Erreur de la validation du formulaire', e)
  }
})

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const router = useRouter()

function setSuccessMessage(message: string, resetForm: () => void) {
  errorMessage.value = ''
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
    resetForm()
    router.push({ path: '/admin' })
  }, 2000)
}

function setErrorMessage(message: string) {
  successMessage.value = ''
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = ''
  }, 4000)
}
</script>

<style scoped lang="scss">
.login {
  height: 100%;
}
</style>
@/stores/authStore
