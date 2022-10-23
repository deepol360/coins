const DB_NAME = 'exchange-base'
const DB_VERSION = 5
let DB

export default {
	async getDb() {
		return new Promise((resolve, reject) => {
			if (DB) { 
				return resolve(DB)
			}
			console.log('OPENING DB', DB)
			let request = window.indexedDB.open(DB_NAME, DB_VERSION + 1)
			//let request = window.indexedDB.open(DB_NAME, DB_VERSION)
			request.onerror = e => {
				console.log('Error opening db', e)
				reject('Error')
			}
			request.onsuccess = e => {
				DB = e.target.result
				resolve(DB)
			}
			request.onupgradeneeded = e => {
				console.log('onupgradeneeded')
				let db = e.target.result
				console.log(e.oldVersion);
				if(e.oldVersion < 1) {
					db.createObjectStore("users", { autoIncrement: true, keyPath:'id' });
					db.createObjectStore("coins", { autoIncrement: true, keyPath:'id' });
					db.createObjectStore("trades", { autoIncrement: true, keyPath:'id' });
					db.createObjectStore("usercoins", { autoIncrement: true, keyPath:'id' });
					db.createObjectStore("useraccounts", { autoIncrement: true, keyPath:'id' });
				}
				
			}
		})
	},
	async getUsers() {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['users'],'readonly')
			trans.oncomplete = () => {
				resolve(users)
			};
			let store = trans.objectStore('users')
			let users = []
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result
				if (cursor) {
					users.push(cursor.value)
					cursor.continue()
				}
			}
		})
	},
	async saveUser(user) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['users'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('users')
			store.put(user)
		})
	},
	async deleteUser(user) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['users'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('users')
			store.delete(user.id)
		})
	},
	
	async getCoins() {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['coins'],'readonly')
			trans.oncomplete = () => {
				resolve(coins)
			};
			let store = trans.objectStore('coins')
			let coins = []
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result
				if (cursor) {
					coins.push(cursor.value)
					cursor.continue()
				}
			}
		})
	},
	async saveCoin(coin) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['coins'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('coins')
			store.put(coin)
		})
	},
	async deleteCoin(coin) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['coins'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('coins')
			store.delete(coin.id)
		})
	},
	
	async getTrades() {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['trades'],'readonly')
			trans.oncomplete = () => {
				resolve(trades)
			};
			let store = trans.objectStore('trades')
			let trades = []
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result
				if (cursor) {
					trades.push(cursor.value)
					cursor.continue()
				}
			}
		})
	},
	async saveTrade(trade) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['trades'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('trades')
			store.put(trade)
		})
	},
	async deleteTrade(trade) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['trades'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('trades')
			store.delete(trade.id)
		})
	},
	
	async getUserCoins() {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['usercoins'],'readonly')
			trans.oncomplete = () => {
				resolve(usercoins)
			};
			let store = trans.objectStore('usercoins')
			let usercoins = []
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result
				if (cursor) {
					usercoins.push(cursor.value)
					cursor.continue()
				}
			}
		})
	},
	async saveUserCoin(usercoin) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['usercoins'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('usercoins')
			store.put(usercoin)
		})
	},
	async deleteUseCoin(usercoin) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['usercoins'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('usercoins')
			store.delete(usercoin.id)
		})
	},
	
	async getUserAccounts() {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['useraccounts'],'readonly')
			trans.oncomplete = () => {
				resolve(useraccounts)
			};
			let store = trans.objectStore('useraccounts')
			let useraccounts = []
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result
				if (cursor) {
					useraccounts.push(cursor.value)
					cursor.continue()
				}
			}
		})
	},
	async saveUserAccount(useraccount) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['useraccounts'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('useraccounts')
			store.put(useraccount)
		})
	},
	async deleteUserAccount(useraccount) {
		let db = await this.getDb()
		return new Promise(resolve => {
			let trans = db.transaction(['useraccounts'],'readwrite')
			trans.oncomplete = () => {
				resolve()
			}
			let store = trans.objectStore('useraccounts')
			store.delete(useaccount.id)
		})
	}	




}