<template>
  <div>
    <dropdown
      label="Размер"
      v-model="photoParams.size"
      :options="sizes"
    ></dropdown>

    <dropdown
      label="Кол-во фото"
      v-model="photoParams.count"
      :options="counts"
    ></dropdown>

    <button
      class="render-btn"
      @click="render"
    >Применить</button>

    <p>
      <span v-for="message in errorMessages" :key="message">{{ message }}<br></span>
    </p>

    <a
      href="#"
      class="logout-link"
      @click.prevent="$emit('logout')"
    >Выйти</a>
  </div>
</template>
<script>
import dropdown from '../UI/dropdown.vue';

const sizeToString = ({ width, height }) => width + 'x' + height;

export default {
  components: { dropdown },

  data() {
    return {
      sizesData: [],
      photoParams: {
        count: null,
        size: null
      },
      errorMessages: []
    }
  },

  computed: {
    sizes() {
      return this.sizesData.map(sizeToString);
    },
    counts() {
      const { size } = this.photoParams;



      if (size) {
        console.log({sizeToString, keys: Object.keys, find: this.sizesData.find });
        const { variations } = this.sizesData.find(item => size === sizeToString(item));
        return Object.keys(variations);
      } else {
        return [];
      }
    }
  },

  methods: {
    render() {
      this.errorMessages.splice(0);

      const [width, height] = this.photoParams.size.split('x').map(Number);
      const { count } = this.photoParams;

      (new CSInterface).evalScript(`render(${width}, ${height}, ${count})`);
      this.$socket.send(JSON.stringify({ width, height, count }));
    },
    getSizes() {
      this.$http.get('photo/size')
        .then(res => this.sizesData = res.data.response)
        .catch(error => this.errorMessages.push(error));
    }
  },

  created() {
    this.getSizes();
  }
}
</script>

<style lang="sass">
@import '../../styles_config.sass'

.render-btn
  display: block
  background: $primary-color
  width: 100%
  height: 50px
  margin: 10px auto
  color: #fff
  border: 0
  outline: 0
  cursor: pointer
  transition: all .3 ease

  &:hover
    background: darken($primary-color, 10%)

.logout-link
  display: block
  padding: 20px 0
  text-align: center
  text-decoration: none
  color: $hard

  &:hover
    color: $primary-color

</style>
