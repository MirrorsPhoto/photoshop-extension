<template>
  <div class="bg">
    <form @submit.prevent="auth">

      <field
        label="Логин"
        v-model="user.login"
        autofocus
      ></field>

      <field
        label="Пароль"
        type="password"
        v-model="user.password"
      ></field>

      <input type="submit">

      <p>
        <span v-for="message in errorMessages" :key="message">{{ message }}<br></span>
      </p>
    </form>
  </div>
</template>

<script>
import field from '../UI/field.vue';

export default {
  components: { field },
  data() {
    return {
      user: {
        login: '',
        password: ''
      },
      errorMessages: []
    }
  },
  watch: {
    user: {
      handler() {
        this.errorMessages.splice(0);
      },
      deep: true
    }
  },
  methods: {
    auth() {
      const { login, password } = this.user;

      if (!login || !password) {
        return this.errorMessages.push('Заполните все поля формы');
      }

      this.$http
        .post('login', { login, password })
        .then(res => this.$emit('login', res.data.response.token))
        .catch(error => this.errorMessages = JSON.parse(error.request.responseText).message);
    }
  }
}
</script>

<style lang="sass">
@import '../../styles_config.sass'

form
  & img
    width: 350px
    display: block
    margin: 0 -50px

  & div
    margin-top: 25px

  & [type="submit"]
    display: none

  & p
    text-align: center
    position: absolute
    left: 0
    right: 0
    top: 200px
    color: $primary-color

    & span
      color: inherit

</style>
