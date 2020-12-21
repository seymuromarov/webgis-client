<template>
  <div id="Forum">
    <IssueList
      @openIssue="openIssue"
      v-if="activeBlock === 'list'"
      @newIssue="activeBlock = 'newIssue'"
    />
    <IssueDetailed
      v-if="activeBlock === 'detailed'"
      :openIssueId="openIssueId"
      @back="activeBlock = 'list'"
    />
    <NewIssue
      v-if="activeBlock === 'newIssue'"
      @back="activeBlock = 'list'"
      @openIssue="openIssue"
    />
  </div>
</template>

<script>
import forum from "@/api/forum";
import IssueList from "./List";
import IssueDetailed from "./Detailed";
import NewIssue from "./NewIssue";

export default {
  name: "Forum",
  components: {
    IssueList,
    IssueDetailed,
    NewIssue,
  },
  data() {
    return {
      activeBlock: "list",
      openIssueId: null,
    };
  },
  methods: {
    openIssue(id) {
      this.openIssueId = id;
      this.activeBlock = "detailed";
    },
    getCategories() {
      forum
        .getCategories()
        .then((response) => {
          this.$store.commit("SET_CATEGORIES", response);
        })
        .catch();
    },
  },
  mounted() {
    if (!this.categories.length) {
      this.getCategories();
    }
  },
  computed: {
    categories() {
      return this.$store.state.forum.categories;
    },
  },
};
</script>

<style lang="scss">
#Forum {
  height: 100%;
  .issue-icon--open {
    color: #ffa500;
  }
  .issue-icon--closed {
    color: #008000;
  }
  .issue__date {
    color: rgba(0, 0, 0, 0.5);
  }
  .issue__author {
    font-weight: 600;
    margin-right: 1.6rem;
    color: rgba(0, 0, 0, 0.8);
  }
  .submit-btn {
    width: 20%;
  }
  .back-btn {
    margin-bottom: 1.6rem;
    width: 15%;
  }
}
</style>
