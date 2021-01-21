<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login">
      <base-input
        v-model="form.email"
        placeholder="joh.doe@gmail.com"
        type="email"
        @blur="$v.form.email.$touch()"
      >
        <error-message-mail
          v-if="$v.form.email.$error"
          slot="errorMessage"
          :error="$v.form.email"
          :rules="$v.form.email.$params"
        />
      </base-input>

      <base-input
        v-model="form.password"
        type="password"
        placeholder="votremotdepasse"
        @blur="$v.form.password.$touch()"
      >
        <error-message-password
          v-if="$v.form.password.$error"
          slot="errorMessage"
          :error="$v.form.password"
          :rules="$v.form.password.$params"
        />
      </base-input>

      <p v-if="serverErrors.length" class="text-red-500">
        {{ serverErrors }}
      </p>

      <button>
        Connexion
      </button>
    </form>
  </div>
</template>

<script>
import { email, minLength } from 'vuelidate/lib/validators'
import BaseInput from '@/components/Forms/BaseInput.vue'
import ErrorMessageMail from '@/components/Forms/Errors/ErrorMessageMail.vue'
import ErrorMessagePassword from '@/components/Forms/Errors/ErrorMessagePassword.vue'

export default {
  components: { BaseInput, ErrorMessageMail, ErrorMessagePassword },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },

      serverErrors: []
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
    },

    handleServerError (error) {
      const { data, status, statusText } = error.response

      console.log(error.response)

      if (status === 401 && statusText === 'Unauthorized') {
        this.serverErrors = 'Identifiants incorrects'
      }

      if (status === 422 && statusText === 'Unprocessable Entity') {
        for (const [name, message] of Object.entries(data)) {
          // TODO : Trouver un moyen de faire fonctionner ça
          this.serverErrors.push(
            {
              name,
              message: message[0]
            })
        }
      }
    }

  },

  validations: {
    form: {
      email: {
        email
      },

      password: {
        minLength: minLength(6)
      }
    }
  }
}
</script>
