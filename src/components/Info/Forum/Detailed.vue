<template>
  <div>
    <!-- Back button -->
    <button type="button" class="btn btn-light back-btn" @click="back">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <!-- Loader -->
    <Loader v-if="loading" />

    <div class="issue-details" v-if="issue">
      <!-- Issue header -->
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
                type="button"
                class="btn btn-sm btn-success"
                v-if="showCloseBtn(issue)"
                @click="closeIssue"
              >
                Close
              </button>
              <button
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
            <span class="issue__author">{{ issue.user.userName }}</span>
            <span
              class="issue__date"
              :title="formatDateTime(issue.dateCreated)"
              >{{ formatDate(issue.dateCreated) }}</span
            >
          </div>
        </div>
      </div>

      <!-- Issue content -->
      <div class="issue__content" v-html="issue.content"></div>

      <Comments :rawComments="issue.comments" :postId="issue.id" />
    </div>
  </div>
</template>

<script>
import forum from "@/api/forum";
import { dateFormatter } from "@/helpers";
import Comments from "./Comments";
// import Loader from "../parts/Loader";

export default {
  name: "IssueDetailed",
  components: {
    Comments,
    // Loader,
  },
  props: {
    openIssueId: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      issue: null,
    };
  },
  methods: {
    getIssueById(id) {
      this.loading = true;

      forum.getIssueById(id)
        .then((response) => {
          if (response.data) {
            this.issue = response.data;
          }
          this.loading = false;
        })
        .catch();
    },
    closeIssue() {
      forum.closeIssue(this.issue.id)
        .then((response) => {
          if (response.data) {
            this.issue = response.data;
            this.$store.commit("SET_OPEN_ISSUES", []);
            this.$store.commit("SET_CLOSED_ISSUES", []);
          }
        })
        .catch();
    },
    back() {
      this.issue = null;
      this.$emit("back");
    },
    showCloseBtn(issue) {
      // return this.$cookie.get("isAdmin") && issue.status === 1;
      return false;
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

          forum.deleteIssue(id)
            .then((response) => {
              if (response.status === 200) {
                if (this.issue.status === 1) {
                  this.$store.commit("SET_OPEN_ISSUES", []);
                }
                if (this.issue.status === 2) {
                  this.$store.commit("SET_CLOSED_ISSUES", []);
                }
                this.back();
              }
              this.loading = false;
            })
            .catch();
        }
      });
    },
    formatDate: dateFormatter.formatDate,
    formatDateTime: dateFormatter.formatDateTime,
  },
  computed: {
    showDeleteBtn() {
      // return this.$cookie.get("isAdmin");
      return localStorage.getItem("isAdmin");
    },
  },
  mounted() {
    if (this.openIssueId) {
      this.getIssueById(this.openIssueId);
    }
  },
};
</script>

<style lang="scss">
.issue-details {
  --content-gap: 4.8rem;

  .issue__header {
    display: flex;
    align-items: baseline;
    .issue-icon {
      font-size: 2.8rem;
      margin-right: 1.6rem;
      width: 2.4rem;
    }
    .issue__title {
      color: #000000;
      margin-right: var(--content-gap);
    }
  }

  .issue__content {
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
</style>
