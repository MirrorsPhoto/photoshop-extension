<template>
  <div
    :style="{ width }"
    @mouseleave="addCloseTimer"
    @mouseenter="removeCloseTimer"
    >

    <input
      ref="input"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="off"
      @input="onInput"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @keydown="$emit('keydown', $event)"
      @keydown.escape="$refs.input.blur()"
    >

    <label
      v-text="label"
      :class="{ active: value }"
    ></label>

    <slot></slot>

  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: [Number, String],
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    value: {
      type: [Number, String],
      default: ''
    },
    numbersOnly: {
      type: Boolean,
      default: false
    },
    maxLen: {
      type: [Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timer: null
    }
  },
  methods: {
    onInput(e) {
      let { value } = e.target
      const { maxLen, numbersOnly } = this
      if (maxLen && value.length > maxLen) {
        value = value.substr(0, maxLen)
      }
      if (numbersOnly) {
        value = value.replace(/[^0-9]/g, '')
      }
      value = value.replace(/[.]/g, '')
      this.$refs.input.value = value
      this.$emit('input', value)
    },
    /**
     * Придумано СамБэком из Амвросиевки
     */
    // Задержка закрытия опций при убирании курсора с поля
    addCloseTimer() {
      this.timer = setTimeout(() => this.$refs.input.blur(), 500)
    },
    // Отменяем закрытие, если курсор наведен обратно
    removeCloseTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  },
  mounted() {
    this.autofocus && this.$refs.input.focus()
  }
}
</script>

<style lang="sass" scoped>
@import '../../styles_config'
div
  display: inline-block
  height: 40px
  margin-bottom: 20px
  line-height: 40px
  position: relative
  & > *
    cursor: pointer
  & input
    background: transparent
    width: 100%
    height: 40px
    padding: 17px 0 7px
    border: none
    border-bottom: 1px solid $medium
    outline: none
    font-size: 1em
    text-overflow: ellipsis
    transition: all .3s ease
    position: relative
    z-index: 1
    &:focus
      padding-bottom: 5px
      border-bottom: 2px solid $primary-color
    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
      -webkit-appearance: none
      margin: 0
  & label
    color: $hard
    line-height: 16px
    position: absolute
    top: 16px
    left: 0
    transition: .2s ease-out
    z-index: 0
  input:focus + label
    color: $primary-color
  input:focus + label, .active
    font-size: .8em
    position: absolute
    top: -2px
</style>
