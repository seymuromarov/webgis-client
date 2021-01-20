<template>
  <div class="colorPickers colorPickers--light">
    <ul class="nav">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: !isBorder }"
          href="#"
          @click="borderClick(false)"
          >Fill Color</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: isBorder }"
          href="#"
          @click="borderClick(true)"
          >Border Color</a
        >
      </li>
    </ul>

    <div class="colorPicker">
      <ColorScheme v-model="borderColor" v-if="isBorder"></ColorScheme>
      <ColorScheme v-model="fillColor" v-else></ColorScheme>
    </div>

    <div class="colorPickerButton">
      <button class="btn btn-sm btn-primary" type="button" @click="save">
        Save
      </button>
    </div>
  </div>
</template>
<script>
import { Chrome } from "vue-color";
import { mapGetters } from "vuex";
import { colorPickerController } from "@/controllers";
console.log(
  "🚀 ~ file: ShapeColorPicker.vue ~ line 40 ~ colorPickerController",
  colorPickerController
);
export default {
  name: "color",
  props: {},
  components: {
    ColorScheme: Chrome,
  },
  mounted() {},
  data() {
    return {
      isBorder: false,
      borderColor: {
        hex8: "#000000",
        rgba: { r: 255, g: 255, b: 255, a: 1 },
      },
      fillColor: {
        hex8: "#00000000",
        rgba: { r: 255, g: 255, b: 255, a: 1 },
      },
    };
  },
  mounted() {
    this.borderColor = this.shapeBorderColor;
    this.fillColor = this.shapeFillColor;
  },
  methods: {
    borderClick(status) {
      this.isBorder = status;
    },
    save() {
      colorPickerController.setShapeFillColor(this.fillColor.hex8);
      colorPickerController.setShapeBorderColor(this.borderColor.hex8);

      this.$emit("setShapeColor");
    },
  },
  computed: {
    ...mapGetters(["shapeBorderColor", "shapeFillColor"]),
  },
};
</script>
