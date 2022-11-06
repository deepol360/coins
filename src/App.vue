<template>
  <my-auth v-model:show="dialogVisible">
    <auth-form  @auth='authUser'/>
  </my-auth>
  
  <div class="flex flex-row bg-amber-100">  
    <div class="bg-amber-400 w-1/5 h-screen "> 
    
      <div class="bg-gray-500 text-white">
        <div v-if="autorization">
          Добро пожаловать, <br> {{ this.$store.getters.getMainUserFio }}  
        </div>
        <div v-else>
          Авторизуйтесь перед началом работы
        </div>
      </div>  
      <nav class="grid grid-cols-1 gap-4 justify-items-center">
        <router-link class=""
          :class="{'bg-amber-500':  this.$route.name === 'home'}" 
          to="/"
        >Главная
        </router-link>
        <router-link class=""
          :class="{'bg-amber-500':  this.$route.name === 'coins'}" 
          to="/coins"
        >Монеты
        </router-link>
        <router-link class=""
          :class="{'bg-amber-500':  this.$route.name === 'usertable'}" 
          to="/usertable"
        >Пользователи
        </router-link>
        <router-link class=""
          :class="{'bg-amber-500':  this.$route.name === 'useraccounts'}" 
          to="/useraccount"
        >Кошелек
        </router-link>
        <router-link class=""
          :class="{'bg-amber-500':  this.$route.name === 'usercoins'}" 
          to="/usercoins"
        >Мои монеты
        </router-link>
      </nav>
    </div>
    
    <div class="w-4/5 h-screen">
        <router-view v-if="autorization"/>
        <div v-else>Неизвестный пользователь</div>
    </div>
    
  </div>
  
</template>

<script>
import AuthForm from './components/AuthForm.vue'
import UserInfo from './components/UserInfo.vue'

export default {
  components: {
    AuthForm,
    UserInfo
  },
  data() {
    return {
      mainUser: {
        role: '',
        logname: '',
        fio: ''
      },
      autorization: false,
      dialogVisible: true,
    }
  },
  methods: {
        authUser(authInfo) {
          for (let i = 0; i < Object.keys(this.users).length; i++) {
            console.log(this.users[i].logname);
            if (authInfo.password === this.users[i].password) {
              this.mainUser.role = this.users[i].role
              this.mainUser.logname = this.users[i].logname
              this.mainUser.fio = this.users[i].fio
              this.dialogVisible = false
              this.autorization = true
            } 
          }
          this.$store.state.mainUser = this.mainUser
          this.$store.state.authorization = this.autorization
        }
  },
  created() {
    console.log(this.$route);
    
    this.$store.dispatch('getUsers');
    this.$store.dispatch('getCoins');
    this.$store.dispatch('getTrades');
    this.$store.dispatch('getUserCoins');
    this.$store.dispatch('getUserAccounts');
  },

  computed: {
      users() {
        return this.$store.state.users
      }
  }  



}
</script>


<!--
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

d_nav {
  padding: 30px;
}

d_nav a {
  font-weight: bold;
  color: #2c3e50;
}

d_nav a.router-link-exact-active {
  color: #42b983;
}

.naviflex {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.menu {
  padding: 10px;
  background: gold;
  border-radius: 5px;
  width: 10%;  
}


.page {
  display: flex;
}
</style>
-->
