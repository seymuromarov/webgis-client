<template>
  <div>
    <!-- New Comment -->
    <div class="issue-new-comment-card">
      <div class="card">
        <h6 class="card-header">
          <div>
            <span class="issue__author">{{ title }}</span>
          </div>
        </h6>
        <div class="card-body">
          <quill-editor
            v-model="content"
            ref="newComment"
            :options="editorOption"
          >
          </quill-editor>
        </div>
        <button
          type="button"
          class="btn btn-success w-100 rounded-0"
          @click="addComment"
        >
          {{ buttonTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "@/api/comment";
import { required } from "vuelidate/lib/validators";
export default {
  name: "NewComment",
  props: {
    issueId: {
      type: Number,
      required: true,
    },
    replyId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      isSubmitted: false,
      content: "",
      editorOption: {
        // modules: {
        //     toolbar: {
        //         container: "#toolbar", // Selector for toolbar container
        //         handlers: {
        //             bold: customBoldHandler
        //         }
        //     }
        // }
      },
    };
  },
  validations: {
    content: { required },
  },
  methods: {
    //       submitComment(data) {
    //   this.loading = true;

    //   const body = {
    //     parentId: null,
    //     postId: this.postId,
    //     ...data,
    //   };

    //   forum
    //     .insertComment(body)
    //     .then((response) => {
    //       this.rawComments.push(response);
    //       this.activeReplyId = null;
    //     })
    //     .catch()
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // },
    addComment() {
      if (this.content) {
        const data = {
          content: this.content,
          parentId: this.replyId,
          issueId: this.issueId,
        };
        comment.add(data).then((response) => {
          this.$emit("onCommentAdded", data);

          this.content = "";
        });
      }

      //   this.$emit("submitComment", data);
      //   this.content = "";
    },
  },
  computed: {
    title() {
      if (this.replyId) {
        return "New reply";
      } else {
        return "New comment";
      }
    },
    buttonTitle() {
      if (this.replyId) {
        return "Send Reply";
      } else {
        return "Add comment";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.issue-new-comment-card {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .card-body {
    padding: 0;
  }
  .quill-editor {
    border: 0;
    .ql-toolbar {
      border-width: 0 0 0.1rem 0;
    }
    .ql-container {
      border-width: 0;
    }
  }
}
.submit-btn {
  margin-top: 1.6rem;
}
</style>
