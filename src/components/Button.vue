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
      border: 1px solid black
      cursor: pointer
</style>