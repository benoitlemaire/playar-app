export default {
  data () {
    return {
      severError: {}
    }
  },
  methods: {
    clearServerError (key) {
      setTimeout(() => {
        // Remove bad creditentials or error if exists
        if (this.severError.unauthorized) { this.severError.unauthorized = null }
        if (this.severError[key]) { this.severError[key] = null }
      }, 1000)
    },

    handleServerError (error) {
      const { data, status, statusText } = error.response

      // Set a custom error for bad creditentials
      if (status === 401 && statusText === 'Unauthorized') {
        this.severError = Object.assign({}, this.severError, { unauthorized: 'Identifiants incorrects' })
      }

      if (status === 422 && statusText === 'Unprocessable Entity') {
        for (const [name, message] of Object.entries(data)) {
          // Send backend error to this empty object then merge it with severError
          const obj = {}
          obj[name] = message[0]

          this.severError = Object.assign({}, this.severError, obj)
        }
      }
    }
  }
}
