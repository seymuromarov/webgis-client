<template>
  <div>
    <CustomModal
      name="dataModal"
      :minWidth="200"
      :minHeight="200"
      @beforeShow="onModalOpen"
    >
      <div class="row">
        <div class="col-md-12">
          <button
            class="btn btn-primary btn-sm float-right w-100"
            @click="showImageUploadModal"
          >
            Show Files
          </button>
        </div>
      </div>
      <div class="row mt-2">
        <table class="table  text-center">
          <thead>
            <tr class="fields">
              <th class="paddingLeft">Field</th>
              <th class="paddingRight">Value</th>
            </tr>
          </thead>
          <tbody class="popupTableBody">
            <tr v-for="(value, key) in data" :key="key">
              <td class="paddingLeft">{{ key }}</td>
              <td class="paddingRight">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CustomModal>
    <ImageUploadModal :gid="gid" :layerId="layerId" />
  </div>
</template>

<script>
import ImageUploadModal from "@/components/modals/ImageUploadModal";
import { tableController, modalController } from "@/controllers";
export default {
  name: "DataModal",
  components: { ImageUploadModal },
  props: {
    layerId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onModalOpen() {
      // this.data = tableController.getInfoData();
    },
    showImageUploadModal() {
      modalController.showImageUploadModal();
    },
  },
  computed: {
    data() {
      return tableController.getInfoData();
    },
    gid() {
      return this.data["gid"];
    },
  },
};
</script>

<style></style>
