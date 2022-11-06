<template>
    <div class="flex flex-row">
      <div         
        class="flex flex-row bg-yellow-200 p-2 m-2"
        :class="{
          'flex flex-row bg-green-100 p-2 m-2 ':  coin.status === 'available'
        }"
      >
        <div class="m-2 border-3 border-green-600">
          <img class="object contain h-6 w-6" src="../assets/coin.png" alt="coin">
        </div>
        <div class="m-2" v-if="this.$store.getters.getMainUserRole === 'admin'">
          <strong>ID:</strong> {{ coin.id }}
        </div>
        <div class="m-2"><strong>status:</strong> {{ coin.status }}</div>
        <div class="m-2"><strong>cost:</strong> {{ coin.cost }}</div>
        <div class="m-2" v-if="this.$store.getters.getMainUserRole === 'admin'">
          <strong>createdate:</strong> {{ coin.createdate }}
        </div>
      </div>
      <div class="p-2 m-2">
        <my-button 
          v-if="this.$store.getters.getMainUserRole === 'admin'" @click="$emit('remove', coin)"
          >Удалить монету
        </my-button>
        <my-button 
          class="bg-gold-500 rounded-lg"
          v-if="this.$store.getters.getMainUserRole === 'user'" @click="$emit('purchase', coin)"
          >Купить монету
        </my-button>
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