<template lang="html">
  <div class="main">
    <div class="form-block">
      <form class="form">
        <img class="logo" src="../assets/logo-en.png" />
        <input type="text" placeholder="username" v-model="username" />
        <input type="password" placeholder="password" v-model="password" />
        <div class="recaptcha-container mt-1">
          <vue-recaptcha
            v-if="isRecaptchaRequired"
            ref="recaptcha"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
            :sitekey="captchaSettings.key"
          >
          </vue-recaptcha>
        </div>

        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        <button type="button" @click="login">
          <i class="fas fa-arrow-right"></i>
        </button>
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
import auth from "@/api/auth";
import { authService, tokenService } from "@/services";
import { userController } from "@/controllers";
import { getErrorMessage } from "@/utils";
import captchaSettings from "@/data/captcha";
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "Login",
  components: { VueRecaptcha },

  data: function() {
    return {
      username: "",
      password: "",
      recaptchaToken: "",
      errorMessage: "",
      captchaSettings,

      failedAttemptCount: 0,
    };
  },
  mounted() {
    this.failedAttemptCount = authService.getFailedAttemptCount();
  },
  computed: {
    isRecaptchaRequired: {
      get() {
        return this.failedAttemptCount >= 4;
      },
      set(val) {
        if (val) {
          this.failedAttemptCount = 4;
          authService.setFailedAttempCount(4);
        } else {
          this.failedAttemptCount = 0;
          resetFailedAttemptCount(0);
        }
      },
    },
  },
  methods: {
    async login() {
      const { username, password, recaptchaToken } = this;
      const response = await auth.login({
        emailOrUsername: username,
        password: password,
        recaptchaToken: recaptchaToken,
      });
      if (response.status === 200) {
        let data = response.data;
        let token = data.token;
        tokenService.setToken(token);
        this.$store.dispatch("SAVE_AUTH_TOKEN", token);
        this.$router.push("/");
        authService.resetFailedAttemptCount();
      } else {
        authService.increaseFailedAttempCount();
        this.failedAttemptCount += 1;
        let errors = getErrorMessage(response);
        if (errors.some((c) => c.key.toLowerCase() === "recaptchatoken")) {
          this.errorMessage = "Recaptcha Is Required";
          this.isRecaptchaRequired = true;
        } else {
          this.errorMessage = errors[0].message;
        }
      }
    },
    onCaptchaVerified(recaptchaToken) {
      this.recaptchaToken = recaptchaToken;
    },
    onCaptchaExpired: function() {
      this.$refs.recaptcha.reset();
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.recaptcha-container {
  display: flex;
  justify-content: center;
}
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
