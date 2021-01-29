<template>
  <div id="Forum">
    <IssueList
      @onIssueClick="openIssue"
      v-if="activeBlock === 'list'"
      @onNewIssueClick="activeBlock = 'newIssue'"
    />
    <IssueDetailed
      v-if="activeBlock === 'detailed'"
      :issueId="selectedIssueId"
      @back="activeBlock = 'list'"
    />
    <NewIssue
      v-if="activeBlock === 'newIssue'"
      @back="activeBlock = 'list'"
      @onIssueCreated="openIssue"
    />
  </div>
</template>

<script>
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
      selectedIssueId: null,
    };
  },
  methods: {
    openIssue(item) {
      this.selectedIssueId = item.id;
      this.activeBlock = "detailed";
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
    margin-right: 1rem;
    color: rgba(0, 0, 0, 0.8);
  }
  .submit-btn {
    width: 20%;
  }
  .back-btn {
    margin-bottom: 1rem;
    width: 15%;
  }
}
</style>
