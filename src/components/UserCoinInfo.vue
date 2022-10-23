<template>
    <div class="coininfo">
      <div class="coin">
        <div><strong>ID:</strong> {{ usercoin.id }}</div>
        <div><strong>cost:</strong> {{ usercoin.cost }}</div>
        <div><strong>coinid:</strong> {{ usercoin.coinid }}</div>
      </div>
      <div>
        <my-button @click="$emit('sale', usercoin)">Продать монету</my-button>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        usercoin: {
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