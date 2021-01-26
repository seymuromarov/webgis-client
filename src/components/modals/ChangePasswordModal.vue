<template>
  <CustomModal
    name="changePasswordModal"
    :title="$t('form.changePasswordForm.modalTitle')"
    :width="400"
    :minHeight="300"
  >
    <Loader v-if="loading" />
    <form>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="form-group">
            <label for="label">{{
              $t("form.changePasswordForm.oldPassword")
            }}</label>
            <input
              type="password"
              class="form-control"
              :class="{
                'is-invalid': submitted && !$v.form.oldPassword.required,
              }"
              :placeholder="$t('form.changePasswordForm.oldPassword')"
              v-model="form.oldPassword"
            />
            <div
              v-if="submitted && !$v.form.oldPassword.required"
              class="invalid-feedback"
            >
              {{
                $t(
                  "form.changePasswordForm.validationMessages.oldPasswordRequired"
                )
              }}
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label for="label">{{
              $t("form.changePasswordForm.password")
            }}</label>
            <input
              type="password"
              class="form-control"
              :class="{
                'is-invalid':
                  submitted &&
                  (!$v.form.password.required ||
                    !$v.form.password.isValidFormat),
              }"
              :placeholder="$t('form.changePasswordForm.password')"
              v-model="form.password"
            />
            <div
              v-if="submitted && !$v.form.password.required"
              class="invalid-feedback"
            >
              {{
                $t(
                  "form.changePasswordForm.validationMessages.passwordRequired"
                )
              }}
            </div>
            <div
              v-if="submitted && !$v.form.password.isValidFormat"
              class="invalid-feedback"
            >
              {{
                $t(
                  "form.changePasswordForm.validationMessages.passwordNotInValidFormat"
                )
              }}
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="form-group">
            <label for="label">{{
              $t("form.changePasswordForm.confirmPassword")
            }}</label>
            <input
              type="password"
              class="form-control"
              :class="{
                'is-invalid':
                  submitted &&
                  (!$v.form.confirmPassword.required ||
                    !$v.form.confirmPassword.sameAsPassword),
              }"
              :placeholder="$t('form.changePasswordForm.confirmPassword')"
              v-model="form.confirmPassword"
            />
            <div
              v-if="submitted && !$v.form.confirmPassword.required"
              class="invalid-feedback"
            >
              {{
                $t(
                  "form.changePasswordForm.validationMessages.passwordRequired"
                )
              }}
            </div>
            <div
              v-if="submitted && !$v.form.confirmPassword.sameAsPassword"
              class="invalid-feedback"
            >
              {{
                $t(
                  "form.changePasswordForm.validationMessages.confirmPasswordNotSame"
                )
              }}
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <button
            type="button"
            class="btn btn-primary float-right"
            @click="changePassword"
            :disabled="loading"
          >
            {{ $t("button.submit") }}
          </button>
        </div>
      </div>
    </form>
  </CustomModal>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
import { notifyService } from "@/services";
import { modalController } from "@/controllers";
import { validPassword } from "@/utils/validate";
import user from "@/api/user";

export default {
  name: "ChangePasswordModal",
  data() {
    return {
      loading: false,
      submitted: false,
      form: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  validations: {
    form: {
      oldPassword: { required },
      password: { required, isValidFormat: validPassword },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
        // isValidFormat: validPassword,
      },
    },
  },
  mounted() {
    this.resetForm();
  },
  methods: {
    resetForm() {
      this.form = {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      };
    },
    changePassword() {
      this.submitted = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loading = true;

        user
          .changePassword(this.form)
          .then((response) => {
            notifyService.updated();
            modalController.hideChangePasswordModal();
          })
          .finally(() => {
            this.loading = false;
          });

        //   notifyService.created();
        //     this.$moodal.computedLayerModal.hide();
      }
    },
  },
};
</script>

<style></style>
