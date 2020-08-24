<template>
  <li class="list__item">
    <span class="item__header" :style="`padding-left: ${paddingLeft}`">
      <span class="title">
        <!-- Switch -->
        <ToggleSwitch v-if="!isCategory" class="pre" v-model="switchModel" />
        <i class="far fa-folder pre" v-else></i>
        {{ isCategory ? data.name : data.showingLabel }}
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

    <div v-if="colorPickerVisibility" class="mt-2 item__colorpicker__content">
      <v-select
        v-if="conditionSelectVisibility"
        class="condition__select"
        v-model="selectedColorOpt"
        :clearable="false"
        :options="conditions"
      ></v-select>

      <!-- Color Picker -->
      <LayerColorPicker
        :borderColor="currentConditionColor.borderColor"
        :fillColor="currentConditionColor.fillColor"
        @onSave="onColorPickerSave"
        @onClose="colorPickerOnClose"
      />
    </div>

    <ul v-if="data.layers && subListVisibility" class="list__content">
      <Draggable
        v-model="children"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="onDraggableMoveCallback"
      >
        <layer-tree-item
          v-for="(child, index) in children"
          :key="child.name + index"
          :item="child"
          @updateList="
            (val) => {
              var d = data;
              d.children[index] = val;
              $emit('updateList', d);
            }
          "
          :parent="data"
          :layerType="layerType"
          :loop="loop + 1"
          :dragOptions="dragOptions"
        />
      </Draggable>
      <Draggable
        v-model="layers"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="onDraggableMoveCallback"
      >
        <layer-tree-item
          v-for="(layer, index) in layers"
          :key="layer.name + index"
          :item="layer"
          @updateList="
            (val) => {
              var d = data;
              d.layers[index] = val;
              $emit('updateList', d);
            }
          "
          :parent="data"
          :layerType="layerType"
          :loop="loop + 1"
          :dragOptions="dragOptions"
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
import { operatorEnumTostring } from "@/utils/enumToString";

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
    dragOptions: {
      type: Object,
      default: function() {
        return {
          disabled: false,
        };
      },
    },
  },
  data() {
    return {
      subListVisibility: false,
      layerIsSelected: false,
      isDragging: false,
      selectedColorOpt: {
        code: "default",
        label: "Default",
      },
    };
  },

  mounted() {},

  computed: {
    data: {
      get() {
        return this.item;
      },
      set(val) {
        this.$emit("updateList", val);
      },
    },
    children: {
      get() {
        return this.data.children;
      },
      set(val) {
        var data = this.data;
        data.children = val;
        this.data = data;
      },
    },

    layers: {
      get() {
        return this.data.layers;
      },
      set(val) {
        var data = this.data;
        data.layers = val;
        this.data = data;
      },
    },
    currentConditionColor() {
      let borderColor = "";
      let fillColor = "";
      if (this.selectedColorOpt.code === "default") {
        borderColor = this.data.color.borderColor;
        fillColor = this.data.color.fillColor;
      } else {
        var condition = this.data.layerColor.conditions.find(
          (c) => c.id === parseInt(this.selectedColorOpt.code)
        );
        borderColor = condition.borderColor;
        fillColor = condition.fillColor;
      }

      return { borderColor, fillColor };
    },
    conditions() {
      const defaultOpt = {
        code: "default",
        label: "Default",
      };
      let options = [defaultOpt];
      if (this.data.layerColor) {
        const layerColor = this.data.layerColor;
        var conditionOptions = layerColor.conditions.map((c) => {
          var code = c.id;
          var label = `${layerColor.column} ${operatorEnumTostring(
            c.operator
          )} ${c.value}`;
          return { code, label };
        });
        options = [defaultOpt, ...conditionOptions];
      }
      return options;
    },
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
    conditionSelectVisibility() {
      return this.data.layerColor && this.data.layerColor.conditions.length > 0;
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
    updateList(val) {
      this.$emit("updateList", val);
    },
    onDraggableMoveCallback() {
      serviceController.onDraggableMoveCallback(this.layerType);
    },
    toggleSubList() {
      this.subListVisibility = !this.subListVisibility;
      if (this.subListVisibility)
        serviceController.dynamicLayersReset(this.data, this.subListVisibility);
      // this.dynamicLayersReset(this.data, this.subListVisibility);
    },
    onColorPickerSave(color) {
      new Promise((resolve, reject) => {
        serviceController.saveColor(this.data, color, this.selectedColorOpt);
        resolve();
      }).then(() => {
        mapController.refreshService(this.data.id);
      });
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
      } else {
        serviceController.selectService(this.data, isChecked);

        serviceController.dynamicLayersReset(this.data, isChecked);
      }
    },

    async getTableData(data) {
      var service = serviceHelper.isSublayer(data) ? data.parent : data;
      await tableController.getTable(service);
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
      bunch.remove(this.data.id).then((response) => {
        bunchController.remove(this.data.id);
        mapController.deleteService(this.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .condition__select {
  border-radius: 0px;
  background-color: var(--primary-color);
  width: 90%;
  color: white;
  .vs__selected {
    color: white;
  }
  .vs__search::placeholder,
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    background-color: var(--primary-color);
    color: white;
  }
  .vs__selected,
  .vs__dropdown-option {
    color: white;
  }
  .vs__clear,
  .vs__open-indicator {
    fill: var(--primary-color-lighten-200);
  }
}
</style>
