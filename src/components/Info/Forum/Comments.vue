<template>
  <div>
    <!-- Comments -->
    <div class="issue-comments">
      <div
        class="issue-comment-card"
        v-for="comment in comments"
        :key="comment.id"
      >
        <div class="row">
          <div class="col-md-12">
            <!-- Comment -->
            <div class="card w-100">
              <h6 class="card-header">
                <div class="d-inline-block">
                  <strong>{{ comment.user.userName }}</strong>
                  <span class="text-muted ml-2" :title="comment.dateCreated">{{
                    comment.dateCreated
                  }}</span>
                </div>
                <div class="btn-group float-right">
                  <button
                    v-permission="['issue_edit']"
                    type="button"
                    class="btn btn-light"
                    @click="deleteComment(comment.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    class="btn"
                    :class="{
                      'btn-success': comment.id === activeReplyId,
                      'btn-light': comment.id !== activeReplyId,
                    }"
                    @click="setActiveReplyId(comment.id)"
                  >
                    <i class="fas fa-reply"></i>
                  </button>
                </div>
              </h6>
              <div class="card-body" v-html="comment.content"></div>
            </div>
          </div>

          <div class="offset-md-2 col-md-10 mt-3">
            <!-- Replies -->
            <div class="issue-comment-reply">
              <!-- Reply comment -->
              <div
                class="issue-comment-card"
                v-for="reply in comment.replies"
                :key="reply.id"
              >
                <div class="card mt-2">
                  <h6 class="card-header">
                    <div class="d-inline-block">
                      <strong>{{ reply.user.userName }}</strong>
                      <span
                        class="text-muted ml-2"
                        :title="reply.dateCreated"
                        >{{ reply.dateCreated }}</span
                      >
                    </div>
                    <div class="btn-group float-right">
                      <button
                        v-permission="['issue_edit']"
                        type="button"
                        class="btn btn-light"
                        @click="deleteComment(reply.id)"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </h6>
                  <div class="card-body" v-html="reply.content"></div>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <!-- Reply form -->
              <new-comment
                v-show="comment.id === activeReplyId"
                :issueId="issueId"
                :replyId="comment.id"
                @onCommentAdded="onCommentAdded"
              />
            </div>
          </div>
        </div>
      </div>

      <Loader v-if="loading" />

      <div class="mt-3">
        <new-comment :issueId="issueId" @onCommentAdded="onCommentAdded" />
      </div>
      <!-- New Comment -->
      <!-- <NewComment @submitComment="submitComment" /> -->
    </div>
  </div>
</template>

<script>
import permission from "@/directive/permission/index.js";
import comment from "@/api/comment";
import NewComment from "./NewComment";
import { notifyService } from "@/services";

export default {
  name: "Comments",
  directives: { permission },
  components: {
    "new-comment": NewComment,
    // Loader,
  },
  props: {
    data: {
      type: Array,
    },
    issueId: {
      type: Number,
    },
  },
  data() {
    return {
      comments: [],
      activeReplyId: null,
      loading: false,
    };
  },
  methods: {
    onCommentAdded(comment) {
      notifyService.success("Comment successfully added");
      this.$emit("onCommentAdded", comment);
    },
    setActiveReplyId(id) {
      if (this.activeReplyId === id) {
        this.activeReplyId = null;
      } else {
        this.activeReplyId = id;
      }
    },
    rearrangeCommentList() {
      let comments = [];

      this.data.forEach((item) => {
        if (!item.parentId) {
          comments.push({
            ...item,
            replies: this.data.filter((comment) => {
              if (comment.parentId) {
                return comment.parentId === item.id;
              }
            }),
          });
        }
      });

      this.comments = comments;
    },

    deleteComment(id) {
      notifyService.areYouSureAlert(
        "Are you sure want to delete this comment?",
        "Delete!",
        (result) => {
          if (result.isConfirmed) {
            this.loading = true;
            comment
              .delete(id)
              .then((response) => {
                notifyService.deleted();
                this.$emit("onCommentDeleted");
              })
              .finally(() => {
                this.loading = false;
              });
          }
        }
      );
    },
  },

  mounted() {
    this.rearrangeCommentList();
  },
  watch: {
    data() {
      this.rearrangeCommentList();
    },
  },
};
</script>

<style lang="scss">
.issue__comments {
  .issue__comment {
    margin-top: 1.5rem;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.25rem 1.25rem;
      height: 36px;
    }
    img {
      width: 100%;
      border-radius: 4px;
      margin: 1rem 0;
    }
  }
  .issue__comment_replies {
    margin-left: 2rem;
    padding-left: 2rem;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
}

.new-comment {
  // .card-header {
  //     height: 36px;
  // }
  .card-body {
    padding: 0;
  }
  .quill-editor {
    border: 0;
    .ql-toolbar {
      border-width: 0 0 1px 0;
    }
    .ql-container {
      border-width: 0;
    }
  }
}
</style>
