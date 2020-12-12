<template>
  <div>
    <Loader v-if="loading" />
    <div class="release-note" v-for="(item, index) in notes" :key="index">
      <div class="date">
        <b>{{ item.dateCreated }}</b>
      </div>
      <p class="content">{{ item.note }}</p>
    </div>
  </div>
</template>

<script>
import info from "@/api/info";

// import Loader from "./parts/Loader";

export default {
  name: "ReleaseNotes",
  // components: {
  //   Loader,
  // },
  data() {
    return {
      notes: [],
      loading: false,
    };
  },
  methods: {
    getReleaseNotes() {
      this.loading = true;

      info
        .getReleaseNotes()
        .then((response) => {
          if (response.data) {
            this.notes = response.data;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
  mounted() {
    if (!this.notes.length) {
      this.getReleaseNotes();
    }
  },
};
</script>

<style lang="scss">
.release-note {
  &:not(:last-of-type) {
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e5e5;
  }

  &:not(:first-of-type) {
    padding-top: 1rem;
  }

  .content {
    padding-left: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
}
</style>
