<template>
  <Teleport v-if="props.open" to="body">
    <div class="modal">
      <div class="d-flex align-items-center justify-content-center modal_content">
        <div class="d-flex align-items-center flex-column modal_content_text">
          <p>Voulez-vous vraiment supprimer cet article ?</p>
          <div class="d-flex align-items-center">
            <button @click="emit('close')" class="btn btn-success mr-5">Annuler</button>
            <button @click="deleteProduct(props.productId)" class="btn btn-danger">Confirmer</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useProductAdminStore } from "../../stores/admin/productAdminStore.ts"
const productAdminStore = useProductAdminStore();

const props = defineProps<{
  open: boolean
  productId: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

async function deleteProduct(id: number) {
  try {
    await productAdminStore.deleteProduct(id);
    emit('close');
  } catch(e) {
    console.log('Erreur: supression d\'un produit', e);
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000073;
  &_content {
    height: 100%;
    &_text {
      width: 100%;
      max-width: 380px;
      padding: 30px 20px;
      background-color: white;
      button {
        width: 90px;
      }
      p {
        color: #747d8c;
        font-size: 15px;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
