<template>
  <div
    class="star-rating"
    :aria-label="`Rating ${modelValue} din ${max}`"
    role="img"
  >
    <button
      v-for="star in stars"
      :key="star"
      :class="[
        'star-rating__star',
        {
          'is-filled': star <= modelValue,
          'is-interactive': !readonly && !disabled,
        },
      ]"
      :disabled="readonly || disabled"
      type="button"
      @click="updateValue(star)"
    >
      ★
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: number;
    max?: number;
    readonly?: boolean;
    disabled?: boolean;
  }>(),
  {
    max: 5,
    readonly: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const stars = computed(() =>
  Array.from({ length: props.max }, (_, index) => index + 1),
);

function updateValue(value: number): void {
  if (props.readonly || props.disabled) {
    return;
  }

  emit("update:modelValue", value);
}
</script>
<style scoped>
.star-rating {
  display: flex;
  gap: 0.25rem;
}

.star-rating__star {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
}

.star-rating__star.is-filled {
  color: rgb(45, 4, 193);
}

.star-rating__star.is-interactive:hover {
  color: rgb(0, 255, 64);
}
</style>
