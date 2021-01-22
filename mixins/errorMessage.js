export default {
  props: {
    frontError: {
      type: Object,
      default: () => {}
    },

    rules: {
      type: Object,
      default: () => {}
    },

    serverError: {
      type: Object,
      default: () => {}
    }
  }
}
