<template>

<div :style="{ width }">

  <input
    ref="input"
    :disabled="disabled"
    :type="type"
    :value="value || ''"
    @input="$emit('input', $event.target.value)"
    autocomplete="off"
  >

  <label
    @click="$refs.input.focus()"
    :class="{ active : !!value  }">
    {{ placeholder }}
  </label>

</div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
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
    value: {
      type: [Number, String],
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.autofocus) this.$refs.input.focus();
  }
}
</script>

<style lang="sass" scoped>
@import "../../styles_config.sass"

div
  position: relative
  height: 40px
  line-height: 40px
  display: inline-block

input
  border: none
  box-shadow: none
  border-bottom: 1px solid $medium
  outline: none
  width: 100%
  background: transparent
  padding: 17px 0 7px
  height: 40px
  transition: all .3s ease
  text-overflow: ellipsis

  &:focus
    padding: 17px 0 6px
    border-bottom: 2px solid $primary-color

  &:disabled
    color: $hard
    & + label
      opacity: .5
      cursor: default

label
  top: 16px
  line-height: 16px
  color: $hard
  position: absolute
  left: 0
  cursor: text
  transition: .2s ease-out

input:focus + label
  color: $primary-color

input:focus + label, .active
  font-size: .8em
  position: absolute
  top: -2px
  cursor: text

</style>