<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="payment-form">
      <h2 class="text-center">Paiement</h2>
      <Form @submit="handleSubmit" :validation-schema="schema">
        <div class="form-group">
          <label for="cardNumber">Numéro de carte</label>
          <div id="card-number-element"></div>
          <Field name="cardNumber" type="hidden" />
          <ErrorMessage name="cardNumber" class="invalid-feedback" />
        </div>
        <div class="form-group">
          <label for="expirationDate">Date d'expiration</label>
          <div id="card-expiry-element"></div>
          <Field name="expirationDate" type="hidden" />
          <ErrorMessage name="expirationDate" class="invalid-feedback" />
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <div id="card-cvc-element"></div>
          <Field name="cvv" type="hidden" />
          <ErrorMessage name="cvv" class="invalid-feedback" />
        </div>
        <button class="btn btn-primary">Payer</button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { loadStripe } from '@stripe/stripe-js';
import { onMounted, ref } from 'vue';

const schema = toTypedSchema(
  z.object({
    cardNumber: z
      .string({ message: 'Le numéro de carte est requis' })
      .min(1, 'Le numéro de carte est requis'),
    expirationDate: z
      .string({ message: 'Le date d\'exiration est requise' })
      .min(1, 'La date d\'expiration est requise'),
    cvv: z
      .string({ message: 'Le CVV est requis' })
      .min(1, 'Le CVV est requis'),
  })
);

const stripe = ref(null);
const cardNumberElement = ref(null);
const cardExpiryElement = ref(null);
const cardCvcElement = ref(null);

import { nextTick } from 'vue';

onMounted(async () => {
  stripe.value = await loadStripe('votre_clé_publique');
  const elements = stripe.value.elements();
  await nextTick();
  cardNumberElement.value = elements.create('cardNumber');
  cardNumberElement.value.mount('#card-number-element');
  cardExpiryElement.value = elements.create('cardExpiry');
  cardExpiryElement.value.mount('#card-expiry-element');
  cardCvcElement.value = elements.create('cardCvc');
  cardCvcElement.value.mount('#card-cvc-element');
});
const handleSubmit = async (values) => {
  try {
    const { token, error } = await stripe.value.createToken(cardNumberElement.value);
    if (error) {
      console.error(error);
    } else {
      // Envoyez le token à votre serveur pour traitement
      console.log(token);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss">
.payment-form {
  margin-top: 60px;
  height: 100%;
  width: 450px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  h2 {
    font-size: 22px;
    margin-bottom: 12px;
  }
  .form-group {
    margin-bottom: 20px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
  }
  input[type="text"] {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  .is-invalid {
    border-color: #f44336;
  }
  .invalid-feedback {
    color: #f44336;
    font-size: 12px;
  }
  button[type="submit"] {
    width: 100%;
    height: 40px;
    background-color: #4CAF50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button[type="submit"]:hover {
    background-color: #3e8e41;
  }
  button[type="submit"]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>
