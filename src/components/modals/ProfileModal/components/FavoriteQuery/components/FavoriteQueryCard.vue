<template>
  <div class="card">
    <div class="card-header">
      <!-- {{ label }} -->
      <div class="float-left">{{ label }}</div>
      <div class="float-right">
        <span v-if="layerLabel" class="badge badge-info">
          {{ layerLabel }}
        </span>
      </div>
    </div>
    <div class="card-body">
      <p>
        {{ query }}
      </p>
      <div class="float-right">
        <button class="btn btn-success btn-sm m-1" @click="onApplyClick">
          {{ applyText }}
        </button>
        <button class="btn btn-danger btn-sm m-1" @click="onDeleteClick">
          {{ deleteText }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FavoriteQueryCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
    },
    layerLabel: {
      type: String,
    },
    applyText: {
      type: String,
      required: true,
    },
    deleteText: {
      type: String,
      required: true,
    },
    query: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  mounted() {},
  methods: {
    onDeleteClick() {
      this.$emit("onDeleteClick", this.id);
    },
    onApplyClick() {
      this.$emit("onApplyClick", this.id);
    },
  },
};
</script>
