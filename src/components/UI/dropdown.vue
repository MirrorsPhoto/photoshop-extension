<template>

  <!-- Поле select с поиском -->

  <field-input
    ref="search"
    v-model="search"
    :label="label"
    :width="width"
    :placeholder="selected"
    :disabled="disabled || options.length === 1"
    :autofocus="autofocus"
    @focus="openList"
    @blur="closeList"
    @keydown="onKeyDown"
    >

    <!-- Расширяем поле input через slots -->

    <!-- Стрелка -->
    <span
      v-if="options.length > 1"
      :class="['arrow', { active_arrow: showList }]"
    ></span>

    <!-- Dropdown -->
    <ul ref="list" v-if="showList">
      <li
        v-for="(option, i) in filteredOptions" :key="i"
        v-text="option"
        :class="{ active_item: i === focusIndex }"
        @mouseover="setFocusOption(i, $event)"
        @mousedown="select(option)"
      ></li>
      <li v-if="options.length && !filteredOptions.length">Не найдено...</li>
    </ul>

  </field-input>

</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    autoSelect: { // Автоматический выбор первой опции
      type: Boolean,
      default: true
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      selected: '',
      showList: false,
      focusIndex: 0
    }
  },
  watch: {
    options(options) {
      if (this.autoSelect) {
        this.select(options[0] || '')
      }
    },
    search(value) {
      value && this.$emit('search', value)
    }
  },
  computed: {
    filteredOptions() {
      if (!this.options.length) return []
      const s = this.search.toLowerCase()
      return this.options.filter(o => o.toLowerCase().indexOf(s) !== -1)
    }
  },
  methods: {
    setSearch(value) {
      if (value !== this.search) {
        this.search = value
      }
    },
    select(value) {
      this.selected = value
      this.setSearch(value)
      this.$emit('input', value)
      this.showList && this.$refs.search.$refs.input.blur()
    },
    onKeyDown(e) {
      switch (e.keyCode) {
        case 40: // down
          e.preventDefault()
          this.setFocusOption(this.focusIndex + 1)
          break
        case 38: // up
          e.preventDefault()
          this.setFocusOption(this.focusIndex - 1)
          break
        case 13: // enter
          e.preventDefault()
          this.select(this.filteredOptions[this.focusIndex])
          break
      }
    },
    openList() {
      this.showList = true
      this.focusIndex = 0
      this.setSearch('')  // При открытии очищаем поле
    },
    closeList() {
      this.showList = false
      this.setSearch(this.selected)  // Если при закрытии опция не выбрана - вставляем в поле предыдущее выбранное значение
    },
    // При нажатиях клавиш down/up и наведении мыши выделяем опцию и прокручиваем список
    setFocusOption(i, e) {
      if (this.filteredOptions[i]) {
        // Если смена активной опции вызвана мышью - не скроллим
        !e && (this.$refs.list.scrollTop = i > 2 ? (i - 2) * 32 : 0)
        this.focusIndex = i
      }
    }
  },
  mounted() {
    if (this.autoSelect) {
      this.select(this.options[0] || '')
    }
  },
  components: {
    fieldInput: require('./field.vue')
  }
}
</script>

<style lang="sass" scoped>
@import '../../styles_config'
.arrow
  display: block
  width: 0
  height: 0
  border: 4px solid transparent
  border-top-color: $hard
  position: absolute
  top: 20px
  right: 5px
  z-index: 0
  &.active_arrow
    transform: rotate(-180deg)
    transform-origin: 50% 25%
ul
  list-style: none
  background: #fff
  min-width: 100%
  max-width: 200%
  max-height: 155px
  box-shadow: 2px 2px 5px rgba(0, 0, 0, .2)
  font-size: 14px
  position: absolute
  top: 40px
  left: 0
  overflow-y: auto
  z-index: 3
  & li
    padding: 0 10px 0 15px
    color: #333
    line-height: 30px
    overflow-x: hidden
    white-space: nowrap
    text-overflow: ellipsis
    cursor: pointer
    &.active_item
      background: $light
    & + li
      border-top: 1px solid $light
</style>
