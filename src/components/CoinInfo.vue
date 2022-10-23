<template>
    <div class="coininfo">
      <div         
        class="coin"
        :class="{
          'status-coin':  coin.status === 'available'
        }"
      >
        <div><strong>ID:</strong> {{ coin.id }}</div>
        <div><strong>status:</strong> {{ coin.status }}</div>
        <div><strong>cost:</strong> {{ coin.cost }}</div>
        <div><strong>createdate:</strong> {{ coin.createdate }}</div>
      </div>
      <div>
        <my-button v-if="this.$store.getters.getMainUserRole === 'admin'" @click="$emit('remove', coin)">Удалить монету</my-button>
        <my-button v-if="this.$store.getters.getMainUserRole === 'user'" @click="$emit('purchase', coin)">Купить монету</my-button>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        coin: {
            type:  Object,
            required:   true
        }
    }
}

</script>

<style scoped>
.coininfo {
  padding: 15px;
  border: 5px solid red;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.coininfo_btn {
  margin-top: 5px;
  align-self: center;
  padding: 10px 15px;
  background: red;
  color: aliceblue;
  border: 2px solid salmon;
}

.coin {
  border: 1px solid black;
  padding: 5px;
  
}

.status-coin {
  border: 2px solid green;
}

</style>