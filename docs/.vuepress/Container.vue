<template>
    <div :key="key" class="main-contaienr">
        <button @click="changeKey" class="restart">restart</button>
        <slot></slot>
    </div>
</template>
<script>
export default {
  data() {
    return {
      key: 0
    }
  },
  methods: {
    changeKey() {
      this.key++
    }
  }
}
</script>
<style scoped>
.main-contaienr {
  position: relative;
  border: 1px solid #afafaf;
  border-radius: 10px;
}
.restart {
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}
</style>

