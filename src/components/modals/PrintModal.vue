<template>
  <CustomModal
    name="printModal"
    title="Print"
    width="50%"
    :minHeight="500"
    @beforeShow="onModalOpen"
    @afterHide="onModalClose"
  ></CustomModal>
</template>

<script>
export default {
  name: "PrintModal",
  data() {
    return {};
  },
  methods: {
    onModalOpen() {},
    onModalClose() {},
  },
};
</script>

<style></style>
