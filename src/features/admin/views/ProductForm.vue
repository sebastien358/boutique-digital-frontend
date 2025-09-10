<template>
  <div class="d-flex align-items-center justify-content-center product-form">
    <div class="form-container">
      <h2 class="mb-15 text-center">Ajouter un produit</h2>
      <form @submit.prevent="onSubmit">
        <div class="d-flex flex-column mb-20">
          <label><span>*</span>Title</label>
          <input v-model="title" type="text" />
          <span v-if="errorTitle" class="error-fields">
            {{ errorTitle }}
          </span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label for="price"><span>*</span>Prix</label>
          <input v-model="price" type="number" />
          <span v-if="errorPrice" class="error-fields">
            {{ errorPrice }}
          </span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label for="description"><span>*</span>Description</label>
          <textarea v-model="description" rows="5"></textarea>
          <span v-if="errorDescription" class="error-fields">
            {{ errorDescription }}
          </span>
        </div> 
        <div class="d-flex flex-column mb-20">
          <label for="image">Image(s)</label>
          <input type="file" multiple @change="onChangeImages(($event.target as HTMLInputElement).files)" />
        </div>
        <div class="d-flex flex-column mb-10">
          <label for="category"><span>*</span>catégories</label>
          <select v-model="category" name="category" id="category">
            <option value="" selected disabled>--Please choose an option--</option>
            <option v-for="cat in categories" :value="cat.id" :key="cat.id">{{ cat.name }}</option>
          </select>
          <span v-if="errorCategory" class="error-fields"> {{ errorCategory }} </span>
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
          Soumettre
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminCategory } from '@/stores/admin/category.admin.ts'
import { useAdminProductStore } from '@/stores/admin/product.admin.ts'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { computed, onMounted, ref } from 'vue';

const schema = z.object({
  title: z
    .string({ message: 'Le titre est requis' })
    .min(5, { message: 'Le titre doit comporter au moins 5 caractères' })
    .max(45, { message: 'Le titre ne peut pas dépasser 45 caractères' }),
  image: z
    .array(z.instanceof(File))
    .optional(),
  description: z
    .string({ message: 'La description est requise' })
    .min(10, { message: 'La description doit comporter au moins 10 caractères' })
    .max(100, { message: 'La description ne peut pas dépasser 10 caractères' }),
  price: z
    .coerce.number({ message: 'Le prix doit être un nombre' })
    .min(500, { message: 'Le prix doit être d\'au moins 500' })
    .max(10000, { message: 'Le prix ne peut pas dépasser 10000' }),
  category: z
    .coerce.number({ message: 'La catégorie est requise' })
});

const product = ref('');

const images = ref(product.value ? product.value.images : []);

function onChangeImages(files: File[]) {
  images.value = [...images.value, ...files].flat(Infinity);
};

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema)
});

const { value: title, errorMessage: errorTitle } = useField('title');
const { value: description, errorMessage: errorDescription } = useField('description');
const { value: price, errorMessage: errorPrice } = useField('price');
const { value: image, errorMessage: errorImage } = useField('image');
const { value: category, errorMessage: errorCategory } = useField('category');

const productAdminStore = useAdminProductStore();

const onSubmit = handleSubmit(async (dataProduct) => {
  try {
    delete dataProduct.image;
    dataProduct.images = images.value;
    await productAdminStore.newProduct(dataProduct);
  } catch(e) {
    console.error(e);
  }
});

const successMessage = ref<string>('');
const errorMessage = ref<string>('');

// Load catégories

const categoryAdminStore = useAdminCategory();
const categories = computed(() => categoryAdminStore.category);

async function loadCategory() {
  try {
    await categoryAdminStore.getCategories();
  } catch(e) {
    console.error('Erreur: récupération des catégories', e);
  }
}

onMounted(async () => {
  await loadCategory();
})
</script>

<style scoped lang="scss">
.product-form {
  height: 100%;
}
</style>