<template>
  <div>
    <!-- Comments -->
    <div class="issue__comments">
      <!-- <div class="issue__comment">
                <div class="card">
                    <h6 class="card-header">
                        <div>
                            <span class="issue__author">Peter Beck</span>
                            <span class="issue__date">6 days ago</span>
                        </div>
                        <button type="button" class="btn btn-light">
                            <i class="fas fa-reply"></i>
                        </button>
                    </h6>
                    <div class="card-body">
                        <p
                            class="card-text"
                        >Curabitur ultrices libero vel mauris venenatis, in varius leo gravida.</p>
                    </div>
                </div>
                <div class="issue__comment_replies">
                    <div class="issue__comment">
                        <div class="card">
                            <h6 class="card-header">
                                <div>
                                    <span class="issue__author">Peter Beck</span>
                                    <span class="issue__date">6 days ago</span>
                                </div>
                            </h6>
                            <div class="card-body">
                                <p
                                    class="card-text"
                                >Curabitur ultrices libero vel mauris venenatis, in varius leo gravida.</p>
                            </div>
                        </div>
                    </div>
                    <div class="issue__comment">
                        <div class="card">
                            <h6 class="card-header">
                                <div>
                                    <span class="issue__author">Peter Beck</span>
                                    <span class="issue__date">6 days ago</span>
                                </div>
                            </h6>
                            <div class="card-body">
                                <p
                                    class="card-text"
                                >Curabitur ultrices libero vel mauris venenatis, in varius leo gravida.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->

      <div class="issue__comment" v-for="comment in comments" :key="comment.id">
        <!-- Comment -->
        <div class="card">
          <h6 class="card-header">
            <div>
              <span class="issue__author">{{ comment.user.userName }}</span>
              <span class="issue__date" :title="comment.dateCreated">{{
                comment.dateCreated
              }}</span>
            </div>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-light"
                v-if="showDeleteBtn"
                @click="deleteComment(comment.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
              <button
                type="button"
                class="btn btn-light"
                @click="setActiveReplyId(comment.id)"
              >
                <i class="fas fa-reply"></i>
              </button>
            </div>
          </h6>
          <div class="card-body" v-html="comment.content"></div>
        </div>

        <!-- Replies -->
        <div class="issue__comment_replies">
          <!-- Reply form -->
          <NewComment
            v-show="comment.id === activeReplyId"
            :replyId="comment.id"
            @submitComment="submitComment"
          />

          <!-- Reply comment -->
          <div
            class="issue__comment"
            v-for="reply in comment.replies"
            :key="reply.id"
          >
            <div class="card">
              <h6 class="card-header">
                <div>
                  <span class="issue__author">{{ reply.user.userName }}</span>
                  <span class="issue__date" :title="reply.dateCreated">{{
                    reply.dateCreated
                  }}</span>
                </div>
                <button
                  type="button"
                  class="btn btn-light"
                  v-if="showDeleteBtn"
                  @click="deleteComment(reply.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </h6>
              <div class="card-body" v-html="reply.content"></div>
            </div>
          </div>
        </div>
      </div>

      <Loader v-if="loading" />

      <!-- New Comment -->
      <NewComment @submitComment="submitComment" />

      <div class="modal show" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import forum from "@/api/forum";
import NewComment from "./NewComment";
// import Loader from "../parts/Loader";

export default {
  name: "Comments",
  components: {
    NewComment,
    // Loader,
  },
  props: {
    rawComments: {
      type: Array,
    },
    postId: {
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
    setActiveReplyId(id) {
      if (this.activeReplyId === id) {
        this.activeReplyId = null;
      } else {
        this.activeReplyId = id;
      }
    },
    rearrangeCommentList() {
      let comments = [];

      this.rawComments.forEach((item) => {
        if (!item.parentId) {
          comments.push({
            ...item,
            replies: this.rawComments.filter((comment) => {
              if (comment.parentId) {
                return comment.parentId === item.id;
              }
            }),
          });
        }
      });

      this.comments = comments;
    },
    submitComment(data) {
      this.loading = true;

      const body = {
        parentId: null,
        postId: this.postId,
        ...data,
      };

      forum
        .insertComment(body)
        .then((response) => {
          if (response.data) {
            this.rawComments.push(response.data);
            this.activeReplyId = null;
          }
          this.loading = false;
        })
        .catch();
    },
    deleteComment(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.loading = true;

          forum
            .deleteComment(id)
            .then((response) => {
              if (response.status === 200) {
                this.rawComments.splice(
                  this.rawComments.findIndex((x) => x.id === id),
                  1
                );
              }
              this.loading = false;
            })
            .catch();
        }
      });
    },
  },
  computed: {
    showDeleteBtn() {
      // return this.$cookie.get("isAdmin");
      return false;
    },
  },
  mounted() {
    this.rearrangeCommentList();
  },
  watch: {
    rawComments() {
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
