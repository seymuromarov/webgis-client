<template>
  <div>
    <CustomModal
      name="serviceSelectionModal"
      title="Services"
      :min-width="400"
      :minHeight="200"
      @beforeShow="onModalOpen"
      @afterShow="onModalOpened"
      @afterHide="onModalClose"
    >
      <div>
        <ul class="selection-list text-center">
          <li
            v-for="(item, index) in activeLayers"
            :key="index"
            @click="selectItem(item)"
          >
            <span class="list-item">
              <h5>{{ item.name }}</h5>
            </span>
          </li>
        </ul>
      </div>
    </CustomModal>
    <DataModal v-if="dataModalVisibility" :layerId="selectedLayer.id" />
  </div>
</template>

<script>
import {
  mapController,
  modalController,
  layerController,
  tableController,
} from "@/controllers";
import DataModal from "@/components/modals/DataModal";
import { notifyService } from "@/services";
import { _ } from "vue-underscore";
export default {
  name: "ServiceSelectionModal",
  components: { DataModal },
  data() {
    return { activeLayers: [], selectedLayer: null };
  },
  computed: {
    dataModalVisibility() {
      return this.selectedLayer !== null;
    },
    clickedCoordinate() {
      return mapController.getClickedCoordinate();
    },
    clickedPixel() {
      return mapController.getClickedPixel();
    },
  },
  methods: {
    onModalOpen() {
      this.activeLayers = layerController.getSelectedDyanmics();
    },
    onModalOpened() {
      if (this.activeLayers.length == 0)
        modalController.hideServiceSelectionModal();
      if (this.activeLayers.length == 1) {
        //only one active exist
        modalController.hideServiceSelectionModal();
        this.selectItem(this.activeLayers[0]);
      }
    },
    onModalClose() {},
    async selectItem(item) {
      let response = await tableController
        .getGeometryData(item.id, this.clickedCoordinate)
        .then((response) => {
          let data = response.features[0].attributes;
          if (!_.isEmpty(data)) {
            new Promise((resolve) => {
              this.selectedLayer = item;
              tableController.setInfoData(data);
              resolve();
            }).then((c) => {
              modalController.showDataModal();
              mapController.focusToServicePolygon(item.id, this.clickedPixel);
            });
          } else {
            // notifyService.error("Data Not Exist In This Coordinate!");
          }
          modalController.hideServiceSelectionModal();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.selection-list {
  margin: 0;
  padding: 0;
  list-style: none;

  .list-item {
    display: inline-block;
    width: 100%;
    color: white;
    background-color: var(--primary-color-opacity-75);
    padding: 0.9375rem;
    margin: 0.0625rem 0rem;
  }

  .list-item:hover,
  .list-item:focus {
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    background-color: var(--primary-color);
  }
}

// .selection-content {
//   .item {
//     display: block;
//     width: 100%;
//     color: white;
//     background-color: var(--primary-color-opacity-75);
//     margin: 0.0625rem 0rem;
//   }
//   a:hover {
//     background-color: var(--primary-color);
//     cursor: pointer;
//   }
// }
</style>
