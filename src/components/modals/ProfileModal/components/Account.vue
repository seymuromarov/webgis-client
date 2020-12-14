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
            width: '16rem',
          }"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { LanguageSelect } from "@/components";

import { userController } from "@/controllers";
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
};
</script>
