<template>
  <div>
    <div>
      <h4 class="title">
        <button
          type="button"
          class="btn btn-light back-btn"
          @click="$emit('back')"
        >
          <i class="fas fa-arrow-left"></i> {{ $t("button.back") }}</button
        >{{ $t("menu.information.forum.createIssue") }}
      </h4>

      <form>
        <div class="form-group">
          <label for="title">{{ $t("form.createIssueForm.title") }}</label>
          <input
            v-model="form.title"
            class="form-control"
            :class="{ 'is-invalid': isSumbmitted && !$v.form.title.required }"
            id="title"
            :placeholder="$t('form.createIssueForm.title')"
            required
          />
          <div
            v-if="isSumbmitted && !$v.form.title.required"
            class="invalid-feedback"
          >
            {{ $t("form.createIssueForm.validationMessages.titleRequired") }}
          </div>
        </div>

        <div class="form-group">
          <label for="category">{{
            $t("form.createIssueForm.category")
          }}</label>

          <v-select
            v-model="form.issueCategoryId"
            :clearable="false"
            :options="issueCategories"
            :class="{
              'is-invalid': isSumbmitted && !$v.form.issueCategoryId.required,
            }"
            :reduce="(option) => option.id"
            label="name"
          ></v-select>

          <div
            v-if="isSumbmitted && !$v.form.issueCategoryId.required"
            class="invalid-feedback"
          >
            {{ $t("form.createIssueForm.validationMessages.categoryRequired") }}
          </div>
        </div>
        <!-- v-if="submitted && !$v.data.layerIds.required" -->
        <div class="form-group content">
          <label for="content">{{ $t("form.createIssueForm.content") }}</label>
          <quill-editor
            id="content"
            class="content__editor"
            :class="{ 'is-invalid': isSumbmitted && !$v.form.content.required }"
            v-model="form.content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
          <div
            v-if="isSumbmitted && !$v.form.content.required"
            class="invalid-feedback"
          >
            {{ $t("form.createIssueForm.validationMessages.contentRequired") }}
          </div>

          <button
            type="button"
            class="btn btn-primary submit-btn"
            @click="createIssue"
          >
            {{ $t("button.submit") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import issue from "@/api/issue";
import issueCategory from "@/api/issueCategory";
import { required } from "vuelidate/lib/validators";
import notifyService from "@/services/notifyService";
export default {
  name: "NewIssue",
  data() {
    return {
      isSumbmitted: false,
      form: {
        title: null,
        content: null,
        issueCategoryId: null,
      },
      issueCategories: [],
      editorOption: {},
    };
  },
  validations: {
    form: {
      title: { required },
      content: { required },
      issueCategoryId: { required },
    },
  },
  mounted() {
    this.getIssueCategories();
  },
  methods: {
    createIssue() {
      this.isSumbmitted = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        issue.add(this.form).then((response) => {
          this.$emit("onIssueCreated", response);
          notifyService.created();
        });
      }
    },
    getIssueCategories() {
      issueCategory.getAll().then((response) => {
        this.issueCategories = response;
        this.form.issueCategoryId = this.issueCategories[0].id;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  margin-bottom: 3.2rem;
  .back-btn {
    margin-right: 1.6rem;
    margin-bottom: 0 !important;
  }
}
.content {
  display: flex;
  flex-direction: column;
  .content__editor {
    margin-bottom: 1.6rem;
  }
  .submit-btn {
    align-self: flex-end;
  }
}
</style>
