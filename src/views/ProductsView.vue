<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-4">Products</h2>
    <div v-if="loading" class="text-center">Loading...</div>                                           <!-- Loading wait screen with v-if -->

    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>                                        <!-- Error message with v-else-if -->

    <div v-else class="flex flex-wrap -mx-2">                                                  <!-- Loop through the products -->
      <div v-for="product in products" :key="product._id" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" >                              <!-- Product card with v-for -->
        <div class="bg-white p-4 rounded-lg shadow-md">
        <img  :src="product.imageURL" alt="Product Image" class="w-full h-48 object-cover mb-4 rounded-lg">      <!-- Product image -->
          <h3 class="text-lg text-gray-700 font-semibold mb-2"> {{ product.name }} </h3>                  <!-- Product name -->
          <p class="text-gray-700"> {{ product.description }}  </p>                                               <!-- Product description -->
          <p class="text-gray-700 font-bold mt-2"><strong>Age:</strong> {{ product.age }} </p>                                <!-- Product price -->
          <div class="flex justify-between mt-4">
            <p class="text-gray-700 font-bold mt-2"><strong>Species:</strong> {{ product.species }} </p>                                <!-- Product price -->
            <p class="text-gray-700 font-bold mt-2">
  <strong>Status:</strong> 
  <span v-if="product.hostile" class="text-red-500 font-bold"> Hostile</span>
  <span v-else class="text-green-500 font-bold"> Friendly</span>
</p>          </div>
        </div> 
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProDucks } from '../modules/useProducts';


const {loading, error, products, fecthProDucks} = useProDucks();

onMounted(() => {
  fecthProDucks();
})

</script>
  
<style scoped>
</style>
