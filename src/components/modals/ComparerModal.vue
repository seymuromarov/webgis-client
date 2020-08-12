<template>
  <CustomModal
    name="comparerModal"
    title="Swap Image"
    width="50%"
    :minHeight="500"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  ></CustomModal>
</template>

<script>
import { mapController, layerController } from "@/controllers";
export default {
  name: "ComparerModal",
  data() {
    return {
      extent: null,
    };
  },
  computed: {
    selectedBasemaps() {
      return layerController.getSelectedBasemaps();
    },
  },
  methods: {
    onModalOpen() {
      this.extent = mapController.getCurrentExtent();
    },
    onModalClose() {},
  },
};
</script>

<style></style>
