<template>
  <div>
    <div>
      Count
      <p>{{count}}</p>
    </div>
    <div>
      <button type="button" class="btn btn-success" @click="countClick">Count</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "scratch",
  props: {},
  mounted() {
    console.log(this.$store.state.colors);
  },
  data() {
    return {};
  },
  methods: {
    countClick() {
      this.$store.dispatch("INC_COUNT", 1);
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    colors() {
      return this.$store.state.colors;
    }
  }
};
</script>