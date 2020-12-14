<template>
  <div>
    <form class="contact-block">
      <div class="form-group">
        <label for="subject">{{ $t("form.contactUsForm.subject") }}</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': submitted && !$v.data.subject.required }"
          id="subject"
          :placeholder="$t('form.contactUsForm.subject')"
          required
          v-model="data.subject"
        />
        <div
          v-if="submitted && !$v.data.subject.required"
          class="invalid-feedback"
        >
          {{ $t("form.contactUsForm.validationMessages.subjectRequired") }}
        </div>
      </div>
      <div class="form-group">
        <label for="content">{{ $t("form.contactUsForm.content") }}</label>
        <textarea
          class="form-control"
          :class="{ 'is-invalid': submitted && !$v.data.message.required }"
          id="content"
          rows="3"
          :placeholder="$t('form.contactUsForm.content')"
          required
          v-model="data.message"
        ></textarea>
        <div
          v-if="submitted && !$v.data.message.required"
          class="invalid-feedback"
        >
          {{ $t("form.contactUsForm.validationMessages.contentRequired") }}
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary submit-btn"
        @click.prevent="sendMessage"
        :disabled="loading"
      >
        {{ $t("button.submit") }}
      </button>
    </form>
  </div>
</template>

<script>
import info from "@/api/info";
import { required } from "vuelidate/lib/validators";
import { notifyService } from "@/services";
export default {
  name: "Contact",
  data() {
    return {
      data: {
        subject: null,
        message: null,
      },
      submitted: false,
      loading: false,
    };
  },
  validations: {
    data: {
      subject: { required },
      message: { required },
    },
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      this.submitted = false;
      this.loading = false;
      this.resetData();
    },
    resetData() {
      this.data = {
        subject: null,
        message: null,
      };
    },
    sendMessage() {
      this.submitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;

        info
          .sendMessage(this.data)
          .then((response) => {
            notifyService.success("Successfully Added");
            this.resetData();
          })
          .catch((error) => {
            // this.loading = false;
          })
          .finally(() => {
            this.loading = true;
          });
      }
    },
  },
};
</script>

<style lang="scss">
.contact-block {
  padding: 1.6rem 6.6rem 3.2rem;
}
</style>
