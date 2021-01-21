<template>
  <label>
    {{ label }}
    <input
      class="border-2 p-2"
      v-bind="$attrs"
      :value="value"
      v-on="inputListeners"
    >

    <slot name="errorMessage" />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number],
      default: ''
    },

    label: {
      type: String,
      default: ''
    }
  },

  computed: {
    inputListeners () {
      const vm = this
      return Object.assign({},
        this.$listeners,
        {
          input (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  }
}
</script>
