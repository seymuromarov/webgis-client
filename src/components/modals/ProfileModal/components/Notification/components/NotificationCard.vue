<template>
  <div class="card">
    <div class="card-header">
      <div class="float-left">{{ label }}</div>
      <div class="float-right">
        <span v-if="type" class="badge" :class="typeToClass()">{{
          typeToString()
        }}</span>
      </div>
    </div>
    <div class="card-body">
      <div class=" mb-0">
        <p>
          {{ description }}
        </p>
        <footer class="blockquote-footer float-right">
          {{ date }}
          <cite title="Created By">{{ createdBy }}</cite>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotificationCard",
  props: {
    label: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    type: {
      type: Number,
    },
    createdBy: {
      type: String,
    },
  },
  mounted() {},
  methods: {
    typeToString() {
      if (this.type == 1) return "info";
      else return "warning";
    },
    typeToClass() {
      if (this.type == 1) return "badge-info";
      else return "badge-warning";
    },
  },
};
</script>
