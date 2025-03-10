<template>
  <div class="bg-[#181818] min-h-screen lazy-css">
    <h1 class="text-3xl font-bold mb-8">Admin View</h1>
    <div v-if="loading" class="text-center">Loading...</div>                             <!-- Loading wait screen -->
    <div v-else-if="error" class="text-center text-red-500"> {{ error }} </div>                         <!-- Error message -->
    <div v-else class="flex flex-wrap -mx-2">                                    <!-- add new product section -->
    <div class="my-8 p-2 w-1/2 mx auto">
      <h2 class="text-2xl font-semibold mb-4">Add Duck Agent</h2>
      <form @submit.prevent="addProDuckHandler">                                                               <!-- Add product form -->
        <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <input type="text" v-model="newProduct.name" placeholder="Name" class="p-2 border rounded" />         <!-- Product name -->
          <span  class="absolute text-red-500 text-xs ml-2">Can't be empty</span> <!-- Error message & validate -->
          <input type="text" v-model="newProduct.agent" placeholder="Agent" class="p-2 border rounded" />         <!-- Product name -->
 
          <input type="text" v-model="newProduct.description"  placeholder="Description" class="p-2 border rounded" /> <!-- Product description -->
          <div class="p-2 border rounded">
            
            <span class="uppercase font-bold">Ducks age: </span>
            <input type="text" v-model="newProduct.age"   placeholder="Age" class=" pl-2 " /> <!-- Product price -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <span class="uppercase font-bold pr-2 text-green-500">not Wanted: </span> <input type="checkbox" v-model="newProduct.notWanted"  class="p-2 border rounded w-6 h-6 mr-2 pr-2" />  <!-- Hidden product -->
            <span class="uppercase font-bold pr-2 text-red-500">Wanted:</span> <input type="checkbox" v-model="newProduct.wanted"  class="p-2 border rounded w-6 h-6 mr-2" /> <!-- Hidden product -->
          </div>
          <div class="p-2 border rounded flex items-center">

            <span class="uppercase font-bold">species:</span> <!-- Discount in % -->
            <input type="text" v-model="newProduct.species"  placeholder="Species" class=" ml-2 pl-2 " /> <!-- Discount % -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <input type="checkbox" v-model="newProduct.isHidden"  class="p-2 border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Hidden Duck Agent</span> <!-- Hidden product -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <span class="uppercase font-bold pr-2 text-green-500">Friendly: </span> <input type="checkbox" v-model="newProduct.friendly"  class="p-2 border rounded w-6 h-6 mr-2 pr-2" />  <!-- Hidden product -->
            <span class="uppercase font-bold pr-2 text-red-500">Hostile: </span> <input type="checkbox" v-model="newProduct.hostile"  class="p-2 border rounded w-6 h-6 mr-2" /> <!-- Hidden product -->
          </div>
          <input type="text"  v-model="newProduct.imageURL" placeholder="Image URL" class="p-2 border rounded h-10" /> <!-- Image URL -->

        </div>
        <div class="p-2 border rounded">
            
            <span class="uppercase font-bold">Ducks assassinated </span>
            <input type="number" v-model=newProduct.ducksAssassinated   placeholder="0" class=" pl-2 " /> <!-- Product price -->
          </div>
        <button type="submit" class="mt-4 bg-yellow-600 text-white p-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
    <div class="my-8 p-2 w-1/2 mx auto">
      <h2 class="text-2xl font-semibold mb-4">Please consider listening to the duck song</h2>
      
  <div class="video-container">
    <iframe
      :src="videoUrl"
      frameborder="0"
      allowfullscreen
      width="560"
      height="315"
    ></iframe>
  </div>

    </div>


    <!-- Edit existing products -->
    <div class="my-8 p-2 w-full">

      <h2 class="text-2xl font-semibold mb-4">Duck Agents</h2>
      <div v-for="product in products" class="mb-4 p-4 border rounded bg-[#181818]"> <!-- Loop through the products -->
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" v-model="product.name"  placeholder="Name" class="p-2 border rounded" /> <!-- Product name -->
          <input type="text" v-model="product.agent"  placeholder="Agent" class="p-2 border rounded" /> <!-- Product name -->

          <input type="text" v-model="product.description" placeholder="Description" class="p-2 border rounded" /> <!-- Product description -->
        
          <div class="p-2 border rounded">
            <span class="uppercase font-bold">Duck age: </span>
            <input type="text" v-model="product.age" placeholder="Price"  class=" p-2 border rounded " /> <!-- Product price -->
          </div>
           <div class="p-2 border rounded">
            <span class="uppercase font-bold">Duck age: </span>
            <input type="text" v-model="product.age" placeholder="Price"  class=" p-2 border rounded " /> <!-- Product price -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <span class="uppercase font-bold pr-2 text-green-500">Not Wanted: </span> <input type="checkbox" v-model="product.notWanted"  class="p-2 border rounded w-6 h-6 mr-2 pr-2" />  <!-- Hidden product -->
            <span class="uppercase font-bold pr-2 text-red-500">Wanted: </span> <input type="checkbox" v-model="product.wanted"  class="p-2 border rounded w-6 h-6 mr-2" /> <!-- Hidden product -->
          </div>
          <div class="p-2 border rounded flex items-center">

          <span class="uppercase font-bold">species:</span> <!-- Discount in % -->
            <input type="text" v-model="product.species"  placeholder="Species" class=" ml-2 pl-2 " /> <!-- Discount % -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <input type="checkbox" v-model="product.isHidden"  class="p-2 border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Hidden product</span> <!-- Hidden product -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <span class="uppercase font-bold pr-2 text-green-500">Friendly: </span> <input type="checkbox" v-model="product.friendly"  class="p-2 border rounded w-6 h-6 mr-2 pr-2" />  <!-- Hidden product -->
            <span class="uppercase font-bold pr-2 text-red-500">Hostile: </span> <input type="checkbox" v-model="product.hostile"  class="p-2 border rounded w-6 h-6 mr-2" /> <!-- Hidden product -->
          </div>
          <div class="p-2 border rounded">
            
            <span class="uppercase font-bold">Ducks assassinated </span>
            <input type="number" v-model=product.ducksAssassinated   placeholder="Age" class=" pl-2 " /> <!-- Product price -->
          </div>
          <input type="text" v-model="product.imageURL"  placeholder="Image URL" class="p-2 border rounded h-10" /> <!-- Image URL -->
          <span>
            Thumbnail img: <img :src="product.imageURL" alt="Product Image" class="w-full h-24 w-24 object-cover mb-4 rounded-lg"> <!-- Product image -->
          </span>
        </div>

        <div class="mt-4 flex space-x-2"> <!-- Update and delete buttons -->
          <p>ID:  </p> <!-- Product ID for testing -->
          <button @click="deleteProDuck(product._id)" class="bg-red-600 text-white p-2 rounded hover:bg-red-700">Delete</button> <!-- Delete button -->
          <button  class="bg-green-600 text-white p-2 rounded hover:bg-green-700">Edit</button> <!-- Edit button -->
         </div>
      </div>
    </div>
  </div>
     <!-- Custom confirmation dialog -->

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { onMounted } from 'vue';
import { useProDucks } from '@/modules/useProducts';

const {products, error, loading, fecthProDucks, deleteProDuck, addProDuck, getTokenAndUserId} = useProDucks();

const videoId = "MtN1YnoL46Q"; 
const videoUrl = `https://www.youtube.com/embed/${videoId}`;

onMounted(() => {
fecthProDucks();
});

const newProduct = ref({
  name: '',
  agent: '',
  description: '',
  age: 0,
  wanted: false,
  notWanted: false,
  species: '',
  friendly: true,
  hostile: false,
  ducksAssassinated: 0,
  isHidden: false,
  imageURL: '',
  _createdBy: ''
})

const addProDuckHandler = async () => {
const {userId} = getTokenAndUserId();
newProduct.value._createdBy = userId;
await addProDuck(newProduct.value)
newProduct.value = {
  ...newProduct.value,
}
}


</script>

<style scoped>
input {
  background-color: #2b2b2b;
}

.lazy-css {
  color: #969696 ;
}

input[type=checkbox] {
  accent-color: var(--input-field-color);
}

.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-semibold {
  text-align: center;
  color: #e7d806;
}

.wrapper nav a:active {
  color: #e7d806;
}
</style>
