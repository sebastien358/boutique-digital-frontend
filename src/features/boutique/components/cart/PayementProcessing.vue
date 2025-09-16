<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="payment-form">
      <h2 class="text-center">Paiement</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="card-element">Carte</label>
          <div id="card-element" ref="cardElement"></div>
        </div>
        <button class="btn btn-primary" type="submit">Payer</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

const stripe = ref(null);
const cardStripe = ref(null);
const cardElement = ref(null);

onMounted(async () => {
  stripe.value = await loadStripe('');
  const elements = stripe.value.elements();
  cardStripe.value = elements.create('card', {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '10px',
      },
    },
  });
  cardStripe.value.mount(cardElement.value);
});

import axios from 'axios';

const handleSubmit = async () => {
  try {
    const { token, error } = await stripe.value.createToken(cardStripe.value);
    if (error) {
      console.error('Erreur lors de la création du token', error);
    } else {
      console.log('Token de paiement créé avec succès', token);
      // Afficher un message de succès
      alert('Paiement réussi !');
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped lang="scss">
.payment-form {
  margin-top: 60px;
  height: 100%;
  width: 450px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#card-element {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 40px;
}
</style>

