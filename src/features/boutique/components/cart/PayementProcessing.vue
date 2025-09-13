<template>
  <div class="d-flex align-items-center justify-content-center container">
  <div class="payment-processing">
    <h2>Paiement</h2>
    <form @submit.prevent="processPayment">
      <div class="payment-method">
        <label for="payment-method">Méthode de paiement :</label>
        <select id="payment-method" v-model="paymentMethod">
          <option value="card">Carte bancaire</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <div class="payment-details" v-if="paymentMethod === 'card'">
        <label for="card-number">Numéro de carte :</label>
        <input type="text" id="card-number" v-model="cardNumber">
        <label for="expiration-date">Date d'expiration :</label>
        <input type="text" id="expiration-date" v-model="expirationDate">
        <label for="cvv">CVV :</label>
        <input type="text" id="cvv" v-model="cvv">
      </div>
      <button type="submit">Payer</button>
    </form>
  </div>
  </div>

</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.container {
  height: 100%;
}
.payment-processing {
  width: 500px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
  }

  form {
    margin-top: 20px;
  }

  .payment-details {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="text"], select {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
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
}

</style>

