<script setup lang="ts">
const videoId = "MtN1YnoL46Q"; 
const videoUrl = `https://www.youtube.com/embed/${videoId}`;
</script>

<template>
  <h1>This song will explain everything</h1>
  <div class="video-container">
    <iframe
      :src="videoUrl"
      frameborder="0"
      allowfullscreen
      width="560"
      height="315"
    ></iframe>
  </div>
</template>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: #e7d806;
font-size: 4rem;
text-align: center;
padding-bottom: 50px;
}
  
</style>
