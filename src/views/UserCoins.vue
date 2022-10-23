<template>
    <div>
        <div class="cointable">
            <h1>Мои монеты</h1>
        </div>
 
        <div v-if="this.usercoins.length > 0">      
            <transition-group name="coin-list">
                <user-coin-info 
                    v-for="usercoin in searchUserCoins"
                    v-bind:usercoin="usercoin"
                    v-bind:key="usercoin.id"
                    @sale="saleUserCoin"
                />
            </transition-group>
        </div>
        <h3 v-else>Список монет пуст</h3>
    
    <div>Доступно {{ this.coincount }} монет</div>
    <div>Баланс при продаже {{ this.coinbenefit }}</div>
    
    </div>  

</template>

<script>
import UserCoinInfo from '../components/UserCoinInfo.vue'

export default {
    components: { 
      UserCoinInfo, 
    },
    name: 'UserCoins',
    data () {
        return {
            usercoins: [],
            currentcoin: {
                type: Object
            },
            coincount: 0,
            coinbenefit: 0
        }
    },
    methods: {
        async getUserCoins() {
          this.$store.dispatch('getUserCoins')
          this.usercoins = this.$store.state.usercoins
        },
        async saleCoin(coin) {
            this.$store.dispatch('purchaseCoin', coin);
            this.getCoins();
            this.$store.dispatch('getTrades');
            this.$store.dispatch('getUserCoins');
            this.$store.dispatch('getUserAccounts');
        },
        saleUserCoin() {
            this.currentcoin = this.$store.state.coins.filter(coin => coin.createdate.includes(this.usercoin.coinid))
            saleCoin(this.currentcoin)
        },
        calcParams() {
            console.log('before');
            console.log(this.$store.state.usercoins);

            for (let i = 0; i < this.$store.state.usercoins.filter(usercoin => usercoin.logname.includes(this.$store.getters.getMainUserLogname)).length; i++) {
                console.log('for');
                console.log(this.$store.state.usercoins.filter(usercoin => usercoin.logname.includes(this.$store.getters.getMainUserLogname)).length);
                this.coincount += 1
                this.currentcoin = this.$store.state.coins.filter(coin => coin.createdate.includes(this.$store.state.usercoins.filter(usercoin => usercoin.logname.includes(this.$store.getters.getMainUserLogname))[i].coinid))
                let s1 = Number(this.currentcoin.cost)
                let s2 = Number(this.$store.state.usercoins.filter(usercoin => usercoin.logname.includes(this.$store.getters.getMainUserLogname))[i].cost)
                let s3 = Number(this.coinbenefit)
                this.coinbenefit = s3 + s1 - s2
            }
        }

    },
    mounted() {
      this.getUserCoins()
      console.log('mounted');
      this.calcParams()
    },
    
    computed: {
        searchUserCoins() {
            return this.$store.state.usercoins.filter(usercoin => usercoin.logname.includes(this.$store.getters.getMainUserLogname))
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

</style>
-->