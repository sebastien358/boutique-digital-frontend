<template>
  <div class="d-flex align-items-center justify-content-center p-20 container">
    <div class="payment-form">
      <h1 class="text-center mb-15">Paiement sécurisé</h1>
      <p class="text-center mb-20">Entrez vos informations de carte de crédit pour effectuer le paiement</p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-5">
          <label for="card-element">Carte</label>
          <div id="card-element" ref="cardElement"></div>
        </div>
        <div class="d-flex flex-column">
          <button class="btn btn-primary" type="submit">Payer</button>
        </div>
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
  stripe.value = await loadStripe('pk_test_51S7vMKGrri7JBEMH0ETlCFzS9xiN409EHLpu07ZRfJURU9LZ79aR2M1NcPjseKOXgZRo1W0MR2qPDb8Z50W3sszt00ksAK8QBQ');
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

const handleSubmit = async () => {
  try {
    const { token, error } = await stripe.value.createToken(cardStripe.value);
    if (error) {
      console.error('Erreur lors de la création du token', error);
    } else {
      console.log('Token de paiement créé avec succès', token);
      alert('Paiement réussi !');
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins' as m;

.container {
  min-height: 100%;
  .payment-form {
    width: 100%;
    max-width: 480px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    @include m.xl {
      max-width: 520px;
    }
  }
  .payment-form > h1 {
    font-size: 21px;
    @include m.xl {
      font-size: 24px;
    }
  }
  .payment-form > p {
    font-size: 14px;
    @include m.xl {
      font-size: 15px;
    }
  }
  .payment-form button {
    padding: 11px;
  }
  #card-element {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 40px;
  }
}
</style>



