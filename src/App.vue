<template>
  <div class="wrapper">
    <component
      :is="page"
      @login="login"
      @logout="logout"
    ></component>
  </div>
</template>

<script>
import auth from './components/pages/Auth.vue';
import index from './components/pages/Index.vue';

export default {
  components: { auth, index },

  data() {
    return {
      page: ''
    }
  },

  methods: {
    login(token) {
      localStorage.setItem('token', token);
      this.page = 'index';
    },
    logout() {
      localStorage.removeItem('token');
      this.page = 'auth';
    }
  },

  created() {
    //this.page = localStorage.getItem('token') ? 'index' : 'auth';
    //Force index page
    this.page = 'index';
  }
}
</script>

<style lang="sass">
*
  font-family: sans-serif
  -webkit-font-smoothing: antialiased
  color: #333
  margin: 0
  padding: 0
  box-sizing: border-box
  font-size: 16px

body
  background: #fff

.wrapper
  display: flex
  align-items: center
  justify-content: center

  & > *
    width: 350px
    padding: 20px 30px
    position: relative
    color: #fff
    background: transparent

</style>
