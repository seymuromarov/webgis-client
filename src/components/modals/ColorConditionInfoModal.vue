<template>
  <CustomModal
    name="colorConditionInfoModal"
    :maxWidth="300"
    :minHeight="200"
    :appendToBody="true"
    title="Legenda"
  >
    <div class="row">
      <div v-for="(item, index) in data" :key="index" class="col-md-12 ">
        <span
          class="condition-color-box"
          :style="{
            'background-color': item.fillColor,
            border: `0.125rem solid ${item.borderColor}`,
          }"
        ></span>
        <span class="m-1 condition-text">
          {{ item.title }}
        </span>
      </div>
    </div>
  </CustomModal>
</template>

<script>
export default {
  name: "ColorConditionInfoModal",
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.condition {
  &-text {
    display: inline-block;
    // vertical-align: middle;
  }
  &-color-box {
    vertical-align: middle;

    display: inline-block;
    width: 1.875rem;
    height: 1.25rem;
  }
}
</style>
