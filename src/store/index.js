import idb from '@/api/idb'
import { createStore } from 'vuex'

export default createStore({
  state: {
    users: [],
    coins: [],
    trades: [],
    usercoins: [],
    useraccounts: [],
    countusers: 0,
    roles: [
      { value: 'admin', name: 'Администратор' },
      { value: 'user', name: 'Пользователь' }
    ],
    usersdims: [
      { id: 1, idfield: 'user.role',  description: 'Роль'},
      { id: 2, idfield: 'user.logname', description: 'Логин'},
      { id: 3, idfield: 'user.password', description: 'Пароль'},
      { id: 4, idfield: 'user.fio', description: 'ФИО'}
    ],
    defaultUser: {
      role: 'user',
      logname: 'user1',
      password: 'user123',
      fio: 'Иванов Иван'
    },
    defaultAdmin: {
      role: 'admin',
      logname: 'admin',
      password: 'admin123',
      fio: 'Администратор'
    },
    defaultUserAccount: {
      logname: 'user1',
      currency: 'USD',
      amount: 2000
    },
    mainUser: {
      role: '',
      logname: '',
      fio: ''
    },
    autorization: false,
    currentuseraccount: {
      type: Object
    },
    currenttrade: {
      type: Object
    },
    currentusercoin: {
      type: Object
    },
    menuItems: [
      {id: 1, role: 'all', item: 'Главная', name: 'home'},
      {id: 2, role: 'all', item: 'Монеты', name: 'coins'},
      {id: 3, role: 'admin', item: 'Пользователи', name: 'usertable'},
      {id: 4, role: 'user', item: 'Кошелек', name: 'useraccount'},
      {id: 5, role: 'user', item: 'Мои монеты', name: 'usercoins'}
    ]


  },
  getters: {
    getRoles(state) {
      return state.roles
    },
    getUserDims: state => {
      return state.usersdims.length
    },
    getUserDimsById: state => id =>{
      return state.usersdims.find(userdim => userdim.id === id )
    },
    getUsersByRole: state => role =>{
      return state.users.find(user => user.role === role)
    },
    getMainUserRole: state => {
      return state.mainUser.role
    },
    getMainUserLogname: state => {
      return state.mainUser.logname
    },
    getMainUserFio: state => {
      return state.mainUser.fio
    },
    getUserAccountId: state => logname => {
      return state.useraccounts.find(useraccount => useraccount.logname === logname)
    },
    getMenuItemsByRole: state => role => {
      return state.menuItems.filter(menuItem => menuItem.role === role || menuItem.role === 'all')
    }




  },
  mutations: {
  },
  actions: {
    async getUsers(context) {
      context.state.users = []
      let users = await idb.getUsers()
      users.forEach(c => {
        context.state.users.push(c)
        context.state.countusers++
        //console.log(context.state.countusers)
      });
      if (context.state.countusers === 0) {
        await idb.saveUser(JSON.parse(JSON.stringify(context.state.defaultAdmin)))
        await idb.saveUser(JSON.parse(JSON.stringify(context.state.defaultUser)))
        await idb.saveUserAccount(JSON.parse(JSON.stringify(context.state.defaultUserAccount)))
      }      
      //await idb.saveUserAccount(JSON.parse(JSON.stringify(context.state.defaultUserAccount)))
    },
    async saveUser(context,user) {
      await idb.saveUser(JSON.parse(JSON.stringify(user)))
    },
    async deleteUser(context,user) {
      await idb.deleteUser(user)
    },
    
    async getCoins(context) {
      context.state.coins = []
      let coins = await idb.getCoins()
      coins.forEach(c => {
        context.state.coins.push(c)
      });
    },
    async saveCoin(context,coin) {
      await idb.saveCoin(JSON.parse(JSON.stringify(coin)))
    },
    async deleteCoin(context,coin) {
      await idb.deleteUser(coin)
    },

    async getTrades(context) {
      context.state.trades = []
      let trades = await idb.getTrades()
      trades.forEach(c => {
        context.state.trades.push(c)
      });
    },
    async saveTrade(context,trade) {
      await idb.saveTrade(JSON.parse(JSON.stringify(trade)))
    },
    async deleteTrade(context,trade) {
      await idb.deleteTrade(trade)
    },

    async getUserCoins(context) {
      context.state.usercoins = []
      let usercoins = await idb.getUserCoins()
      usercoins.forEach(c => {
        context.state.usercoins.push(c)
      });
    },
    async saveUserCoin(context,usercoin) {
      await idb.saveUserCoin(JSON.parse(JSON.stringify(usercoin)))
    },
    async deleteUserCoin(context,usercoin) {
      await idb.deleteUserCoin(usercoin)
    },

    async getUserAccounts(context) {
      context.state.useraccounts = []
      let useraccounts = await idb.getUserAccounts()
      useraccounts.forEach(c => {
        context.state.useraccounts.push(c)
      });
    },
    async saveUserAccount(context,useraccount) {
      await idb.saveUserAccount(JSON.parse(JSON.stringify(useraccount)))
    },
    async deleteUserAccount(context,useraccount) {
      await idb.deleteUserAccount(useraccount)
    },
    //покупаем
    async purchaseCoin(context,coin) {
      coin.status = 'sold'
      
      //формируем монету в кошельке пользователя
      context.state.currentusercoin.logname = context.state.mainUser.logname
      context.state.currentusercoin.coinid = coin.createdate
      context.state.currentusercoin.cost = coin.cost
      
      context.state.currentuseraccount = context.state.useraccounts.filter(useraccount => useraccount.logname.includes(context.state.mainUser.logname))
      //со счета спишется стоимость монеты
      let s1 = Number(context.state.currentuseraccount.amount)
      let s2 = Number(coin.cost)
      context.state.currentuseraccount.amount = s1 - s2  //надо бы и валюту покупки учитывать

      //запоминаем транзакцию для отчетности
      context.state.currenttrade.date = Date.now()
      context.state.currenttrade.logname = context.state.mainUser.logname
      context.state.currenttrade.coinid = coin.createdate
      context.state.currenttrade.type = 'purchase'
      context.state.currenttrade.cost = coin.cost

      //по идее, надо отслеживать успешность транзакций на каждом шаге и откатывать все при неуспехе.
      await idb.saveTrade(JSON.parse(JSON.stringify(context.state.currenttrade)))
      await idb.saveUserAccount(JSON.parse(JSON.stringify(context.state.currentuseraccount)))
      await idb.saveUserCoin(JSON.parse(JSON.stringify(context.state.currentusercoin)))
      await idb.saveCoin(JSON.parse(JSON.stringify(coin)))
    },
    //продаем. Перечень монет, доступных для продажи, формируем в приложении
    async saleCoin(context,coin) {
      coin.status = 'avaliable'
            
      //для удаления монеты из кошелька
      context.state.currentusercoin.logname = context.state.mainUser.logname
      context.state.currentusercoin.coinid = coin.createdate
      context.state.currentusercoin.cost = coin.cost
      
      context.state.currentuseraccount = context.state.useraccounts.filter(useraccount => useraccount.logname.includes(context.state.mainUser.logname))
      //на счет зачислится текущая стоимость монеты
      let s1 = Number(context.state.currentuseraccount.amount)
      let s2 = Number(coin.cost)
      context.state.currentuseraccount.amount = s1 + s2

      //запоминаем транзакцию
      context.state.currenttrade.date = Date.now()
      context.state.currenttrade.logname = context.state.mainUser.logname
      context.state.currenttrade.coinid = coin.createdate
      context.state.currenttrade.type = 'sale'
      context.state.currenttrade.cost = coin.cost

      //по идее, надо отслеживать успешность транзакций на каждом шаге и откатывать все при неуспехе.
      await idb.saveTrade(JSON.parse(JSON.stringify(context.state.currenttrade)))
      await idb.saveUserAccount(JSON.parse(JSON.stringify(context.state.currentuseraccount)))
      await idb.deleteUserCoin(context.state.currentusercoin)
      await idb.saveCoin(JSON.parse(JSON.stringify(coin)))

    },
    //переоцениваем монеты
    async revaluateCoin(context,coin) {
      //от полученной на вход монеты берем только стоимость и обновляем стоимость всех монет
      //проданные монеты находятся в usercoins, там же их цена покупки. Она не изменится
      console.log('count coins ', Object.keys(context.state.coins).length);
      for (let i = 0; i <= Object.keys(context.state.coins).length; i++) {
        console.log(i,  context.state.coins[i]);
        context.state.coins[i].cost = coin.cost;
        await idb.saveCoin(JSON.parse(JSON.stringify(context.state.coins[i])))
         
      }
    }




  },
  modules: {
  }
})
