<template>
  <div class="v-input">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :type="type"
      :value="value"
      :id="id"
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
      },
      id: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="sass">
  .v-input
    label
      margin-bottom: 5px
      color: $black
      display: block
      font-size: 1rem
    input
      border: 1px solid $grey
      height: 32px
      width: 100%
      padding: 0 10px
      &:active, &:focus
        outline: none
</style>