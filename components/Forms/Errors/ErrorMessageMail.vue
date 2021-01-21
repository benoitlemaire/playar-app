<template>
  <div class="text-red-500">
    <template v-if="rules.required">
      <p v-if="!error.required">
        L'email est requis
      </p>
    </template>

    <template v-if="rules.email">
      <p v-if="!error.email">
        le format de l'email est incorrect
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
