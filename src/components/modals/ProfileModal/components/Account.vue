<template>
  <div class="row text-center">
    <div class="col-md-12">
      {{ $t("menu.profile.account.username") }} :
      <strong>{{ username }}</strong>
    </div>
    <div class="col-md-12">
      {{ $t("menu.profile.account.email") }} :<strong>{{ email }}</strong>
    </div>
    <div class="col-md-12 mt-2" style="display:flex;justify-content: center;">
      <div class="text-center">
        <LanguageSelect
          :styles="{
            width: '160px',
          }"
        />
      </div>
    </div>
    <div class="col-md-12 mt-2" style="display:flex;justify-content: center;">
      <button class="btn btn-outline-primary" @click="showChangePasswordModal">
        {{ $t("form.changePasswordForm.modalTitle") }}
      </button>
    </div>
  </div>
</template>
<script>
import { LanguageSelect } from "@/components";

import { userController, modalController } from "@/controllers";
export default {
  name: "Profile",
  components: { LanguageSelect },
  data() {
    return {
      username: "",
      email: "",
    };
  },
  mounted() {
    var user = userController.getUserInfo();
    this.username = user.userName;
    this.email = user.email;
  },
  methods: {
    showChangePasswordModal() {
      modalController.showChangePasswordModal();
    },
  },
};
</script>
