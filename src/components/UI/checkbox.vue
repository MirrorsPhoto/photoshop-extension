<template>
  <div class="checkbox" @click="isChecked = !isChecked">
    <input v-model="isChecked" type="checkbox" style="display: none" >
    <label>
      <span>
        <svg width="12px" height="10px" viewbox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
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
    height: 3.7em;
    padding: 1em 0.5em;
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
    width: 1.8em;
    height: 1.8em;
    border-radius: 5px;
    transform: scale(1);
    vertical-align: middle;
    border: 2px solid #8d8d8d;
    transition: all 0.2s ease;
  }

  label span:first-child svg {
    position: absolute;
    top: 9px;
    left: 6px;
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0) scale(1.4);
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
    padding-left: 1em;
  }

  input:checked + label span:first-child {
    background: #e74c3c;
    border-color: #e74c3c;
    animation: wave 0.4s ease;
  }

  input:checked + label span:first-child svg {
    stroke-dashoffset: 0;
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
