<template>
  <div class="text-red-500">
    <template v-if="rules.required">
      <p v-if="!error.required">
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
