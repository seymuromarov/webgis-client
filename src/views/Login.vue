<template lang="html">
  <div class="main">
    <div class="form-block">
      <form class="form" @submit.prevent="login">
        <img class="logo" src="../assets/logo-en.png" />
        <input type="text" placeholder="username" v-model="username" />
        <input type="password" placeholder="password" v-model="password" />
        <p class="error-message" v-if="error">{{ error }}</p>
        <!--                <button><i class="fas fa-arrow-right"></i></button>-->
        <button><i class="fas fa-arrow-right"></i></button>
      </form>
    </div>
    <div class="sign-block">
      <span class="sign"
        >© 2020 Research and Development Center, Azercosmos OJSCo</span
      >
    </div>
  </div>
</template>

<script>
import { authService } from "@/services";

export default {
  mounted() {
    this.error = this.$store.getters.authError;
  },
  data: function() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      const { username, password } = this;
      const response = await authService.login({
        emailOrUsername: username,
        password: password,
      });
      if (response.status === 400) {
        this.error = response.data;
      }
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.form-block {
  top: 20%;
  left: calc(50% - 200px);
  position: absolute;
  width: 400px;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.3);
  background: #fff;
  padding: 20px;
  border: none;
  text-align: center;
  box-sizing: border-box;
  border-radius: 5px;
  opacity: 0.8;
}

.form input {
  width: 75%;
  font-size: 16px;
  text-align: center;
  color: #fff;
  background: #7b7b7b;
  padding: 5px 10px;
  margin: 5px 0;
  outline: none;
  border-radius: 5px;
  border: 0;
}

.form input::placeholder {
  color: #fff;
}

.form button {
  display: block;
  height: 45px;
  /*width: 45px;*/
  margin: 20px auto 10px auto;
  background: #4d8084;
  color: #fff;
  font-size: 25px;
  border: 0;
  border-radius: 20px;
  padding: 0 10px;
  cursor: pointer;
  outline: 0;
}

.main {
  height: 100vh;
  margin: 0;
  width: 100vw;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: 100% 100%;
  font-family: Roboto, sans-serif;
}

.sign-block {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 10px;
}

.sign {
  float: right;
  color: #fff;
  line-height: 40px;
  font-size: 13px;
  font-family: Arial;
}

.error-message {
  color: red;
}

.logo {
  display: block;
  width: 67%;
  margin: 15px auto 45px auto;
}
</style>
