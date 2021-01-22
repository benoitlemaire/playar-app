<template>
  <div class="text-red-500">
    <!-- Back-end error  -->
    <p v-if="serverError.email">
      {{ serverError.email }}
    </p>

    <!-- Front-end error -->
    <template v-if="rules.required">
      <p v-if="!frontError.required">
        L'email est requis
      </p>
    </template>

    <template v-if="rules.email">
      <p v-if="!frontError.email">
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
