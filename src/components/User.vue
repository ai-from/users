<template>
  <div class="user">
    <div v-if="!isEditing">
      Name: {{ user.name }} <br>
      Position: {{ user.position }}
      <v-button text="Edit" @click="editUser(user.id)" />
      <v-button text="Delete" @click="deleteUser(user.id)" />
    </div>
    <div v-else>
      Name:
      <v-input v-model="editedName" />
      Position:
      <v-input v-model="editedPosition" />
      <v-button text="Save" @click="saveEdit(user.id)" />
      <v-button text="Cancel" @click="cancelEdit" />
    </div>
    <hr>

  </div>
</template>

<script>
  import CONSTS from '@/utils/vars'
  import axios from 'axios'
  import Button from '@/components/Button'
  import Input from '@/components/Input'
  import consts from '@/utils/vars'
  export default {
    name: 'User',
    props: {
      user: {
        type: Object,
        default: {}
      }
    },
    components: {
      'v-button': Button,
      'v-input': Input
    },
    data: () => ({
      isEditing: false,
      editedName: '',
      editedPosition: ''
    }),
    methods: {
      async deleteUser(id) {
        await axios.delete(`${CONSTS.API_URL}/contacts/${id}`)
        this.$emit('updateData')
      },
      editUser(id) {
        this.isEditing = true
        axios.get(`${CONSTS.API_URL}/contacts/${id}`).then(res => {
          this.editedName = res.data.name
          this.editedPosition = res.data.position
        })

      },
      cancelEdit() {this.isEditing = false},
      async saveEdit(id) {
        await axios.put(`${CONSTS.API_URL}/contacts/${id}/`,
          {
            name: this.editedName,
            position: this.editedPosition
          })
        this.$emit('updateData')
        this.isEditing = false

      }
    }
  }
</script>

<style lang="sass">

</style>