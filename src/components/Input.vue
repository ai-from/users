<template>
  <div class="v-input">
    <input
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      value: {},
      type: {
        type: String,
        default: 'text'
      }
    }
  }
</script>

<style lang="sass">
  .v-input
    input
      border: 1px solid black
</style>