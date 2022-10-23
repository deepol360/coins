<template>
    <form @submit.prevent>
      <h4>Пополнение счета</h4>
      <my-input
        v-model="useraccount.cost"
        type="text"
        placeholder="Сумма пополнения"
      />

      <my-button @click="createCoin">Создать</my-button>
    </form>
  </template>
  
  <script>
  export default {
      props: {
        
      },
        data() {
          return {
              useraccount: {
                  logname: '',
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