<script setup lang="ts">
const props = defineProps({
  id: Number,
  title: String,
  likes: Number,
});

const emit = defineEmits(["like"]);

function sendLike() {
  emit("like", props.id);
}

function sendAlert() {
  alert(`Secțiunea "${props.title}" are ${props.likes} like-uri.`);
}
</script>

<template>
  <div style="border: 1px solid blue; margin: 10px; padding: 15px">
    <h3>{{ title }}</h3>

    <p>
      Like-uri pentru această secțiune:
      <strong>{{ likes }}</strong>
    </p>

    <button v-on:click="sendLike()">👍 Like</button>
    <button v-on:click="sendAlert()">!!! Alert</button>
  </div>
</template>

<style scoped></style>
