<template>
  <div class="d-flex align-items-center justify-content-center ">
    <div class="payment-form">
      <h2>Paiement</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="cardNumber">Numéro de carte</label>
          <input
            type="text"
            id="cardNumber"
          />
          <span class="invalid-feedback"></span>
        </div>
        <div class="form-group">
          <label for="expirationDate">Date d'expiration</label>
          <input
            type="text"
            id="expirationDate"

          />
          <span class="invalid-feedback"></span>
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
          />
        </div>
        <button >Payer</button>
      </form>
    </div>


  </div>


</template>

<script setup lang="ts">

</script>

<style lang="scss">
.payment-form {
  height: 100%;
  max-width: 500px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
}

.form-group {
margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
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
</style>
