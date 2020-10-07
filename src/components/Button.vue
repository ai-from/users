<template>
  <div class="v-button">
    <button
      :type="type"
      @click="$emit('click')"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      type: {
        type: String,
        default: 'button'
      },
      text: {
        type: String,
        default: 'Button'
      }
    }
  }
</script>

<style lang="sass">
  .v-button
    button
      cursor: pointer
      background: $blue
      color: $white
      padding: 0 20px
      height: 32px
      border: none
      font-size: .9rem
      &:hover
        background: $blue-light
      &:active
        background: $blue-dark
      &:active, &:focus
        outline: none
</style>