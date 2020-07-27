<template>
  <li class="list__item">
    <span class="item__header" :style="`padding-left: ${paddingLeft}`">
      <span class="title">
        <!-- Switch -->
        <ToggleSwitch v-if="!isCategory" class="pre" v-model="switchModel" />
        <i class="far fa-folder pre" v-else></i>
        {{ item.name }}
      </span>

      <!-- Caret icons -->
      <span v-if="caretIconsVisibility">
        <i
          class="fas fa-caret-down"
          v-show="subListVisibility"
          @click="toggleSubList"
        />
        <i
          class="fas fa-caret-left"
          v-show="!subListVisibility"
          @click="toggleSubList"
        />
      </span>

      <!-- Color and Table icons -->
      <span v-if="operationsVisibility" class="icons">
        <img
          v-if="colorIconVisibility"
          src="@/assets/images/icons/color_fill.svg"
          alt=""
          @click="toggleColorPicker"
        />

        <img
          v-if="tableIconVisibility"
          src="@/assets/images/icons/list.svg"
          alt=""
          @click="getTableData(item)"
        />
        <img
          v-if="deleteIconVisibility"
          src="@/assets/images/icons/delete.svg"
          alt=""
          @click="deleteBunch"
        />
      </span>
    </span>

    <!-- Color Picker -->
    <LayerColorPicker
      v-if="colorPickerVisibility"
      @onSave="onColorPickerSave"
      @onClose="colorPickerOnClose"
    />

    <ul v-if="item.layers && subListVisibility" class="list__content">
      <Draggable
        v-model="item.children"
        @start="isDragging = true"
        @end="onDraggableMoveCallback"
      >
        <layer-tree-item
          v-for="(children, index) in item.children"
          :key="children.name + index"
          :item="children"
          :parent="item"
          :layerType="layerType"
          :loop="loop + 1"
        />
      </Draggable>
      <Draggable
        v-model="item.layers"
        @start="isDragging = true"
        @end="onDraggableMoveCallback"
      >
        <layer-tree-item
          v-for="(layer, index) in item.layers"
          :key="layer.name + index"
          :item="layer"
          :parent="item"
          :layerType="layerType"
          :loop="loop + 1"
        />
      </Draggable>
    </ul>
  </li>
</template>

<script>
import ToggleSwitch from "@/components/common/ToggleSwitch";
import LayerColorPicker from "@/components/LayerColorPicker";

import Draggable from "vuedraggable";
import { layerHelper, serviceHelper } from "@/helpers";
import { guid } from "@/utils";

import {
  bunchController,
  mapController,
  serviceController,
  tableController,
} from "@/controllers";
import bunch from "@/api/bunch";
export default {
  name: "LayerTreeItem",
  components: {
    ToggleSwitch,
    Draggable,
    LayerColorPicker,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },

    parent: {
      type: Object,
    },
    loop: {
      type: Number,
      default: 1,
    },
    layerType: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      subListVisibility: false,
      layerIsSelected: false,
      isDragging: false,
    };
  },
  mounted() {},
  computed: {
    switchModel: {
      get() {
        if (serviceHelper.isLayer(this.item)) {
          return this.item.isSelected;
        } else {
          return this.item.defaultVisibility;
        }
      },
      set(e) {
        if (e.target.checked === false) {
          this.subListVisibility = false;
        }

        this.layerPicker(e);
      },
    },
    paddingLeft() {
      return this.loop * 16 + "px";
    },
    isCategory() {
      return serviceHelper.isCategory(this.item);
    },

    caretIconsVisibility() {
      return (
        this.isCategory ||
        (serviceHelper.isLayer(this.item) &&
          serviceHelper.isDynamicFromArcgis(this.item) &&
          this.item.isSelected)
      );
    },
    tableIconVisibility() {
      return (
        this.item.isSelected &&
        (serviceHelper.isSublayer(this.item) ||
          serviceHelper.isBunch(this.item) ||
          (serviceHelper.isLayer(this.item) &&
            serviceHelper.isDynamicFromLocal(this.item)))
      );
    },
    colorIconVisibility() {
      return (
        this.item.isSelected &&
        this.item.isColorEnabled &&
        (serviceHelper.isSublayer(this.item) ||
          serviceHelper.isBunch(this.item) ||
          (serviceHelper.isLayer(this.item) &&
            serviceHelper.isDynamicFromLocal(this.item)))
      ); // && this.color;
    },
    deleteIconVisibility() {
      return this.item.isColorEnabled && serviceHelper.isBunch(this.item); // && this.color;
    },
    operationsVisibility() {
      return (
        this.tableIconVisibility ||
        this.colorIconVisibility ||
        this.deleteIconVisibility
      );
    },
    colorPickerVisibility() {
      return (
        this.item.isSelected && this.activeColorPickerId === this.getLayerId()
      );
    },
    activeColorPickerId: {
      get() {
        return this.$store.getters.activeColorPickerId;
      },
      set(value) {
        this.$store.dispatch("SAVE_ACTIVE_COLOR_PICKER_ID", value);
      },
    },
  },
  methods: {
    onDraggableMoveCallback() {
      serviceController.onDraggableMoveCallback(this.layerType);
    },
    toggleSubList() {
      this.subListVisibility = !this.subListVisibility;
      if (this.subListVisibility)
        serviceController.dynamicLayersReset(this.item, this.subListVisibility);
      // this.dynamicLayersReset(this.item, this.subListVisibility);
    },
    onColorPickerSave(color) {
      serviceController.saveColor(this.item, color);
      mapController.refreshService(this.item);
    },
    colorPickerOnClose() {
      this.activeColorPickerId = null;
    },
    layerPicker(event) {
      let isChecked = event.target.checked;

      if (serviceHelper.isSublayer(this.item)) {
        serviceController.selectSubLayer(
          this.parent,
          this.parent.order,
          this.item.id,
          isChecked
        );
      } else {
        serviceController.selectService(this.item, isChecked);

        serviceController.dynamicLayersReset(this.item, isChecked);
      }
    },

    async getTableData(item) {
      var service = serviceHelper.isSublayer(item) ? item.parent : item;
      await tableController.getTable(service);
    },
    getLayerId() {
      var id = 0;
      if (serviceHelper.isSublayer(this.item)) {
        id = this.item.uid;
      } else if (
        serviceHelper.isLayer(this.item) &&
        serviceHelper.isDynamicFromLocal(this.item)
      ) {
        id = this.item.id;
      }
      return id;
    },
    toggleColorPicker() {
      if (this.activeColorPickerId === this.getLayerId()) {
        this.activeColorPickerId = null;
      } else {
        this.activeColorPickerId = this.getLayerId();
      }
    },
    deleteBunch() {
      bunch.remove(this.item.id).then((response) => {
        bunchController.remove(this.item.id);
        mapController.deleteService(this.item);
      });
    },
  },
};
</script>
