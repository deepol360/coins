<template>
    <form @submit.prevent>
      <h4>Добавление пользователя</h4>
      <my-input
        v-model="user.role"
        type="text"
        placeholder="Роль"
      />
      <my-input
        v-model="user.logname"
        type="text"
        placeholder="Логин"
      />
      <my-input
        v-model="user.password"
        type="text"
        placeholder="Пароль"
      />
      <my-input
        v-model="user.fio"
        type="text"
        placeholder="ФИО"
      />

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
  
  
  
  .btn_del {
    margin-top: 5px;
    align-self: center;
    padding: 10px 15px;
    background: blue;
    color: aliceblue;
    border: 2px solid salmon;
  }
  </style>