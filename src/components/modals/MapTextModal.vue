<template>
  <CustomModal
    name="mapTextModal"
    title="Point Text"
    width="25%"
    :minHeight="100"
    @beforeShow="onModalOpen"
  >
    <form>
      <div class="form-group">
        <label>Text</label>
        <input type="text" class="form-control" v-model="text" />
      </div>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-primary float-right"
          @click="addText"
        >
          Add
        </button>
      </div>
    </form>
  </CustomModal>
</template>

<script>
import {
  layerController,
  toolController,
  modalController,
} from "@/controllers";
export default {
  name: "MapTextModal",
  data() {
    return {
      text: null,
    };
  },

  computed: {
    pointCoordinates() {
      return toolController.getBbox();
    },
  },
  methods: {
    addText() {
      toolController.addText(this.text, this.pointCoordinates);
      modalController.hideMapTextModal();
    },
    onModalOpen() {
      this.text = null;
    },
  },
};
</script>

<style></style>
