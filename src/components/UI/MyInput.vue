<template>
    <input v-bind:value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
   name: 'my-input',
   props: {
    modelValue: [String, Number]
   },
   methods: {
    updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
    }
   } 
}
</script>

<style scoped>
.input {
  width: 90%;
  border: 3px solid yellowgreen;
  padding: 10px;
  margin: 5px;
 }
</style>