<template>
  <div class="d-flex align-items-center justify-content-center m-20 order-form">
    <div class="form-container">
      <h2 class="text-center">Commande</h2>
      <form @submit="onSubmit">
        <div class="container-username">
          <div class="mb-20">
            <label><span>*</span>Prénom</label>
            <input v-model="firstname" type="text" autofocus />
            <span v-if="errorFirstname" class="error-fields">
              {{ errorFirstname }}
            </span>
          </div>
          <div class="mb-20">
            <label><span>*</span>Nom</label>
            <input v-model="lastname" type="text" />
            <span v-if="errorLastname" class="error-fields">
              {{ errorLastname }}
            </span>
          </div>
        </div>
        <div class="d-flex flex-column mb-20">
          <label><span>*</span>Adresse</label>
          <input v-model="address" type="text" />
          <span v-if="errorAddress" class="error-fields">
            {{ errorAddress }}
          </span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label><span>*</span>Code Postal</label>
          <input v-model="zipCode" type="text" />
          <span v-if="errorZipCode" class="error-fields">
            {{ errorZipCode }}
          </span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label><span>*</span>Ville</label>
          <input v-model="city" type="text" />
          <span v-if="errorCity" class="error-fields">
            {{ errorCity }}
          </span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label for="pays"><span>*</span>Pays</label>
          <select v-model="country" name="pays">
            <option value="">--Please choose an option--</option>
            <option value="France">France</option>
            <option value="Belgique">Belgique</option>
            <option value="Suisse">Suisse</option>
            </select>
          <span v-if="errorCountry" class="error-fields">
            {{ errorCountry }}
          </span>
        </div>
        <div class="d-flex flex-column mb-10">
          <label><span>*</span>Téléphone</label>
          <input v-model="phoneNumber" type="tel" />
          <span v-if="errorPhoneNumber" class="error-fields">
            {{ errorPhoneNumber }}
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
        <button class="btn btn-primary" :disabled="isSubmitting">
          Enregistrer
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const router = useRouter()

const schema = z.object({
  firstname: z
    .string({ message: 'Le prénom est requis' })
    .min(2, 'Le prénom doit comporter au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastname: z
    .string({ message: 'Le nom est requis' })
    .min(2, 'Le nom doit comporter au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  address: z
    .string({ message: 'L\'adresse est requise' })
    .min(5, 'L\'adresse doit comporter au moins 5 caractères')
    .max(100, 'L\'adresse ne peut pas dépasser 100 caractères'),
  zipCode: z
    .string({ message: 'Le code postal est requis' })
    .regex(/^\d{5}$/, 'Le code postal doit être composé de 5 chiffres'),
  city: z
    .string({ message: 'La ville est requise' })
    .min(2, 'La ville doit comporter au moins 2 caractères')
    .max(50, 'La ville ne peut pas dépasser 50 caractères'),
  country: z
    .string({ message: 'Le pays est requis' })
    .refine(value => ['France', 'Belgique', 'Suisse'].includes(value), {
      message: 'Pays invalid'
    }),
  phoneNumber: z
    .string({ message: 'Le numéro de téléphone est requis' })
    .regex(/^0\d{9}$/, 'Le numéro de téléphone doit commencer par 0 et être composé de 10 chiffres'),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema)
})

const { value: firstname, errorMessage: errorFirstname } = useField('firstname')
const { value: lastname, errorMessage: errorLastname } = useField('lastname')
const { value: address, errorMessage: errorAddress } = useField('address')
const { value: zipCode, errorMessage: errorZipCode } = useField('zipCode')
const { value: city, errorMessage: errorCity } = useField('city')
const { value: country, errorMessage: errorCountry } = useField('country')
const { value: phoneNumber, errorMessage: errorPhoneNumber } = useField('phoneNumber')

const onSubmit = handleSubmit(async (dataCommand) => {
  try {
    console.log(dataCommand)
    setSuccessMessage('La Commande a été validée')
  } catch(e) {
    setErrorMessage('La commande a échouée')
    console.error('Error : la commande a échouée', e)
  }
})

function setSuccessMessage(message: string) {
  successMessage.value = message
  setTimeout(() => {
    router.push({ path: '/payment' })
    successMessage.value = ''
  }, 2000)
}

function setErrorMessage(message: string) {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = ''
  }, 4000)
}
</script>

<style scoped lang="scss">
.order-form {
  height: 100%;
  .form-container {
    width: 100%;
    max-width: 550px;
  }
  .form-container > h2 {
    margin-bottom: 25px;
  }
  .form-container .container-username {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 12px;
    input[type='text'] {
      width: 100%;
    }
  }
}
</style>
