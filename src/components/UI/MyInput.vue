<template>
    <input 
        class="border-2 border-amber-900 rounded p-2 my-0.5 w-full"
        v-bind:value="modelValue" @input="updateInput" type="text"
    >
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

</style>