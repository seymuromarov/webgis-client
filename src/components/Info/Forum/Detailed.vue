<template>
  <div class="issue-detail" v-if="issue">
    <!-- Back button -->
    <button type="button" class="btn btn-light back-btn" @click="back">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <div class="row">
      <div class="col-md-12">
        <span
          class="badge "
          :class="{
            'badge-success': issue.issueStatus === 1,
            'badge-danger': issue.issueStatus === 2,
          }"
          >{{ issue.issueStatus === 1 ? "Open" : "Closed" }}</span
        >
        <h2 class="d-inline-block ml-3">{{ issue.title }}</h2>
        <div class="btn-group d-inline-block ml-3">
          <button
            type="button"
            class="btn btn-sm btn-danger"
            v-permission="['issue_edit']"
            @click="closeIssue"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-sm btn-light"
            v-permission="['issue_delete']"
            @click="deletePost(issue.id)"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
        <div></div>
      </div>
      <div class="col-md-12 ">
        <div class="float-right">
          <small class="issue__author">{{ issue.user.userName }}</small>
          <small class="text-muted">{{ issue.dateCreated }}</small>
        </div>
      </div>
      <div class="col-md-12">
        <!-- Issue content -->
        <div class="issue-detail-content" v-html="issue.content"></div>
      </div>
      <div class="col-md-12">
        <comment-card
          :data="issue.comments"
          :issueId="issue.id"
          @onCommentAdded="refreshIssue"
          @onCommentDeleted="refreshIssue"
        />
      </div>
      <!-- <div class="col-md-12 mt-3">
        <new-comment :issueId="issue.id" />
      </div> -->
    </div>
    <!-- <Comments :rawComments="issue.comments" :postId="issue.id" /> -->
    <!-- Loader -->
    <Loader v-if="loading" />
    <!-- 
    <div class="issue-details" v-if="issue">
      <div class="issue__header">
        <i
          class="fas fa-exclamation-circle issue-icon issue-icon--open"
          v-if="issue.status === 1"
        ></i>
        <i class="far fa-check-circle issue-icon issue-icon--closed" v-else></i>
        <div>
          <h3 class="issue__title">
            {{ issue.title }}
            <div class="btn-group">
              <button
                v-permission="['issue_edit']"
                type="button"
                class="btn btn-sm btn-danger"
                @click="closeIssue"
              >
                Close
              </button>
              <button
                v-permission="['issue_edit']"
                type="button"
                class="btn btn-sm btn-light"
                v-if="showDeleteBtn"
                @click="deletePost(issue.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </h3>
          <div>
            <small class="issue__author">{{ issue.user.userName }}</small>
            <small class="issue__date" :title="issue.dateCreated">{{
              issue.dateCreated
            }}</small>
          </div>
        </div>
      </div>

      <div class="issue__content" v-html="issue.content"></div>
      <Comments :rawComments="issue.comments" :postId="issue.id" />
    </div> -->
  </div>
</template>

<script>
import issue from "@/api/issue";
import Comments from "./Comments";
import NewComment from "./NewComment";
import permission from "@/directive/permission/index.js";
import { notifyService } from "@/services";

export default {
  name: "IssueDetailed",
  directives: { permission },
  components: {
    "comment-card": Comments,
    "new-comment": NewComment,
    // Loader,
  },
  props: {
    issueId: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      issue: null,
    };
  },
  mounted() {
    this.getIssue();
  },
  methods: {
    refreshIssue() {
      this.getIssue();
    },

    getIssue() {
      this.loading = true;

      issue
        .get(this.issueId)
        .then((response) => {
          this.issue = response;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closeIssue() {
      issue
        .close(this.issue.id)
        .then((response) => {
          this.issue = response;
          notifyService.updated();
        })
        .catch();
    },
    back() {
      this.issue = null;
      this.$emit("back");
    },

    deletePost(id) {
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
            .delete(id)
            .then((response) => {
              this.loading = false;
              notifyService.deleted();
            })
            .catch();
        }
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.issue-detail {
  &-content {
    --content-gap: 4.8rem;
    margin: 2.4rem var(--content-gap) 0;
    padding-bottom: 2.4rem;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
    img {
      width: 100%;
      border-radius: 0.4rem;
      margin: 1.6rem 0;
    }
  }
}

// .issue-details {
//   --content-gap: 4.8rem;

//   .issue__header {
//     display: flex;
//     align-items: baseline;
//     .issue-icon {
//       font-size: 2.8rem;
//       margin-right: 1.6rem;
//       width: 2.4rem;
//     }
//     .issue__title {
//       color: #000000;
//       margin-right: var(--content-gap);
//     }
//   }

//   .issue__content {
//     margin: 2.4rem var(--content-gap) 0;
//     padding-bottom: 2.4rem;
//     border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
//     img {
//       width: 100%;
//       border-radius: 0.4rem;
//       margin: 1.6rem 0;
//     }
//   }
// }
</style>
