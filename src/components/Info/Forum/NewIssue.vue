<template>
    <div>
        <div>
            <h4 class="title">
                <button type="button" class="btn btn-light back-btn" @click="$emit('back')">
                    <i class="fas fa-arrow-left"></i> Back
                </button>Create issue
            </h4>

            <form>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        class="form-control"
                        :class="{'is-invalid': !titleValid}"
                        id="title"
                        placeholder="Title"
                        v-model="title"
                        required
                    />
                    <div class="invalid-feedback">Please enter the title.</div>
                </div>

                <div class="form-group">
                    <label for="category">Category</label>
                    <select
                        id="category"
                        class="form-control category"
                        :class="{'is-invalid': !categoryValid}"
                        placeholder="Filter by category"
                        v-model="selectedCategory"
                    >
                        <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                        >{{ category.name }}</option>
                    </select>
                    <div class="invalid-feedback">Please select the category.</div>
                </div>

                <div class="form-group content">
                    <label for="content">Content</label>
                    <quill-editor
                        id="content"
                        class="content__editor"
                        :class="{'is-invalid': !contentValid}"
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                    ></quill-editor>
                    <div class="invalid-feedback">Please enter the content</div>

                    <button
                        type="button"
                        class="btn btn-primary submit-btn"
                        :disabled="submitButtonDisabled && false"
                        @click="submitForm"
                    >Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import API from "../../../services/ForumService";

export default {
    name: "NewIssue",
    data() {
        return {
            title: null,
            content: null,
            selectedCategory: 0,
            editorOption: {}
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
                    categoryId: Number(this.selectedCategory)
                };

                API.insertIssue(body)
                    .then(response => {
                        if (response.data) {
                            this.$emit("openIssue", response.data.id);
                            this.$store.commit("SET_OPEN_ISSUES", []);
                        }
                    })
                    .catch();
            }
        }
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
        }
    }
};
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    .back-btn {
        margin-right: 1rem;
        margin-bottom: 0 !important;
    }
}
.content {
    display: flex;
    flex-direction: column;
    .content__editor {
        margin-bottom: 1rem;
    }
    .submit-btn {
        align-self: flex-end;
    }
}
</style>