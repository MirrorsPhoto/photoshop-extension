<template>
  <div class="checkbox" @click="isChecked = !isChecked">
    <input v-model="isChecked" type="checkbox" style="display: none" >
    <label>
      <span>
      </span>
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      value: Boolean,
      label: String
    },
    data: () => ({
      isChecked: false
    }),
    watch: {
      isChecked (val) {
        this.$emit('input', val)
      }
    },
    created () {
      this.isChecked = this.value
    }
  }
</script>

<style lang="css" scoped>
  .checkbox {
    height: 1em;
    padding: 1em 0em;
    cursor: pointer;
  }

  .checkbox:hover span:first-child {
    border-color: #e74c3c;
  }

  label {
    width: 50%;
    margin: auto;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
  }

  label span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }

  label span:first-child {
    position: relative;
    width: 1em;
    height: 1em;
    border-radius: 5px;
    transform: scale(1);
    vertical-align: middle;
    border: 2px solid #8d8d8d;
    transition: all 0.2s ease;
  }

  label span:first-child:before {
    content: "";
    width: 100%;
    height: 100%;
    background: #e74c3c;
    display: block;
    transform: scale(0);
    opacity: 1;
    border-radius: 50%;
  }

  label span:last-child {
    padding-left: 0.5em;
  }

  input:checked + label span:first-child {
    background: #e74c3c;
    border-color: #e74c3c;
    animation: wave 0.4s ease;
  }

  input:checked + label span:first-child:before {
    transform: scale(2.5);
    opacity: 0;
    transition: all 0.6s ease;
  }

  @-moz-keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }

  @-webkit-keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }

  @-o-keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }

  @keyframes wave {
    50% {
      transform: scale(0.9);
    }
  }
</style>
