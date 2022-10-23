<template>
    <div>
        <div>
             <h3>На счете</h3>
            <transition-group name="account-list">
                <account-info 
                v-for="useraccount in searchedUserAccount"
                v-bind:useraccount="useraccount"
                v-bind:key="useraccount.id"
                @refill="createUserAccount" 
                />
            </transition-group>
        </div>
    </div>
</template>
  
  <script>
  import AccountInfo from '../components/AccountInfo.vue'
  export default {
      name: 'UsersAccount',
      components: {
        AccountInfo,
      },
      data () {
          return {
              useraccounts: [],
          }
      },
      methods: {
          async getUserAccounts() {
            this.$store.dispatch('getUserAccounts')
            this.useraccounts = this.$store.state.useraccounts
          },
        
          async createUserAccount(useraccount) {
              this.$store.dispatch('saveUserAccount', useraccount)
              this.$store.dispatch('getUserAccounts')
              this.usersaccounts = this.$store.state.useraccounts    
          },
  
          async removeUserAccount(useraccount) {
              this.$store.dispatch('deleteUserAccount', useraccount)
              this.$store.dispatch('getUserAccounts')
              this.useraccounts = this.$store.state.useraccounts
          },
          
      },
  
      mounted() {
        this.useraccounts = this.$store.state.useraccounts
      },
      
      computed: {
        searchedUserAccount() {
            return this.useraccounts.filter(useraccount => useraccount.logname.includes(this.$store.getters.getMainUserLogname))
          }
      },
    }  
  
  </script>
  
  
  <style scoped>
  
  </style>
