<template>
    <form @submit.prevent>
      <h4>Авторизация</h4>
      <my-input
        v-model="authInfo.logname"
        type="text"
        placeholder="Логин"
      />
      <my-input
        v-model="authInfo.password"
        type="password"
        placeholder="Пароль"
      />

      <my-button @click="authUser">Войти</my-button>
    </form>
  </template>
  
  <script>
  export default {
      data() {
          return {
                authInfo: {
                    logname:  '',
                    password: '',
                }    
            }
        },
      methods: {
          authUser() {
              this.$emit('auth', this.authInfo)
              this.authInfo = {
                logname: '',
                password: '',
              }
               
          }
      }
    }  
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