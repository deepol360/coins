<template>
    <form @submit.prevent>
      <h4>Создание монеты/Обновление стоимости</h4>
      <my-input
        v-model="coin.cost"
        type="text"
        placeholder="Стоимость монеты"
      />

      <my-button @click="createCoin">Создать</my-button>
      <my-button @click="revaluateCoin">Обновить стоимость</my-button>
    </form>
  </template>
  
  <script>
  export default {
      data() {
          return {
              coin: {
                  status: '',
                  cost:  0,
                  createdate: ''
              }
          }
      },
      methods: {
          createCoin() {
            this.coin.status = 'available'
            this.coin.createdate = Date.now()
            this.$emit('create', this.coin)
            this.coin = {
                status: '',
                cost:  0,
                createdate: '',
            }
          },
          revaluateCoin() {
            this.coin.status = ''
            this.coin.createdate = Date.now()
            this.$emit('revaluate', this.coin)
            this.coin = {
                status: '',
                cost:  0,
                createdate: '',
            }
          }

       }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  
  
  
  .btn_del {
    margin-top: 5px;
    align-self: center;
    padding: 10px 15px;
    background: blue;
    color: aliceblue;
    border: 2px solid salmon;
  }
  </style>