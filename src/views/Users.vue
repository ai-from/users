<template>
  <div class="users">

    <h1>Добро пожаловать, {{ adminName }}</h1>

    <v-input
      v-model="search"
      @input="updateData"
      id="search"
      label="Поиск"
      class="users__search"
    />

    <v-button
      text="Создать нового"
      @click="newUser"
      class="add-user"
    />

    <div class="users-adding" v-if="isAdding">

      <v-input
        v-model="newName"
        label="Имя:"
        class="users-adding__input"
      />

      <v-input
        v-model="newPosition"
        label="Позиция:"
        class="users-adding__input"
      />
      <v-button text="Добавить" @click="addUser" />
    </div>

    <div class="users__title">Пользователи:</div>

    <v-user
      v-for="(user, index) in users"
      :key="index"
      :user="user"
      @updateData="updateData"/>
    <div
      v-if="this.users.length === 0"
      class="users-no-items"
    >
      Совпадений не найдено
    </div>

    <v-button
      text="Выйти"
      @click="logout"
    />

  </div>
</template>

<script>
  import CONSTS from '@/utils/vars'
  import axios from 'axios'
  import User from '@/components/User'
  import Button from '@/components/Button'
  import Input from '@/components/Input'
  export default {
    name: 'Users',
    components: {
      'v-user': User,
      'v-button': Button,
      'v-input': Input
    },
    data: () => ({
      users: [],
      search: '',
      isAdding: false,
      newName: '',
      newPosition: '',
      adminName: ''
    }),
    mounted() {
      this.updateData()
      this.adminName = localStorage.getItem('adminName')

    },
    methods: {
      updateData() {
        axios.get(`${CONSTS.API_URL}/contacts`)
          .then(res => this.users = res.data.sort().reverse().filter(item => item.name.includes(this.search) || item.position.includes(this.search)))
      },
      cleanFields() {
        this.newName = ''
        this.newPosition = ''
      },
      newUser() {
        this.isAdding = !this.isAdding
        this.cleanFields()
      },
      addUser() {
        this.isAdding = false
        if(this.newName !== '' && this.newPosition !== '') {
          const newUser = {
            id: this.users.length + 1,
            name: this.newName,
            position: this.newPosition
          }
          axios.post(`${CONSTS.API_URL}/contacts`, newUser)
          .then(() => this.updateData())
        } else {
          // error
          return false
        }
      },
      logout() {
        localStorage.clear()
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="sass">
  .users
    padding: 20px
    .add-user
      margin-bottom: 20px
    &__title
      color: $blue
      margin-bottom: 20px
      font-size: 1.8rem
    &__search
      margin-bottom: 20px
    &-no-items
      margin: 20px 0
      color: $error
    &-adding
      margin-bottom: 20px
      &__input
        width: 300px
        margin: 10px 0

</style>