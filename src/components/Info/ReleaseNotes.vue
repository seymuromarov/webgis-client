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
import releaseNote from "@/api/releaseNote";

export default {
  name: "ReleaseNotes",

  data() {
    return {
      notes: [],
      loading: false,
    };
  },
  methods: {
    getReleaseNotes() {
      this.loading = true;

      releaseNote
        .getAll()
        .then((response) => {
          this.notes = response;
        })
        .catch((error) => {})
        .finally(() => {
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
    border-bottom: 0.0625rem 0.625rem solid #e5e5e5;
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
