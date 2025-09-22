<template>
  <div class="container">
    <div class="text-center">
      <span v-if="errorMessage" class="d-flex flex-column error-message">
        {{ errorMessage }}
      </span>
      <span v-if="successMessage" class="d-flex flex-column success-message">
        {{ successMessage }}
      </span>
    </div>
    <div class="d-flex align-items-center flex-column justify-content-center order">
      <h1 class="text-center">Récapitulatif de la commande</h1>
      <!-- Infos de la commande de l'utlilisateur -->
      <div class="d-flex flex-column justify-content-center info-command">
        <div
          v-for="cart in carts"
          :key="cart.id"
          class="d-flex align-items-center space-between info-command_details"
        >
          <h4>{{ cart.title }}</h4>
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <font-awesome-icon @click="removeProductFromCartExisting(cart.id)" icon="fa-solid fa-minus" />
              <span class="quantity">{{ cart.quantity }}</span>
              <font-awesome-icon @click="addProductFromCartExisting(cart.id)" icon="fa-solid fa-plus" />
            </div>
            <strong class="price">{{ cart.price }}€</strong>
          </div>
        </div>
      </div>
      <!-- Formulaire de la commande -->
      <div class="form-container">
        <!-- Total de la commande -->
        <div class="d-flex align-items-center justify-content-center totalCommand">
          <h3>Prix : {{ totalCommand }} €</h3>
        </div>
        <form @submit="onSubmit">
          <div class="container-username">
            <div class="mb-20">
              <label><span>*</span>Prénom</label>
              <input v-model="firstName" type="text" autofocus />
              <span v-if="errorFirstname" class="error-fields">
                {{ errorFirstname }}
              </span>
            </div>
            <div class="mb-20">
              <label><span>*</span>Nom</label>
              <input v-model="lastName" type="text" />
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
          <div class="d-flex flex-column mb-15">
            <label><span>*</span>Téléphone</label>
            <input v-model="phoneNumber" type="tel" />
            <span v-if="errorPhoneNumber" class="error-fields">
              {{ errorPhoneNumber }}
            </span>
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button class="btn btn-success" :disabled="isSubmitting">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useCommandStore } from '@/stores/orderStore.ts'
import { useCartStore } from '@/stores/cartStore.ts'

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

// import du store CartStore

const cartStore = useCartStore()

// Liste des éléments du panier

const carts = computed(() => cartStore.cart)

// total de la commande

const totalCommand = computed(() => cartStore.totalBasket)

// Function, récupération des articles de la commande

async function loadCarts() {
  try {
    await cartStore.getCartItems()
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  try {
    await loadCarts()
  } catch (e) {
    console.error(e)
  }
})

// ajouter un produit au panier existant

async function addProductFromCartExisting(id: number) {
  try {
    await cartStore.addProductFromCartExisting(id)
  } catch(e) {
    console.error(e)
  }
}

// Retirer un produit du panier existant

async function removeProductFromCartExisting(id: number) {
  try {
    await cartStore.removeFromCart(id)
  } catch(e) {
    console.error(e)
  }
}

// Created form command

const commandStore = useCommandStore()
const router = useRouter()

const schema = z.object({
  firstName: z
    .string({ message: 'Le prénom est requis' })
    .min(2, {message: 'Le prénom doit comporter au moins 2 caractères' })
    .max(50, { message: 'Le prénom ne peut pas dépasser 50 caractères' }),
  lastName: z
    .string({ message: 'Le nom est requis' })
    .min(2, { message: 'Le nom doit comporter au moins 2 caractères' })
    .max(50, { message: 'Le nom ne peut pas dépasser 50 caractères' }),
  address: z
    .string({ message: 'L\'adresse est requise' })
    .min(5, { message: 'L\'adresse doit comporter au moins 5 caractères' })
    .max(100, { message: 'L\'adresse ne peut pas dépasser 100 caractères' }),
  zipCode: z
    .string({ message: 'Le code postal est requis' })
    .regex(/^\d{5}$/, { message: 'Le code postal doit être composé de 5 chiffres' }),
  city: z
    .string({ message: 'La ville est requise' })
    .min(2, { message: 'La ville doit comporter au moins 2 caractères' })
    .max(50, { message: 'La ville ne peut pas dépasser 50 caractères' }),
  country: z
    .string({ message: 'Le pays est requis' })
    .refine((value) => ['France', 'Belgique', 'Suisse'].includes(value), {
      message: 'Pays invalid',
    }),
  phoneNumber: z
    .string({ message: 'Le numéro de téléphone est requis' })
    .regex(/^0\d{9}$/, { message: 'Le numéro de téléphone doit commencer par 0 et être composé de 10 chiffres' },
    ),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
})

const { value: firstName, errorMessage: errorFirstname } = useField('firstName')
const { value: lastName, errorMessage: errorLastname } = useField('lastName')
const { value: address, errorMessage: errorAddress } = useField('address')
const { value: zipCode, errorMessage: errorZipCode } = useField('zipCode')
const { value: city, errorMessage: errorCity } = useField('city')
const { value: country, errorMessage: errorCountry } = useField('country')
const { value: phoneNumber, errorMessage: errorPhoneNumber } = useField('phoneNumber')

const onSubmit = handleSubmit(async (dataCommand, { resetForm }) => {
  try {
    const response = await commandStore.addCommand(dataCommand)
    if (response !== null) {
      setSuccessMessage('La commande a été validée', resetForm)
    } else {
      setErrorMessage('La commande a échouée')
    }
  } catch (e) {
    setErrorMessage('La commande a échouée')
    console.error('Error : la commande a échouée', e)
  }
})

// Message de confirmation : success

function setSuccessMessage(message: string, resetForm: () => void) {
  errorMessage.value = ''
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
    resetForm()
    router.push({ path: '/payment' })
  }, 2000)
}

// message de confirmation : error

function setErrorMessage(message: string) {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = ''
  }, 4000)
}
</script>

<style scoped lang="scss">
@mixin messageError {
  text-align: center;
  min-width: 100%;
  color: var(--text-primary-color);
  padding: 20px;
}

.error-message {
  background-color: red;
  @include messageError;
}

.success-message {
  background-color: green;
  @include messageError;
}

.info-command {
  margin-bottom: 60px;
  width: 100%;
  row-gap: 10px;
  &_details {
    background-color: white;
    border: var(--border);
    padding: 20px;
    .quantity {
      font-size: 15px;
      margin: 0 10px;
    }
    .price {
      color: var(--success-2);
      padding-left: 40px;
    }
    .fa-minus,
    .fa-plus {
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
    }
    .fa-minus {
      color: red;
    }
    .fa-plus {
      color: green;
    }
    strong {
      font-size: 14px;
    }
  }
}

.order {
  height: 100%;
  padding: 20px;
  h1 {
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .totalCommand {
    border: var(--border);
    padding: 20px 60px;
    margin-bottom: 50px;
    background-color: white;
    font-size: 15px;
  }
  .form-container {
    width: 100%;
    max-width: 1200px;
    padding: 30px 20px 10px 20px;
  }
  .form-container input,
    select {
    border: 0;
    border-bottom: var(--border);
    width: 100%;
  }
  .form-container > h2 {
    margin-bottom: 25px;
  }
  .form-container .container-username {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 12px;
  }
  .btn-success {
    padding: 18px 50px;
  }
}
</style>
