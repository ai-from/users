<template>
  <div class="users">
    <div class="users__title">Users:</div>
    <br>
    Search:
    <v-input v-model="search" @input="updateData" />
    <br>
    <v-user
      v-for="(user, index) in users"
      :key="index"
      :user="user"
      @updateData="updateData"/>
    <div v-if="this.users.length === 0">
      No items
    </div>
    <v-button
      text="New User"
      @click="newUser"
    />

    <div class="adding" v-if="isAdding">
      Name:
      <v-input v-model="newName" />
      Position:
      <v-input v-model="newPosition" />
      <v-button text="Add" @click="addUser" />
    </div>

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
      newPosition: ''
    }),
    mounted() {
      this.updateData()
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
      }
    }
  }
</script>

<style lang="sass">

</style>