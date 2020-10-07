<template>
  <div class="auth">
    <div class="auth-modal">
      <div class="auth-modal__title">Авторизация</div>

      <v-input
        id="login"
        v-model="login"
        label="Логин:"
        class="auth-modal__input"
      />

      <v-input
        id="password"
        v-model="password"
        label="Пароль:"
        type="password"
        @keyup.enter.native="checkAdmin"
        class="auth-modal__input"
      />

      <v-button
        text="Войти"
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
        localStorage.setItem('auth', 'true')
        localStorage.setItem('adminName', this.adminName)
        this.$router.push('/users')
      }
      else return false
    }
  }
}
</script>

<style lang="sass">
  .auth
    display: grid
    min-height: 100vh
    &-modal
      margin: auto
      border: 1px solid $grey
      padding: 25px
      width: 300px
      &__title
        font-size: 1.8rem
        color: $blue
        margin-bottom: 16px
        text-align: center
      &__input
        margin-bottom: 20px
        width: 100%
</style>
