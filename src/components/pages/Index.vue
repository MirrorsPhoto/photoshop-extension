<template>
  <div>
    <dropdown
      label="Размер"
      v-model="size"
      :options="sizes"
    ></dropdown>

    <dropdown
      label="Кол-во фото"
      v-model="count"
      :options="counts"
    ></dropdown>

    <div class="options">
      <checkbox
        label="Рамка"
        v-model="options.isBorder"
      />
      <checkbox
        label="Логотип"
        v-model="options.isLogo"
      />
      <checkbox
        label="Дата"
        v-model="options.isDate"
      />
    </div>

    <button
      class="render-btn"
      @click="render"
    >Применить</button>

    <button
      class="render-btn"
      @click="removeBackground"
    >Убрать фон</button>

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
import Axios from 'axios'

export default {
  components: { 
    dropdown: () => import('../UI/dropdown.vue'),
    checkbox: () => import('../UI/checkbox.vue') 
  },
  data() {
    return {
      options: {
        isBorder: true,
        isLogo: true,
        isDate: true
      },
      photoData: [
        {
          "width": 2.5,
          "height": 3,
          "variations": [
            {
              "id": 1,
              "count": 4,
              "price": 100
            }
          ]
        },
        {
          "width": 3,
          "height": 4,
          "variations": [
            {
              "id": 2,
              "count": 4,
              "price": 100
            },
            {
              "id": 3,
              "count": 6,
              "price": 140
            }
          ]
        },
        {
          "width": 3.6,
          "height": 4.6,
          "variations": [
            {
              "id": 11,
              "count": 2,
              "price": 60
            },
            {
              "id": 13,
              "count": 4,
              "price": 120
            }
          ]
        },
        {
          "width": 4,
          "height": 6,
          "variations": [
            {
              "id": 4,
              "count": 2,
              "price": 100
            }
          ]
        },
        {
          "width": 5,
          "height": 5,
          "variations": [
            {
              "id": 5,
              "count": 2,
              "price": 120
            }
          ]
        },
        {
          "width": 9,
          "height": 12,
          "variations": [
            {
              "id": 6,
              "count": 1,
              "price": 120
            }
          ]
        },
        {
          "width": 10,
          "height": 15,
          "variations": [
            {
              "id": 7,
              "count": 1,
              "price": 120
            }
          ]
        },
        {
          "width": 3.5,
          "height": 4.5,
          "variations": [
            {
              "id": 15,
              "count": 4,
              "price": 120
            },
            {
              "id": 17,
              "count": 2,
              "price": 60
            }
          ]
        },
        {
          "width": 21,
          "height": 30,
          "variations": [
            {
              "id": 8,
              "count": 1,
              "price": 50
            }
          ]
        },
        {
          "width": 15,
          "height": 21,
          "variations": [
            {
              "id": 9,
              "count": 1,
              "price": 25
            }
          ]
        }
      ],
      count: null,
      size: null,
      errorMessages: []
    }
  },

  computed: {
    sizes() {
      return this.photoData.sort((a, b) => a.width - b.width).map(this.sizeToString)
    },
    counts() {
      return Object
        .values(this.selectedSizeData.variations || {})
        .map(({ count }) => String(count))
        .sort((a, b) => a - b)
    },
    selectedSizeData() {
      const { sizes, size } = this
      return sizes.length && size
        ? this.photoData[sizes.indexOf(size)]
        : {}
    }
  },

  methods: {
    render() {
      this.errorMessages.splice(0)

      const [width, height] = this.size.split('x').map(Number)
      const count = Number(this.count)
      const { isBorder, isLogo, isDate, isRemoveBackground } = this.options
      const argsStr = [width, height, count, isBorder, isLogo, isDate].join(', ')

      new CSInterface().evalScript(`render(${argsStr})`, result => {
        if (result !== 'false') {
          this.$socket.send(JSON.stringify({ width, height, count }))
        }
      })
    },
    getSizes() {
      this.$http.get('photo/size')
        .then(res => this.photoData = res.data.response.sort((a, b) => a.width - b.width))
    },
    sizeToString(size) {
      return size.width + 'x' + size.height
    },
    removeBackground() {
      new CSInterface().evalScript(`getDocumentSource()`, source => {
        var imageData = eval(source).toString()

        Axios({
          method: 'post',
          url: 'https://api.remove.bg/v1.0/removebg',
          data: {
            image_file_b64: cep.encoding.convertion.binary_to_b64(imageData)
          },
          headers: {
            'X-Api-Key': 'cXk4C88k73yxG3aBXUHMsAnF',
            'Accept': 'application/json'
          }
        })
        .then(({ data }) => {
            new CSInterface().evalScript(`getTempPath()`, tempPath => {
              let path = `${tempPath}/${Date.now()}.png`
              
              window.cep.fs.writeFile(path, data.data.result_b64, cep.encoding.Base64)
              
              new CSInterface().evalScript(`replaceImage('${path}')`)
            })
        })
      })
    }
  },

  created() {
    this.getSizes()
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
  transition: all .3s ease

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

.options
  margin-bottom: 30px

</style>
