<template>
  <div class="text-red-500">
    <template v-if="rules.minLength">
      <p v-if="!error.minLength">
        Il faut au moins {{ error.$params.minLength.min }} caractères
      </p>
    </template>

    <template v-if="rules.required">
      <p v-if="!error.required">
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
