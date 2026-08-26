<script setup lang="ts">
import { ref } from "vue";
import Article from "./Article.vue";

const count = ref(0);
let message = ref("Hello World");
let visible = ref(true);
</script>

<template>
  <p>
    {{ message }}
  </p>
  <button type="button" class="counter" @click="count++">
    Count is {{ count }}
  </button>
  <button @click="visible = !visible">Afiseaza/Ascunde</button>

  <div v-if="visible">Acest div este vizibil</div>

  <p>Comunicare bidirectionala View Model Model View</p>
  <input v-model="message" type="text" name="" id="" />

  <Article />
</template>
<style scoped>
p {
  color: red;
  font-size: 20px;
}
</style>
