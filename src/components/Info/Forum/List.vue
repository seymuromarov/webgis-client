<template>
  <div class="issue-list">
    <!-- Action bar -->
    <div class="issue__action-bar">
      <div class="action-bar__fields">
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn"
            :class="activeTab === 1 ? 'btn-primary' : 'btn-light'"
            @click="changeActiveTab(1)"
          >
            <i
              class="fas fa-exclamation-circle issue-icon issue-icon--open"
            ></i>
            {{ issueCount.open }} Open issues
          </button>
          <button
            type="button"
            class="btn"
            :class="activeTab === 2 ? 'btn-primary' : 'btn-light'"
            @click="changeActiveTab(2)"
          >
            <i class="far fa-check-circle issue-icon issue-icon--closed"></i>
            {{ issueCount.closed }} Closed issues
          </button>
        </div>
        <select
          class="form-control category"
          placeholder="Filter by category"
          @change="handleFilter"
        >
          <option :value="0" :selected="activeCategoryId === 0">All</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            :selected="activeCategoryId === category.id"
            >{{ category.name }}</option
          >
        </select>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary new-issue"
          @click="$emit('newIssue')"
        >
          Create issue
        </button>
      </div>
    </div>

    <!-- Loader -->
    <Loader v-if="loading" />

    <!-- List -->
    <div class="card issues-card" v-if="activeIssueList.length">
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item issues-card__item"
          v-for="issue in activeIssueList"
          :key="issue.id"
          @click="openIssue(issue.id)"
        >
          <i class="issue-icon" :class="issueIconClass"></i>
          <span>{{ issue.title }}</span>
          <span class="issue__date">{{ formatDate(issue.dateCreated) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from "../../../services/ForumService";
import { dateFormatter } from "@/helpers";
import Loader from "../parts/Loader";

export default {
  name: "IssueList",
  components: {
    Loader
  },
  data() {
    return {
      filteredIssues: {
        open: [],
        closed: []
      },
      loading: false
    };
  },
  methods: {
    getOpenIssues() {
      this.loading = true;
      API.getIssues(1)
        .then(response => {
          if (response.data) {
            this.$store.commit("SET_OPEN_ISSUES", response.data);
            this.filteredIssues.open = response.data;
            this.loading = false;
          }
        })
        .catch();
    },
    getClosedIssues() {
      this.loading = true;
      API.getIssues(2)
        .then(response => {
          if (response.data) {
            this.$store.commit("SET_CLOSED_ISSUES", response.data);
            this.filteredIssues.closed = response.data;
            this.loading = false;
          }
        })
        .catch();
    },
    getIssueCount() {
      API.getIssueCount()
        .then(response => {
          if (response.data) {
            this.$store.state.forum.issueCount = response.data;
          }
        })
        .catch();
    },
    openIssue(id) {
      this.$emit("openIssue", id);
    },
    handleFilter(event) {
      this.$store.commit("SET_ACTIVE_CATEGORY_ID", Number(event.target.value));
      this.filterList();
    },
    filterList() {
      if (this.activeCategoryId !== 0) {
        this.filteredIssues.open = this.issues.open.filter(issue => {
          return issue.categoryId === this.activeCategoryId;
        });
        this.filteredIssues.closed = this.issues.closed.filter(issue => {
          return issue.categoryId === this.activeCategoryId;
        });
      } else {
        this.filteredIssues = { ...this.issues };
      }
    },
    changeActiveTab(value) {
      this.$store.commit("SET_ACTIVE_TAB", value);

      if (value === 1 && !this.issues.open.length) {
        this.getOpenIssues();
      } else if (value === 2 && !this.issues.closed.length) {
        this.getClosedIssues();
      }
    },
    formatDate: dateFormatter.formatDate
  },
  mounted() {
    if (!this.issues.open.length) {
      this.getOpenIssues();
    } else {
      this.filterList();
    }
    if (!(this.issueCount.open + this.issueCount.closed)) {
      this.getIssueCount();
    }
  },
  computed: {
    issues() {
      return this.$store.state.forum.issueList;
    },
    issueCount() {
      return this.$store.state.forum.issueCount;
    },
    activeTab() {
      return this.$store.state.forum.activeTab;
    },
    activeCategoryId() {
      return this.$store.state.forum.activeCategoryId;
    },
    activeIssueList() {
      if (this.activeTab === 1) {
        return this.filteredIssues.open;
      } else {
        return this.filteredIssues.closed;
      }
    },
    issueIconClass() {
      if (this.activeTab === 1) {
        return "fas fa-exclamation-circle issue-icon--open";
      } else {
        return "far fa-check-circle issue-icon--closed";
      }
    },
    categories() {
      return this.$store.state.forum.categories;
    }
  }
};
</script>

<style lang="scss" scoped>
.issue-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  .issue__action-bar {
    margin-bottom: 1.25rem;
    display: flex;
    justify-content: space-between;

    .action-bar__fields {
      display: flex;

      .btn {
        &:focus {
          box-shadow: none;
        }
        &.btn-primary {
          .issue-icon {
            color: white !important;
          }
        }
      }

      select.category {
        width: 130px;
        margin-left: 1rem;
      }
    }

    .new-issue {
      margin-left: 1rem;
    }
  }

  .issues-card {
    .issues-card__item {
      display: flex;

      &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.03);
      }

      .issue__date {
        margin-left: 0.5rem;
      }

      .issue-icon {
        font-size: 16px;
        margin-right: 1.25rem;
      }
    }
  }
}
</style>
