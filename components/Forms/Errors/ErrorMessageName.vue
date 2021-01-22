<template>
  <div class="text-red-500">
    <p v-if="serverError.name">
      {{ serverError.name }}
    </p>

    <template v-if="rules.required">
      <p v-if="!frontError.required">
        Le nom est requis
      </p>
    </template>
  </div>
</template>

<script>
import errorMessage from '~/mixins/errorMessage.js'

export default {
  mixins: [errorMessage]
}
</script>
