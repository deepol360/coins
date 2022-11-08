<template>
    <div class="flex flex-col">
        <div class="flex flex-row" v-if="this.$store.getters.getMainUserRole === 'admin'">
            <my-button class="m-2 border-2 border-black-500 rounded-lg " @click="showDialog">Создать монету/Обновить стоимость</my-button>
            <my-select class="m-2"
                v-model="selectedSearch"
                v-bind:options="searchOptions"        
            />
        </div>
    
        <my-dialog v-model:show="dialogVisible">
            <coin-form  
                @create='createCoin'
                @revaluate='revaluateCoins'
                @abortall='abortCoin'

            />
        </my-dialog>
 
        <div v-if="this.coins.length > 0">      
            <h3>Монеты</h3>
            <transition-group name="coin-list">
                <coin-info 
                    v-for="coin in searchedCoins"
                    v-bind:coin="coin"
                    v-bind:key="coin.id"
                    @remove="removeCoin"
                    @purchase="purchaseCoin" 
                />
            </transition-group>
        </div>
        <h3 v-else>Список монет пуст</h3>
    </div>  

</template>

<script>
import CoinInfo from '../components/CoinInfo.vue'
import CoinForm from '../components/CoinForm.vue'

export default {
    components: { 
      CoinInfo, 
      CoinForm,
    },
    name: 'Coins',
    data () {
        return {
            coins: [],
            dialogVisible: false,
            defaultCoin: {
              status: 'available',
              cost: 0,
              createdate: Date.now(),
            },
            selectedSearch: '',
            searchOptions: [
              {value: 'all', name: 'Все монеты'},
              {value: 'available', name: 'Доступные для продажи'},
              {value: 'sold', name: 'Проданные'}
            ]
        }
    },
    methods: {
        async getCoins() {
          this.$store.dispatch('getCoins')
          this.coins = this.$store.state.coins
        },
      
        async createCoin(coin) {
            this.$store.dispatch('saveCoin', coin);
            this.getCoins();
            this.dialogVisible = false;
        },
        async removeCoin(coin) {
            this.$store.dispatch('deleteCoin', coin);
            this.getCoins();
        },
        showDialog() {
          this.dialogVisible = true;
        },
        abortCoin() {
          this.dialogVisible = false;
        },
        async revaluateCoins(coin) {
            console.log(coin);
            alert(stop)
            this.$store.dispatch('revaluateCoin', coin);
            this.getCoins();
            this.dialogVisible = false;
        },
        async purchaseCoin(coin) {
            this.$store.dispatch('purchaseCoin', coin);
            this.getCoins();
            this.$store.dispatch('getTrades');
            this.$store.dispatch('getUserCoins');
            this.$store.dispatch('getUserAccounts');
        }

    },
    mounted() {
      this.getCoins()
      },
    
    computed: {
      searchedCoins() {
        if (this.$store.getters.getMainUserRole === 'user') {
            this.selectedSearch = 'available'
        }
        if (this.selectedSearch === 'all') {
          return this.coins
        } else {
          return this.coins.filter(coin => coin.status.includes(this.selectedSearch))
        }
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