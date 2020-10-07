<template>
  <div class="user">
    <div class="user-usual" v-if="!isEditing">
      <div class="user-usual__wrap">
        <div class="user-usual__wrap-key">Имя:</div>
        <div class="user-usual__wrap-val">{{ user.name }}</div>
      </div>
      <div class="user-usual__wrap">
        <div class="user-usual__wrap-key">Позиция:</div>
        <div class="user-usual__wrap-val">{{ user.position }}</div>
      </div>
      <div class="user__btns">
        <v-button text="Редактировать" @click="editUser(user.id)" />
        <v-button text="Удалить" @click="deleteUser(user.id)" />
      </div>
    </div>
    <div class="user-editing" v-else>
      <v-input
        v-model="editedName"
        label="Имя:"
        class="user-editing__input"
      />
      <v-input
        v-model="editedPosition"
        label="Позиция:"
        class="user-editing__input"
      />
      <div class="user__btns">
        <v-button text="Сохранить" @click="saveEdit(user.id)" />
        <v-button text="Отмена" @click="cancelEdit" />
      </div>
    </div>
    <hr>

  </div>
</template>

<script>
  import CONSTS from '@/utils/vars'
  import axios from 'axios'
  import Button from '@/components/Button'
  import Input from '@/components/Input'
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
  .user
    &__btns
      display: grid
      grid-template-columns: repeat(2, min-content)
      grid-gap: 10px
      margin: 10px 0
    &-usual
      &__wrap
        display: grid
        grid-template-columns: 70px min-content
        grid-gap: 5px
      &__wrap-key
        white-space: nowrap
      &__wrap-val
        white-space: nowrap
    &-editing
      &__input
        margin-bottom: 10px
        width: 300px
</style>