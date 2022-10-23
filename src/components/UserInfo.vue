<template>
    <div class="userinfo">
      <div class="userflex" >
        <div class="flexitem"><strong>ID:</strong> {{ user.id }}</div>
        <div class="flexitem"><strong>role:</strong> {{ user.role }}</div>
        <div class="flexitem"><strong>logname:</strong> {{ user.logname }}</div>
        <div class="flexitem"><strong>password:</strong> {{ user.password }}</div>
        <div class="flexitem"><strong>ФИО:</strong> {{ user.fio }}</div>
      </div>
      <div>
        <my-button @click="$emit('remove', user)">Удалить пользователя</my-button>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type:  Object,
            required:   true
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