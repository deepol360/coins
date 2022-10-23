<template>
    <form @submit.prevent>
      <h4>Добавление пользователя</h4>
      
      <my-input v-for="n in this.$store.getters.getUserDims"
        v-bind:key="this.$store.getters.getUserDimsById(n).id"
        v-model=this.$store.getters.getUserDimsById(n).idfield
        type="text"
        placeholder="описатка"
      />
     
     <!-- 
      <my-input v-model='this.$store.state.userdim[1].id'
        type="text"
        placeholder=this.$store.state.userdim[1].description
      />
      <my-input v-model='this.$store.state.userdim[2].id'
        type="text"
        placeholder=this.$store.state.userdim[2].description
      />
      -->
      <my-button @click="createUser">Добавить</my-button>
    </form>
  </template>
  
  <script>
  export default {
      data() {
          return {
              user: {
                  role: '',
                  logname:  '',
                  password: '',
                  fio: ''
              }
          }
      },
      methods: {
          createUser() {
          this.$emit('create', this.user)
          this.user = {
              role: '',
              logname: '',
              password: '',
              fio: ''
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
  
  
  
  .btn {
    margin-top: 5px;
    align-self: center;
    padding: 10px 15px;
    background: blue;
    color: aliceblue;
    border: 2px solid salmon;
  }
  </style>