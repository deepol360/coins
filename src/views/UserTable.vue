<template>
  <div v-if="this.$store.getters.getMainUserRole === 'admin'">
    <div class="flex justify-center">
        <h1>Пользователи</h1>
    </div>

    <div>
      <div> <strong>Показать: </strong>
        <my-select 
          v-model="selectedSearch"
          v-bind:options="searchOptions"        
        />
      </div>
    </div>
    
    <my-dialog v-model:show="dialogVisible">
        <user-form  @create='createUser'/>
    </my-dialog>

    <div v-if="this.users.length > 0">      
        <h3 class="flex justify-center">Список пользователей</h3>
        <transition-group name="user-list">
            <user-info 
            v-for="user in searchedUsers"
            v-bind:user="user"
            v-bind:key="user.id"
            @remove="removeUser" 
            />
        </transition-group>
    </div>
    <h3 v-else>Список пользователей пуст</h3>

    <div>
      <my-button @click="showDialog">Создать пользователя</my-button>
    </div>
  </div>
  <div class="flex justify-center" v-else>
    Список пользователей недоступен
  </div>  


</template>

<script>
import UserInfo from '../components/UserInfo.vue'
import UserForm from '../components/UserForm.vue'


export default {
    components: { 
      UserInfo, 
      UserForm
    },
    name: 'Users',
    data () {
        return {
            users: [],
            dialogVisible: false,
            selectedSearch: '',
            searchOptions: [
              {value: 'all', name: 'Все пользователи'},
              {value: 'admin', name: 'Администратор'},
              {value: 'user', name: 'Пользователь'}
            ],
            addUserAccount: {
              logname: '',
              currency: 'USD',
              amount: 0
            },
            remUserAccount: {
              id: '',
              logname: '',
              currency: '',
              amount: 0
            }
        }
    },
    methods: {
        async getUsers() {
          this.$store.dispatch('getUsers')
          this.users = this.$store.state.users
          this.totalUsers = this.users.length
          console.log(this.totalUsers)
        },
      
        async createUser(user) {
            console.log(user.logname);
            this.addUserAccount.logname = user.logname
            this.$store.dispatch('saveUser', user)
            this.$store.dispatch('getUsers')
            this.users = this.$store.state.users
            this.$store.dispatch('saveUserAccount', this.addUserAccount)
            this.addUserAccount
        },
        async removeUser(user) {
            this.$store.dispatch('deleteUser', user)
            this.$store.dispatch('getUsers')
            this.users = this.$store.state.users
        },
        async getUserNumbers() {
          this.getUsers()

        },
        
        showDialog() {
        this.dialogVisible = true;
    },

    },
    mounted() {
      this.users = this.$store.state.users
      },
    
    computed: {
      searchedUsers() {
        if (this.selectedSearch === 'all') {
          return this.users
        } else {
          return this.users.filter(user => user.role.includes(this.selectedSearch))
        }
      },
      userNumbers() {
        return this.users.length
      }
    }  
}
</script>


<style scoped>

</style>
<!--
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 10px;
}
.user {
  padding: 15px;
  border: 5px solid red;
  margin: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  border: 3px solid yellowgreen;
  padding: 10px;
}

.btn_del {
  margin-top: 5px;
  align-self: center;
  padding: 10px 15px;
  background: gray;
  color: aliceblue;
  border: 2px solid salmon;
}

.app__btns {
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 5px;
  
}

.current-page {
  border: 2px solid red;
}
</style>
-->