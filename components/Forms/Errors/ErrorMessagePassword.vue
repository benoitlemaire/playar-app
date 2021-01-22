<template>
  <div class="text-red-500">
    <!-- Back-end error  -->
    <p v-if="serverError.password">
      {{ serverError.password }}
    </p>

    <!-- Front-end error -->
    <template v-if="rules.minLength">
      <p v-if="!frontError.minLength">
        Il faut au moins {{ frontError.$params.minLength.min }} caractères
      </p>
    </template>

    <template v-if="rules.required">
      <p v-if="!frontError.required">
        Le mot de passe est requis
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
