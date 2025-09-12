<template>
  <div class="d-flex align-items-center justify-content-center product-form">
    <div class="d-flex align-items-center flex-column">
      <div class="form-container">
        <h2 class="mb-15 text-center">{{ Object.keys(state.product).length > 0 ? 'Éditer le produit' : 'Ajouter un produit' }}</h2>
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
            <input
              type="file"
              multiple
              @change="onChangeImages(($event.target as HTMLInputElement).files)"
            />
          </div>
          <div class="d-flex flex-column mb-10">
            <label for="category"><span>*</span>catégories</label>
            <select v-model="category" name="category" id="category">
              <option value="" selected disabled>--Please choose an option--</option>
              <option v-for="cat in categories" :value="cat.id" :key="cat.id">
                {{ cat.name }}
              </option>
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
          <button class="btn btn-primary" :disabled="isSubmitting">Soumettre</button>
        </form>
      </div>
      <div v-if="state.product.pictures && state.product.pictures.length > 0" class="container-image">
        <div v-for="(picture, index) in state.product.pictures" :key="index" class="d-flex align-items-center flex-column">
          <img :src="picture.url" class="img-product" />
          <font-awesome-icon @click="deleteImage(state.product.id, picture.id, index)" icon="fa-solid fa-trash" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminCategory } from '../../../stores/admin/categoryAdminStore'
import { useProductAdminStore } from '../../../stores/admin/productAdminStore'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as z from 'zod'

const productAdminStore = useProductAdminStore()

// récupération d'un produit via le paramètre de l'url

const route = useRoute();

const state = reactive<{ 
  product: any, 
  images: object }>({ 
    product: {}, 
    images: [] 
})

if (route.params.id) {
  state.product = await productAdminStore.getCurrentProduct(route.params.id);
  // console.log(state.product)
}

async function deleteImage(productId: number, pictureId: number, index?: any) {
  try {
    await productAdminStore.deleteImage(productId, pictureId, index);
    state.product.pictures.splice(index, 1);
  } catch(e) {
    console.error('Erreur: suppression d\'une image', e);
  }
}

// Initialisation des champs du formulaire


const initialValues = {
  title: state.product?.title ?? '',
  price: state.product?.price ?? 0,
  description: state.product?.description ?? '',
  category: state.product?.category ?? ''
}

// Schema

const schema = z.object({
  title: z
    .string({ message: 'Le titre est requis' })
    .min(5, { message: 'Le titre doit comporter au moins 5 caractères' })
    .max(45, { message: 'Le titre ne peut pas dépasser 45 caractères' }),
  image: z.array(z.instanceof(File)).optional(),
  description: z
    .string({ message: 'La description est requise' })
    .min(10, { message: 'La description doit comporter au moins 10 caractères' })
    .max(100, { message: 'La description ne peut pas dépasser 10 caractères' }),
  price: z.coerce
    .number({ message: 'Le prix doit être un nombre' })
    .min(500, { message: "Le prix doit être d'au moins 500" })
    .max(10000, { message: 'Le prix ne peut pas dépasser 10000' }),
  category: z.coerce.number({ message: 'La catégorie est requise' }),
})

// Gestion upload images

function onChangeImages(files: File[]) {
  state.images = [...state.images, ...files].flat(Infinity)
}

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues
})

const { value: title, errorMessage: errorTitle } = useField('title')
const { value: description, errorMessage: errorDescription } = useField('description')
const { value: price, errorMessage: errorPrice } = useField('price')
const { value: image, errorMessage: errorImage } = useField('image')
const { value: category, errorMessage: errorCategory } = useField('category')

const onSubmit = handleSubmit(async (dataProduct) => {
  try {
    if (Object.keys(!state.product).length > 0) {
      delete dataProduct.image
      dataProduct.images = state.images
      await productAdminStore.newProduct(dataProduct)
      setSuccessMessage('Le produit a été ajouté avec succès', null)
    } else {
      delete dataProduct.image
      dataProduct.images = [ ...state.images ]
      await productAdminStore.updateProduct(dataProduct, route.params.id);
      setSuccessMessage('Le produit a été modifié avec succès')
    }
  } catch (e) {
    setErrorMessage("L'envoi d'un produit n'a pas pu aboutir")
    console.error(e)
  }
})

const successMessage = ref<string>('')
const errorMessage = ref<string>('')

const router = useRouter()

const setSuccessMessage = (message: string, resetForm: () => void) => {
  errorMessage.value = ''
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
    // resetForm()
    // router.push({ path: '/product-list' })
  }, 2000)
}

const setErrorMessage = (message: string) => {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = ''
  }, 4000)
}

// Load catégories

const categoryAdminStore = useAdminCategory();
const categories = computed(() => categoryAdminStore.category);

async function loadCategory() {
  try {
    await categoryAdminStore.getCategories();
  } catch (e) {
    console.error('Erreur: récupération des catégories', e);
  }
}

onMounted(async () => {
  try {
    await loadCategory();
  } catch(e) {
    console.error(e);
  }
})
</script>

<style scoped lang="scss">
.product-form {
  height: 100%;
  padding: 20px;
}

.container-image {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  .fa-trash {
    cursor: pointer;
    color: var(--danger-1);
    font-size: 16px;
  }
  .img-product {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
</style>
