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
            class="form-control"
            :class="{ 'is-invalid': !titleValid }"
            id="title"
            :placeholder="$t('form.createIssueForm.title')"
            v-model="title"
            required
          />
          <div class="invalid-feedback">
            {{ $t("form.createIssueForm.validationMessages.titleRequired") }}
          </div>
        </div>

        <div class="form-group">
          <label for="category">{{
            $t("form.createIssueForm.category")
          }}</label>
          <select
            id="category"
            class="form-control category"
            :class="{ 'is-invalid': !categoryValid }"
            :placeholder="$t('form.createIssueForm.title')"
            v-model="selectedCategory"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</option
            >
          </select>
          <div class="invalid-feedback">
            {{ $t("form.createIssueForm.validationMessages.categoryRequired") }}
          </div>
        </div>

        <div class="form-group content">
          <label for="content">{{ $t("form.createIssueForm.content") }}</label>
          <quill-editor
            id="content"
            class="content__editor"
            :class="{ 'is-invalid': !contentValid }"
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
          <div class="invalid-feedback">
            {{ $t("form.createIssueForm.validationMessages.contentRequired") }}
          </div>

          <button
            type="button"
            class="btn btn-primary submit-btn"
            :disabled="submitButtonDisabled && false"
            @click="submitForm"
          >
            {{ $t("button.submit") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import forum from "@/api/forum";

export default {
  name: "NewIssue",
  data() {
    return {
      title: null,
      content: null,
      selectedCategory: 0,
      editorOption: {},
    };
  },
  methods: {
    submitForm() {
      this.title = this.title !== null ? this.title.trim() : "";
      this.selectedCategory =
        this.selectedCategory !== 0 ? this.selectedCategory : -1;
      this.content = this.content !== null ? this.content.trim() : "";

      if (this.titleValid && this.categoryValid && this.contentValid) {
        const body = {
          title: this.title.trim(),
          content: this.content,
          categoryId: Number(this.selectedCategory),
        };

        forum
          .insertIssue(body)
          .then((response) => {
            this.$emit("openIssue", response.id);
            this.$store.commit("SET_OPEN_ISSUES", []);
          })
          .catch();
      }
    },
  },
  computed: {
    submitButtonDisabled() {
      if (!this.titleValid && !this.categoryValid && !this.contentValid) {
        return false;
      }
      return true;
    },
    titleValid() {
      if (this.title !== null) {
        return this.title.trim();
      }
      return true;
    },
    categoryValid() {
      if (this.selectedCategory >= 0) {
        return true;
      }
      return false;
    },
    contentValid() {
      if (this.content !== null) {
        return this.content.trim();
      }
      return true;
    },
    categories() {
      return this.$store.state.forum.categories;
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
