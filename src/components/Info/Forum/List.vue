<template>
  <div class="issue-list">
    <!-- Action bar -->
    <div class="issue__action-bar">
      <div class="action-bar__fields">
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn"
            :class="activeTab === 'open' ? 'btn-primary' : 'btn-light'"
            @click="changeActiveTab('open')"
          >
            <i
              class="fas fa-exclamation-circle issue-icon issue-icon--open"
            ></i>
            {{ totalOpenedIssueCount }}
            {{ $t("menu.information.forum.openedIssues") }}
          </button>
          <button
            type="button"
            class="btn"
            :class="activeTab === 'closed' ? 'btn-primary' : 'btn-light'"
            @click="changeActiveTab('closed')"
          >
            <i class="far fa-check-circle issue-icon issue-icon--closed"></i>
            {{ totalClosedIssueCount }}
            {{ $t("menu.information.forum.closedIssues") }}
          </button>
        </div>
        <v-select
          v-model="selectedIssueCategoryId"
          :clearable="false"
          :options="issueCategoryOptions"
          :reduce="(option) => option.id"
          label="name"
          class="ml-3"
          @input="onIssueCategoryChange"
        ></v-select>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary new-issue"
          @click="$emit('onNewIssueClick')"
        >
          {{ $t("menu.information.forum.createIssue") }}
        </button>
      </div>
    </div>

    <!-- Loader -->
    <Loader v-if="loading" />

    <!-- List -->
    <div class="card issues-card" v-if="activeIssueList">
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item issues-card-item"
          v-for="issue in activeIssueList"
          :key="issue.id"
          @click="onIssueClick(issue)"
        >
          <div class="flex-grow-1">
            <i class="issue-icon" :class="issueIconClass"></i>
            <span class="ml-3">{{ issue.title }}</span>
            <span
              class="badge ml-5"
              :class="{
                'badge-danger':
                  issue.issueCategory.name.toLowerCase() === 'bug',
                'badge-success':
                  issue.issueCategory.name.toLowerCase() === 'feature',
                'badge-info': issue.issueCategory.name.toLowerCase() === 'help',
              }"
              >{{ issue.issueCategory.name }}</span
            >
          </div>

          <div
            class="flex-grow-1 float-right justify-content-center align-items-center"
          >
            <small class="text-muted float-right">{{
              issue.dateCreated
            }}</small>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import issue from "@/api/issue";
import issueCategory from "@/api/issueCategory";
export default {
  name: "IssueList",

  data() {
    return {
      openedIssues: [],
      closedIssues: [],
      issueCategories: [],
      totalOpenedIssueCount: 0,
      totalClosedIssueCount: 0,
      selectedIssueCategoryId: null,
      filteredIssues: {
        open: [],
        closed: [],
      },
      loading: false,
      activeTab: "open",
    };
  },
  mounted() {
    this.getOpenIssues();

    this.getIssueCount();
    this.getIssueCategories();
  },
  methods: {
    getOpenIssues() {
      this.loading = true;
      issue
        .getAllOpen({ issueCategoryId: this.selectedIssueCategoryId })
        .then((response) => {
          this.openedIssues = response;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getClosedIssues() {
      this.loading = true;
      issue
        .getAllClosed({ issueCategoryId: this.selectedIssueCategoryId })
        .then((response) => {
          this.closedIssues = response;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getIssueCount() {
      issue
        .getCounts()
        .then((response) => {
          this.totalOpenedIssueCount = response.open;
          this.totalClosedIssueCount = response.closed;
        })
        .catch()
        .finally(() => {
          this.loading = false;
        });
    },
    getIssueCategories() {
      this.loading = true;
      issueCategory.getAll().then((response) => {
        this.issueCategories = response;
        this.loading = false;
      });
    },
    onIssueClick(issue) {
      this.$emit("onIssueClick", issue);
    },
    onIssueCategoryChange(item) {
      this.refreshIssuesByType(this.activeTab);
    },

    refreshIssuesByType(val) {
      if (val === "open") {
        this.getOpenIssues();
      } else {
        this.getClosedIssues();
      }
    },
    changeActiveTab(value) {
      this.activeTab = value;
      this.refreshIssuesByType(value);
    },
  },

  computed: {
    issueCategoryOptions() {
      var options = this.issueCategories.map((c) => {
        return {
          id: c.id,
          name: c.name,
        };
      });
      return [{ id: null, name: "All" }, ...options];
    },

    activeIssueList() {
      if (this.activeTab === "open") {
        return this.openedIssues;
      } else {
        return this.closedIssues;
      }
    },
    issueIconClass() {
      if (this.activeTab === "open") {
        return "fas fa-exclamation-circle issue-icon--open";
      } else {
        return "far fa-check-circle issue-icon--closed";
      }
    },
  },
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
        width: 8.125rem;
        margin-left: 1rem;
      }
    }

    .new-issue {
      margin-left: 1rem;
    }
  }

  .issues-card {
    .issues-card-item {
      display: flex;

      &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.03);
      }

      .issue__date {
        margin-left: 0.5rem;
      }

      .issue-icon {
        font-size: 1rem;
        margin-right: 1.25rem;
      }
    }
  }
}
</style>
