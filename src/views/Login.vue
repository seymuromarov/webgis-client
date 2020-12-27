<template lang="html">
  <div class="main">
    <div id="color-overlay"></div>
    <LanguageSelect
      :styles="{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        width: '16rem',
      }"
    />
    <div class="form-block">
      <img class="logo" src="../assets/logo-en.png" />

      <form class="form">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            :placeholder="$t('form.loginForm.username')"
            v-model="emailOrUsername"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            :placeholder="$t('form.loginForm.password')"
            v-model="password"
          />
        </div>
        <div class="form-group">
          <!-- <div class="recaptcha-container mt-1">
          <vue-recaptcha
            v-if="isRecaptchaRequired"
            ref="recaptcha"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
            :sitekey="captchaSettings.key"
          >
          </vue-recaptcha>
        </div> -->
        </div>

        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        <div class="form-group">
          <button type="button" class="btn btn-primary w-100" @click="login">
            {{ $t("auth.login") }}
            <!-- <i class="fas fa-arrow-right"></i> -->
          </button>
        </div>
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
import { authService, tokenService, notifyService } from "@/services";
import { userController } from "@/controllers";
import { getErrorMessage } from "@/utils";
import { LanguageSelect } from "@/components";
import captchaSettings from "@/data/captcha";
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "Login",
  components: { VueRecaptcha, LanguageSelect },

  data: function() {
    return {
      emailOrUsername: "",
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
      const { emailOrUsername, password, recaptchaToken } = this;
      // const response = await auth.login({
      //   emailOrUsername: username,
      //   password: password,
      //   recaptchaToken: recaptchaToken,
      // });
      this.$store
        .dispatch("auth/login", {
          emailOrUsername,
          password,
          recaptchaToken,
        })
        .then(() => {
          this.$router.push("/");
          authService.resetFailedAttemptCount();
        })
        .catch((response) => {
          authService.increaseFailedAttempCount();
          this.failedAttemptCount += 1;

          let errors = getErrorMessage(response);
          if (errors.some((c) => c.key.toLowerCase() === "recaptchatoken")) {
            this.errorMessage = "Recaptcha Is Required";
            this.isRecaptchaRequired = true;
          } else {
            this.errorMessage = errors[0].message;
          }
        });

      //   if (response.status === 200) {
      //     let token = response.token;
      //     tokenService.setToken(token);
      //     this.$store.dispatch("SAVE_AUTH_TOKEN", token);
      //     this.$router.push("/");
      //     authService.resetFailedAttemptCount();
      //   } else {
      //     authService.increaseFailedAttempCount();
      //     this.failedAttemptCount += 1;
      //     let errors = getErrorMessage(response);
      //     if (errors.some((c) => c.key.toLowerCase() === "recaptchatoken")) {
      //       this.errorMessage = "Recaptcha Is Required";
      //       this.isRecaptchaRequired = true;
      //     } else {
      //       this.errorMessage = errors[0].message;
      //     }
      //   }
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
  left: calc(50% - 20rem);
  position: absolute;
  width: 40rem;
  box-shadow: 0.2rem 0.4rem 2rem rgba(0, 0, 0, 0.3);
  background: #fff;
  padding: 2rem;
  border: none;

  text-align: center;
  box-sizing: border-box;
  border-radius: 0.5rem;
  opacity: 0.8;
}

.form input {
  /* width: 75%; */
  font-size: 1.6rem;
  text-align: center;
  color: #fff;
  background: #7b7b7b;

  /* padding: 0.5rem 1rem;
  margin: 0.5rem 0; */
  outline: none;
  /* border-radius: 0.5rem; */
  border: 0;
}

.form input::placeholder {
  color: #fff;
}

/* .form button {
  display: block;
  height: 4.5rem;
  margin: 2rem auto 1rem auto;
  background: #4d8084;
  color: #fff;
  font-size: 2.5rem;
  border: 0;
  border-radius: 2rem;
  padding: 0 1rem;
  cursor: pointer;
  outline: 0;
} */

.main {
  height: 100vh;
  margin: 0;
  width: 100vw;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: 100% 100%;
  font-family: Roboto, sans-serif;
}
/* .login-background {
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: 100% 100%;
} */
#color-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1b2537;
  opacity: 0.5;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  background-color: #008cba;
}
.sign-block {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 1rem;
}

.sign {
  float: right;
  color: #fff;
  line-height: 4rem;
  font-size: 1.3rem;
  font-family: Arial;
}

.error-message {
  color: red;
}

.logo {
  display: block;
  width: 67%;
  margin: 1.5rem auto 4.5rem auto;
}
</style>
