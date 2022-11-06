<template>

      <div class="flex flex-row" >
        <div class="flex-initial w-64"><strong>currency:</strong> {{ useraccount.currency }}</div>
        <div class=""><strong>amount:</strong> {{ +useraccount.amount }}</div>
        <my-input class=""
            v-model="refillAmount"
            type="number"
            placeholder="Сумма пополнения"
        />
      </div>
      

        <my-button @click="refillAccount">Пополнить счет пользователя</my-button>


</template>

<script>
export default {
    data() {
        return {
            refillAmount: 0
        }
    },
    props: {
        useraccount: {
            type:  Object,
            required:   true
        }
    },
    methods: {
        refillAccount() {
            let acc1 = Number(this.useraccount.amount)
            let acc2 = Number(this.refillAmount)
            this.useraccount.amount = acc1 + acc2
            this.$emit('refill', this.useraccount)
            this.refillAmount = 0  
        }
    }
}

</script>

<style scoped>
.userinfo {
  padding: 1px;
  border: 1px solid black;
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.userinfo_btn {
  margin-top: 5px;
  align-self: center;
  padding: 10px 15px;
  background: red;
  color: aliceblue;
  border: 2px solid salmon;
}

.userflex {
  display: flex;
  justify-content: flex-start;
}

.flexitem {
  width: 20%;
  margin: 10px;
  padding: 5px;
  background: gray;
  border: 1px solid #FFF;
  align-self: stretch;
}
</style>