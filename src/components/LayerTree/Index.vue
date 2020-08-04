<template>
  <Draggable
    v-model="data"
    v-bind="dragOptions"
    @start="isDragging = true"
    @end="onDraggableMoveCallback"
  >
    <layer-tree-item
      v-for="(item, index) in data"
      :key="item.name + index"
      :item="item"
      :layerType="layerType"
      :loop="1"
      @updateList="
        (val) => {
          var d = data;
          d[index] = val;
          $emit('updateList', d);
        }
      "
      :dragOptions="dragOptions"
    />
  </Draggable>
</template>

<script>
import Draggable from "vuedraggable";
import { guid } from "@/utils";
import { serviceController } from "@/controllers";
import LayerTreeItem from "./components/LayerTreeItem";
export default {
  name: "LayerTree",
  components: { Draggable, LayerTreeItem },
  props: {
    layerType: {
      required: true,
      type: String,
    },
    list: {
      type: Array,
      required: true,
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
      isDragging: false,
    };
  },
  methods: {
    onDraggableMoveCallback() {
      serviceController.onDraggableMoveCallback(this.layerType);
    },
  },
  computed: {
    data: {
      get() {
        return this.list;
      },
      set(val) {
        this.$emit("updateList", val);
      },
    },
  },
};
</script>

<style></style>
