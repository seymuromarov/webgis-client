<template>
  <div class="row text-center">
    <div class="col-md-12">
      Username : <strong>{{ username }}</strong>
    </div>
    <div class="col-md-12">
      E-mail :<strong>{{ email }}</strong>
    </div>
  </div>
</template>
<script>
import { userController } from "@/controllers";
export default {
  name: "Profile",
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
