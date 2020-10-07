<template>
  <div class="auth">
    <div class="auth__modal">
      Auth<br>
      Enter your login:

      <v-input v-model="login" />

      Enter your password:

      <v-input v-model="password" type="password" @keyup.enter.native="checkAdmin" />

      <v-button
        text="Enter"
        @click="checkAdmin"
      ></v-button>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CONSTS from '@/utils/vars'
import axios from 'axios'
import Input from '@/components/Input'
import Button from '@/components/Button'

export default {
  name: 'Home',
  components: {
    'v-input': Input,
    'v-button': Button
  },
  data: () => ({
    login: '',
    password: '',
    adminName: '',
    adminPassword: ''
  }),
  mounted() {
    axios.get(`${CONSTS.API_URL}/admin/1`)
    .then(res => {
      this.adminName = res.data.name
      this.adminPassword = res.data.password
    })
  },
  methods: {
    checkAdmin() {
      if(this.login === this.adminName && this.password === this.adminPassword) {
        this.$store.dispatch('SET_ADMIN_TRUE')
        this.$router.push('/users')
      }
      else return false
    }
  }
}
</script>

<style lang="sass">
  .auth
    &__modal
      border: 1px solid black
</style>
