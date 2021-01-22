<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login">
      <lazy-base-input
        v-model="form.email"
        class="block mb-4"
        :label="'votre email'"
        placeholder="joh.doe@gmail.com"
        type="email"
        @blur="$v.form.email.$touch()"
        @focus="clearServerError('email')"
      >
        <lazy-error-message-mail
          v-if="$v.form.email.$error || severError.email"
          slot="errorMessage"
          :front-error="$v.form.email"
          :server-error="severError"
          :rules="$v.form.email.$params"
        />
      </lazy-base-input>

      <lazy-base-input
        v-model="form.password"
        class="block mb-4"
        :label="'Mot de passe'"
        type="password"
        placeholder="votremotdepasse"
        @blur="$v.form.password.$touch()"
        @focus="clearServerError('password')"
      >
        <lazy-error-message-password
          v-if="$v.form.password.$error || severError.password"
          slot="errorMessage"
          :front-error="$v.form.password"
          :server-error="severError"
          :rules="$v.form.password.$params"
        />
      </lazy-base-input>

      <p
        v-if="severError.unauthorized"
        class="text-red-500"
      >
        {{ severError.unauthorized }}
      </p>

      <button>
        Connexion
      </button>
    </form>
  </div>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'
import handleServerError from '~/mixins/handleServerError.js'

export default {
  mixins: [handleServerError],

  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    login () {
      this.$v.$touch()

      if (!this.$v.$error) {
        this.$axios.post('auth/login', this.form)
          .then(result => console.log(result))
          .catch((error) => {
            this.handleServerError(error)
          })
      }
    }
  },

  validations: {
    form: {
      email: {
        email,
        required
      },

      password: {
        required,
        minLength: minLength(6)
      }
    }
  }
}
</script>
