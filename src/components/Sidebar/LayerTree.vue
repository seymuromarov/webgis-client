<template>
  <li class="list__item">
    <span class="item__header" :style="`padding-left: ${paddingLeft}`">
      <span class="title">
        <!-- Switch -->
        <ToggleSwitch v-if="!isCategory" class="pre" v-model="switchModel" />
        <i class="far fa-folder pre" v-else></i>
        {{ data.name }}
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
          @click="getTableData(data)"
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

    <ul v-if="data.layers && subListVisibility" class="list__content">
      <LayerTree
        v-for="(children, index) in data.children"
        :key="children.name + index"
        :data="children"
        :parent="data"
        :loop="loop + 1"
      />

      <LayerTree
        v-for="(layer, index) in data.layers"
        :key="layer.name + index"
        :data="layer"
        :parent="data"
        :loop="loop + 1"
      />
    </ul>
  </li>
</template>

<script>
import ToggleSwitch from "../common/ToggleSwitch";
import LayerColorPicker from "../LayerColorPicker";
import { layerHelper, serviceHelper } from "@/helpers";
import {
  bunchController,
  mapController,
  serviceController,
  tableController,
} from "@/controllers";
import { bunchService } from "@/services";

export default {
  name: "LayerTree",
  components: {
    ToggleSwitch,
    LayerColorPicker,
  },
  props: {
    data: {
      type: Object,
    },
    parent: {
      type: Object,
    },
    loop: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      subListVisibility: false,
      layerIsSelected: false,
    };
  },
  computed: {
    switchModel: {
      get() {
        if (serviceHelper.isLayer(this.data)) {
          return this.data.isSelected;
        } else {
          return this.data.defaultVisibility;
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
      return serviceHelper.isCategory(this.data);
    },
    caretIconsVisibility() {
      return (
        this.isCategory ||
        (serviceHelper.isLayer(this.data) &&
          serviceHelper.isDynamicFromArcgis(this.data) &&
          this.data.isSelected)
      );
    },
    tableIconVisibility() {
      return (
        this.data.isSelected &&
        (serviceHelper.isSublayer(this.data) ||
          serviceHelper.isBunch(this.data) ||
          (serviceHelper.isLayer(this.data) &&
            serviceHelper.isDynamicFromLocal(this.data)))
      );
    },
    colorIconVisibility() {
      return (
        this.data.isSelected &&
        this.data.isColorEnabled &&
        (serviceHelper.isSublayer(this.data) ||
          serviceHelper.isBunch(this.data) ||
          (serviceHelper.isLayer(this.data) &&
            serviceHelper.isDynamicFromLocal(this.data)))
      ); // && this.color;
    },
    deleteIconVisibility() {
      return this.data.isColorEnabled && serviceHelper.isBunch(this.data); // && this.color;
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
        this.data.isSelected && this.activeColorPickerId === this.getLayerId()
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
    toggleSubList() {
      this.subListVisibility = !this.subListVisibility;
      if (this.subListVisibility)
        serviceController.dynamicLayersReset(this.data, this.subListVisibility);
      // this.dynamicLayersReset(this.data, this.subListVisibility);
    },
    onColorPickerSave(color) {
      serviceController.saveColor(this.data, color);
    },
    colorPickerOnClose() {
      this.activeColorPickerId = null;
    },
    layerPicker(event) {
      let isChecked = event.target.checked;

      if (serviceHelper.isSublayer(this.data)) {
        serviceController.selectSubLayer(
          this.parent,
          this.parent.order,
          this.data.id,
          isChecked
        );
        // this.$emit(
        //   "selectSubLayer",
        //   this.parent,
        //   this.parent.order,
        //   this.data.id,
        //   isChecked
        // );
      } else {
        serviceController.selectService(this.data, isChecked);
        // serviceController.selectService(this.data, isChecked);
        // this.$emit("selectService", this.data, isChecked);
        // this.$emit("dynamicLayersReset", this.data, isChecked);
        serviceController.dynamicLayersReset(this.data, isChecked);
      }
    },
    // selectService(data, isChecked) {
    //   this.$emit("selectService", data, isChecked);
    // },
    // selectSubLayer(parent, order, itemId, event) {
    //   this.$emit("selectSubLayer", parent, order, itemId, event);
    // },
    // dynamicLayersReset(data, status) {
    //   this.$emit("dynamicLayersReset", data, status);
    // },
    getTableData(data) {
      var service = serviceHelper.isSublayer(data) ? data.parent : data;
      tableController.setTableActiveService(service);
      tableController.getTableData(service);
    },
    getLayerId() {
      var id = 0;
      if (serviceHelper.isSublayer(this.data)) {
        id = this.data.uid;
      } else if (
        serviceHelper.isLayer(this.data) &&
        serviceHelper.isDynamicFromLocal(this.data)
      ) {
        id = this.data.id;
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
      bunchService.remove(this.data.id).then((response) => {
        bunchController.remove(this.data.id);
        mapController.deleteService(this.data);
      });
    },
  },
};
</script>
