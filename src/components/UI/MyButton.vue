<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>

.btn_del{
  padding: 10px 15px;
  background: blue;
  color: aliceblue;
  border: 2px solid salmon;
}
</style>