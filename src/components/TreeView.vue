<template class="tree-view">
  <div>
    <div style="text-align: left;">
      <div class="row">
        <div class="col-12 layerDiv">
          <span v-if="isCategory(item)" @click="toggle">
            <i class="icon-unchecked fas fa-layer-group "></i>
            <span class="serviceTitle layer-category-group">
              {{ item.name }}
            </span>
            <i v-if="isOpen" class="icon-checked fas fa-minus"></i>
            <i v-else class="icon-unchecked fas fa-plus"></i
          ></span>
          <span v-else>
            <input
              class="parentCheckbox"
              :id="item.name"
              :name="item.name"
              type="checkbox"
              @click="selectService(item, item.order, false, $event)"
            />
            <i class="checkbox-icon far fa-check-circle"></i>
            <label :for="item.name"></label>
            <span class="serviceTitle">
              {{ item.showingLabel }}
            </span>

            <span>
              <i
                v-if="item.collapseVisibility && !item.layersVisibility"
                @click="basemapLayersReset(item, true)"
                class="fas fa-caret-left makeMePoint"
              ></i>
              <i
                v-if="item.layersVisibility"
                @click="item.layersVisibility = false"
                class="fas fa-caret-down makeMePoint"
              ></i>
            </span>
          </span>
        </div>
      </div>

      <div
        style="background: whitesmoke;padding-top: 10px;"
        v-if="
          item.unitedDynamicLayerName !== null &&
            item.unitedDynamicLayerName !== undefined
        "
        v-show="item.layersVisibility"
      >
        <div
          class="row layerDiv"
          v-for="(layer, index) in item.unitedDynamicLayerName.layers"
          :key="index"
        >
          <div class="col-12" style="white-space: nowrap">
            <label :for="item.name + layer.id"></label>
            <span class="serviceTitle" :for="layer.name">{{ layer.name }}</span>
            <i
              class="dataIcon fas fa-table"
              @click="
                getTableData(
                  item.unitedDynamicLayerName,
                  layer.id,
                  layer.name,
                  { where: '1=1' }
                )
              "
            ></i>
            <i
              v-if="layer.name.trim() == 'CropMap2019_vector'"
              class="fas fa-filter reportIcon"
              style="color:blue;margin-left: 10px;"
              @click="
                showSimpleFilterModal(
                  layer.id,
                  item.unitedDynamicLayerName.name
                )
              "
            />
          </div>
        </div>
      </div>

      <!-- <div
        style="background: whitesmoke;padding-top: 10px; "
        v-show="item.layersVisibility"
      >
        <div class="row layerDiv">
          <div class="col-12" style="white-space: nowrap">
            <div class>
              <i class="dataIcon fas fa-table"></i>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <ul v-show="isOpen" v-if="isCategory(item)">
      <li
        class="list-group-item"
        v-for="(element, index) in item.children"
        :key="index"
      >
        <treeItem :item="element"></treeItem>
      </li>
    </ul>
    <ul v-show="isOpen" v-if="isCategory(item)">
      <li
        class="list-group-item"
        v-for="(element, index) in item.layers"
        :key="index"
      >
        <treeItem :item="element" @selectService="selectService"></treeItem>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "treeItem",
  props: ["item"],
  data: function() {
    return {
      isOpen: false
    };
  },
  computed: {},

  methods: {
    toggle: function() {
      if (this.isCategory) {
        this.isOpen = !this.isOpen;
      }
    },
    getTableData(service, layerId, layerName, query) {
      this.$emit("getTableData", service, layerId, layerName, query);
    },
    selectService(service, index, dynamic, e) {
      this.$emit("selectService", service, index, dynamic, e);
    },
    basemapLayersReset(service, status) {
      this.$emit("basemapLayersReset", service, status);
    },
    showSimpleFilterModal(layerId, layerName) {
      this.$emit("showSimpleFilterModal", layerId, layerName);
    },
    isCategory: function(item) {
      return item.children && item.layers;
    }
  }
};
</script>
<style>
.tree-view.tree-item {
  cursor: pointer !important;
}

.tree-view ul {
  text-align: left;
  list-style-type: none;
}

.icon-unchecked {
  color: #c6c6c6;
}
.icon-checked {
  color: #008422;
}
</style>
